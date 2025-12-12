const express = require("express");
const axios = require("axios");
const router = express.Router();

const API = process.env.OWM_API_KEY;

router.get("/", async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) return res.status(400).json({ error: "Location required" });

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API}&units=metric`;

    const { data } = await axios.get(url);

    res.json({
      city: data.city,
      list: data.list.map(i => ({
        dt_txt: i.dt_txt,
        temp: i.main.temp,
        humidity: i.main.humidity,
        pop: i.pop,
        wind_speed: i.wind.speed
      }))
    });

  } catch (err) {
    console.log("ERR:", err.message);
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

module.exports = router;
