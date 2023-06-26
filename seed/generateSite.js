const webPush = require('web-push');
const Site = require('../src/models/site');
const database = require('../src/helpers/database');

database.connect();

const run = async () => {
  const vapId = webPush.generateVAPIDKeys();

  const site = await Site.create({
    ...vapId,
    subject: 'https://joynal.dev',
  });

  console.log('Your site ID is:', site._id);

  process.exit(0);
};

run()
  .catch(e => console.error(e.message));
