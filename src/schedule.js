const { mq } = require('./config');
const Site = require('./models/site');
const Push = require('./models/push');
const database = require('./helpers/database');
const { sendToQueue } = require('./helpers/producer');

database.connect();

module.exports = async (id) => {
  try {
    const push = await Push.findById(id).lean();
    const site = await Site.findById(push.siteId).lean();

    delete site._id;

    const processedNotification = {
      ...push,
      vapidDetails: {
        ...site,
      },
    };

    const updated = await Push.updateOne(
      { _id: push._id },
      { $set: { status: 'processing' } },
    );

    // Let's send it to the queue
    if (updated) {
      sendToQueue(mq.rawPushTopic, JSON.stringify(processedNotification));
    }
  } catch (err) {
    console.error('schedule error:', err);
  }
};
