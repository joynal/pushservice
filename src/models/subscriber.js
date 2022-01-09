const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'Subscriber',
  new Schema(
    {
      subscribed: { type: Boolean, default: true },
      siteId: { type: Schema.Types.ObjectId, required: true },
      pushEndPoint: { type: String },
    },
    { timestamps: true },
  ),
);
