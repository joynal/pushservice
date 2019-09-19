const schedule = require('../src/schedule');

const run = async () => {
  try {
    const pushId = process.argv[2];

    if (!pushId) {
      console.error('Please provide push id');
      process.exit(1);
    }

    schedule(pushId);
  } catch (err) {
    console.error('send err:', err);
  }
};

run();
