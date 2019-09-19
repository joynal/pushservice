require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,

  // db
  dbUrl: process.env.MONGODB_URL,
  dbDebug: JSON.parse(process.env.MONGODB_DEBUG),

  // kafka
  mq: {
    kafkaBrokers: process.env.KAFKA_BROKERS,
    kafkaSecurity: JSON.parse(process.env.KAFKA_SECURITY_ENABLED),
    kafkaUsername: process.env.KAFKA_USERNAME,
    kafkaPassword: process.env.KAFKA_PASSWORD,
    queryBatchSize: Number.parseInt(process.env.QUERY_BATCH_SIZE, 10) || 1000,
    rawPushTopic: process.env.TOPIC_RAW_PUSH,
    pushTopic: process.env.TOPIC_PUSH,
  },
};
