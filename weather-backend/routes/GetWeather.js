const express = require('express');
const router = express.Router();
const WeatherSummary = require("../models/WeatherSummary");

router.get("/get-weather", async (req, res) => {
    try {
      const weather = await WeatherSummary.find({});
      res.json(weather);
    } catch {
      console.error("Error fetching people:", err);
      res.status(500).json({ message: "Internal Error", error: err.message });
    }
});

module.exports = router;