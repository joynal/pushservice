const mongoose = require('mongoose');
const config = require('../config');

// set mongoose Promise
mongoose.Promise = Promise;

exports.connect = () => {
  mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  // Exit application on error
  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
  });

  // print mongoose logs in dev env
  mongoose.set('debug', config.dbDebug);

  return mongoose.connection;
};

exports.disconnect = (done) => {
  mongoose.disconnect(done);
};
