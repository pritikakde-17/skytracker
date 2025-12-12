// rule-based advisory generator
export function generateAdvisories(forecastList) {
// forecastList is an array of { dt, dt_txt, temp, humidity, pop, wind_speed }
// We'll analyze the next 6 hours (two 3-hour blocks) and overall trends


const adv = new Set();


// helper stats
const temps = forecastList.map((f) => f.temp);
const hums = forecastList.map((f) => f.humidity);
const pops = forecastList.map((f) => f.pop);
const winds = forecastList.map((f) => f.wind_speed);


const maxTemp = Math.max(...temps);
const avgHum = hums.reduce((s, x) => s + x, 0) / hums.length;
const maxPop = Math.max(...pops);
const maxWind = Math.max(...winds);


// Rules (at least 5)
if (maxPop > 0.6) adv.add('High rain probability (>60%): Avoid irrigation and pesticide spraying today.');
if (maxTemp > 35) adv.add('High temperature (>35°C): Increase irrigation frequency for heat-sensitive crops.');
if (maxWind > 15) adv.add('Strong winds (>15 km/h): Do not spray pesticides due to drift risk.');
if (avgHum > 80) adv.add('High humidity (>80%): Monitor crops for possible fungal infections.');


// Good spraying window: next 6 hours no rain and wind <10
const next6 = forecastList.slice(0, 2); // two 3-hour blocks
const rainIn6 = next6.some((f) => f.pop > 0.2);
const windIn6 = next6.some((f) => f.wind_speed >= 10);
if (!rainIn6 && !windIn6) adv.add('Good spraying window in next 6 hours: low wind and low rain chance.');


// Additional recommendation: irrigation scheduling
if (maxTemp > 30 && avgHum < 40) adv.add('Heat + low humidity: Consider morning irrigation to reduce evapotranspiration.');


return Array.from(adv);
}