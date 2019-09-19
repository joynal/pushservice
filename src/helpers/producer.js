const Kafka = require('node-rdkafka');
const { mq } = require('../config');

let isProducerReady = false;

let options = {
  'client.id': 'pusher',
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

const producer = new Kafka.HighLevelProducer(options);

producer.connect();

producer.setValueSerializer(value => Buffer.from(value));

producer.on('ready', () => {
  isProducerReady = true;
});

producer.on('event.error', (err) => {
  console.error('producer err:', err);
});


/**
 *
 * @param {*} topic
 * @param {*} data
 * @param {*} partition
 * @param {*} key
 */
const sendToQueue = (topic, data, partition = null, key = null) => {
  if (isProducerReady === true) {
    producer.produce(
      topic,
      partition,
      data,
      key,
      Date.now(),
      (err, offset) => {
        console.log({ offset, err });
      },
    );
  }
};

module.exports = { sendToQueue };
