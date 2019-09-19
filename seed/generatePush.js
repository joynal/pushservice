const Site = require('../src/models/site');
const Push = require('../src/models/push');
const database = require('../src/helpers/database');

database.connect();

const run = async () => {
  try {
    const siteId = process.argv[2] || '5c17804f2cbefa06ade61d64';

    const site = await Site.findById(siteId);

    if (site) {
      const push = await Push.create({
        siteId,
        title: 'I came from push service',
        options: {
          body: 'Ignore it, it\'s a test notification',
          icon: 'https://avatars3.githubusercontent.com/u/6458212',
        },
        launchUrl: 'https://joynal.dev',
      });

      console.log('push:', push);
      process.exit(0);
    }

    console.log('Given site not found!');
    process.exit(0);
  } catch (err) {
    console.error('err:', err);
  }
};

run();
