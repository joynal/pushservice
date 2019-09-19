const webPush = require('web-push');

const { mq } = require('./config');
const database = require('./helpers/database');
const Subscriber = require('./models/subscriber');
const getConsumer = require('./helpers/consumer');

database.connect();

const consumer = getConsumer(
  'SenderGroup',
  mq.pushTopic,
  database,
);

const sendNotification = async (record) => {
  const msg = JSON.parse(record.value.toString());
  try {
    await webPush.sendNotification(
      JSON.parse(msg.pushEndPoint),
      JSON.stringify(msg.data),
      {
        ...msg.options,
        headers: {
          Connection: 'keep-alive',
        },
      },
    );
  } catch (err) {
    console.error('sending err:', err.message, err.statusCode);
    if (err.statusCode === 410) {
      await Subscriber.updateOne({ _id: msg.subscriberId }, { subscribed: false });
    }
  }
};

consumer.on('data', sendNotification);
