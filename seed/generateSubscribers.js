const randToken = require('rand-token');
const database = require('../src/helpers/database');
const Subscriber = require('../src/models/subscriber');

database.connect();

const run = async () => {
  const siteId = process.argv[2] || '5c17804f2cbefa06ade61d64';
  const total = process.argv[3] || 20000;
  const batchSize = 20000;

  console.info(`generating ${total} dummy subscribers...`);

  const subscriber = {siteId, subscribed: true};

  const pushEndPoint = {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/ebpSYTIyz5w:APA91bESNu5qsIA484DSFWyuDLEgMHdAJf45IwMua9lknXrhAzQCrLcN-ZWfT8GE-_kxNR6MiCq1tfPr1aKWH8bVFNm6bmtDY-xHug-B76h6IqwemtB9tnlPsTqlr9A8ZcvA3dZzlxMc',
    expirationTime: null,
    keys: {
      p256dh:
        'BHk1DzprVgT26pIBTc3gsm-xE1m-DZzZcn_xAnvEpGKBMkja3V5rQsFQuQ7wlJV6I0A2P5LVHtjhp7lYZPsoQ8E',
      auth: 'mrLLfPc_dIlwsO521ix1bQ',
    },
  };

  const subscriberId = 'ebpSYTIyz5w:APA91bESNu5qsIA484DSFWyuDLEgMHdAJf45IwMua9lknXrhAzQCrLcN-ZWfT8GE-_kxNR6MiCq1tfPr1aKWH8bVFNm6bmtDY-xHug-B76h6IqwemtB9tnlPsTqlr9A8ZcvA3dZzlxMc';

  let subscribers = [];
  const endpoints = ['https://fcm.googleapis.com/fcm/send/', 'https://updates.push.services.mozilla.com/wpush/v2/'];
  console.log('start populating dummy subscribers');

  for (let index = 0; index < total; index += 1) {
    const token = randToken.generate(11);
    const newSubscriberId = subscriberId.replace(/ebpSYTIyz5w/gi, token);
    pushEndPoint.endpoint = endpoints[Math.round(Math.random())] + newSubscriberId;

    subscriber.pushEndPoint = JSON.stringify(pushEndPoint);

    const model = new Subscriber(subscriber);
    subscribers.push(model);

    if (subscribers.length === batchSize) {
      // eslint-disable-next-line no-await-in-loop
      await Subscriber.insertMany(subscribers);
      subscribers = [];
    }
  }

  await Subscriber.insertMany(subscribers);

  console.log('generation completed');
  process.exit(0);

};

run()
  .catch(e => console.error(e.message));
