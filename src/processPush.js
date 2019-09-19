const config = require('./config');
const Push = require('./models/push');
const Subscriber = require('./models/subscriber');
const { sendToQueue } = require('./helpers/producer');

const { mq } = config;
const { queryBatchSize } = mq;

module.exports = async (record) => {
  try {
    const msg = JSON.parse(record.value.toString());

    console.log('processing push:', msg._id);

    let counter = 0;

    const options = {
      vapidDetails: msg.vapidDetails,
      TTL: msg.timeToLive,
    };

    const query = { siteId: msg.siteId, subscribed: true };

    const stream = await Subscriber.find(query).lean().batchSize(queryBatchSize).cursor();

    stream.on('data', async (subscriber) => {
      try {
        counter += 1;
        const payload = {
          ...msg.options,
          _id: msg._id,
          launchUrl: msg.launchUrl,
          priority: msg.priority,
        };

        const message = {
          pushEndPoint: subscriber.pushEndPoint,
          data: payload,
          options,
          subscriberId: subscriber._id,
        };

        sendToQueue(mq.pushTopic, JSON.stringify(message));
      } catch (err) {
        console.error('stream cb err:', err);
      }
    });

    stream.on('close', async () => {
      try {
        const update = { totalSent: counter, status: 'done' };
        if (msg.totalSent) { update.totalSent = msg.totalSent + counter; }

        await Push.updateOne({ _id: msg._id }, update);
      } catch (err) {
        console.error('close cb error:', err);
      }
    });

    stream.on('error', (err) => {
      console.error('stream err:', err);
    });
  } catch (err) {
    console.error('parser error:', err);
  }
};
