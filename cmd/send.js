const schedule = require('../src/schedule');

const run = async () => {
  const pushId = process.argv[2];

  if (!pushId) {
    console.error('Please provide push id');
    process.exit(1);
  }

  await schedule(pushId);
};

run()
  .catch(e => console.error(e.message));
