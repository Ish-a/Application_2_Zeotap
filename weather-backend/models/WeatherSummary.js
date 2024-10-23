// models/WeatherSummary.js
const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  city: String,
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  unit: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
