const Kafka = require('node-rdkafka');

const { mq } = require('../config');
const shutdown = require('./shutdown');

module.exports = (groupId, topic, db = null) => {
  let options = {
    'group.id': groupId,
    'metadata.broker.list': mq.kafkaBrokers,
    'socket.keepalive.enable': true,
  };

  if (mq.kafkaSecurity === true) {
    options = {
      ...options,
      'security.protocol': 'SASL_SSL',
      'sasl.mechanisms': 'SCRAM-SHA-256',
      'sasl.username': mq.kafkaUsername,
      'sasl.password': mq.kafkaPassword,
      debug: 'generic,broker,security',
    };
  }

  const consumer = new Kafka.KafkaConsumer(options, {});

  consumer.connect();

  consumer.on('ready', () => {
    consumer.subscribe([topic]);
    consumer.consume();
  });

  consumer.on('event.error', (err) => {
    console.error('consumer error:', err.message);
  });

  process.on('SIGINT', shutdown(consumer, db));
  process.on('SIGTERM', shutdown(consumer, db));

  return consumer;
};
