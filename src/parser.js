const { mq } = require('./config');
const database = require('./helpers/database');
const getConsumer = require('./helpers/consumer');
const processPush = require('./processPush');

database.connect();

const consumer = getConsumer(
  'ParserGroup',
  mq.rawPushTopic,
  database,
);

consumer.on('data', processPush);
