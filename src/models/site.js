const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model('Site', new Schema({
  subject: { type: String },
  publicKey: { type: String },
  privateKey: { type: String },
}, { timestamps: true }));
