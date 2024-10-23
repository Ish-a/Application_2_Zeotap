// routes/weather.js
const express = require('express');
const WeatherSummary = require('../models/WeatherSummary');
const router = express.Router();

// Route to save weather summary
router.post('/summaries', async (req, res) => {
  const { city, avgTemp, maxTemp, minTemp, unit } = req.body;
  const newSummary = new WeatherSummary({ city, avgTemp, maxTemp, minTemp, unit });
  
  try {
    await newSummary.save();
    res.status(201).json(newSummary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
