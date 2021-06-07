const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });
  
  const alertSchema = new Schema({
    text: String,
    alertLevel:{
      type : Number,
      min: 1,
      max: 3,
      default: 1,
    },
    location: {
      type: pointSchema,
      required: true
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 3600 }}
  });

  
  const Alerts = mongoose.model('Alerts', alertSchema);
  module.exports = Alerts;