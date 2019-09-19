const mongoose = require('mongoose');

const { Schema } = mongoose;

const PushSchema = new Schema(
  {
    siteId: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, default: 'pending' },

    // notification details
    title: { type: String, required: true, max: 48 },
    options: {
      body: { type: String, max: 100 },
      icon: { type: String },
      image: { type: String },
      badge: { type: String },
      vibration: { type: Boolean, default: false },
      silent: { type: Boolean, default: false },
      renotify: { type: Boolean, default: false },
      requireInteraction: { type: Boolean, default: false },
      dir: { type: String },
      tag: { type: String },
      actions: [
        {
          action: { type: String },
          title: { type: String },
          icon: { type: String },
          url: { type: String },
        },
      ],
    },

    // others
    launchUrl: { type: String },
    priority: { type: String, default: 'normal' },
    timeToLive: { type: Number, default: 259200 },


    // Stats
    totalSent: { type: Number, default: 0 },
    totalDeliver: { type: Number, default: 0 },
    totalClick: { type: Number, default: 0 },
    totalClose: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Push', PushSchema);
