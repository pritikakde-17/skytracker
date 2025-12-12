import React from 'react';


export default function WeatherCard({ city, next }) {
if (!city || !next) return null;
return (
<div className="weather-card">
<h2>{city.name}, {city.country}</h2>
<div>Time: {next.dt_txt}</div>
<div>Temp: {next.temp} °C</div>
<div>Humidity: {next.humidity}%</div>
<div>Rain chance: {Math.round(next.pop * 100)}%</div>
<div>Wind: {next.wind_speed} m/s</div>
</div>
);
}