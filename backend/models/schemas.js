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
    alertLever: Number,
    location: {
      type: pointSchema,
      required: true
    }
  });

  
  const Alerts = mongoose.model('Alerts', alertSchema);
  module.exports = Alerts;