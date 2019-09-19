/**
 *
 * @param {*} consumer
 * @param {*} db
 */

module.exports = (consumer, db) => () => {
  console.log('shutdown started....');
  consumer.disconnect();
  consumer.on('disconnected', () => {
    console.log('kafka connection closed');
    if (db && db.disconnect) {
      db.disconnect(() => {
        console.log('db connection closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
};
