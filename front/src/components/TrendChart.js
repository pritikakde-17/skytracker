import React from 'react';
import { Line } from 'react-chartjs-2';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default function TrendChart({ list }) {
if (!list) return null;
const labels = list.map((l) => l.dt_txt);
const temps = list.map((l) => l.temp);
const pops = list.map((l) => Math.round(l.pop * 100));


const data = {
labels,
datasets: [
{
label: 'Temperature (°C)',
data: temps,
tension: 0.2,
fill: false
},
{
label: 'Rain Chance (%)',
data: pops,
tension: 0.2,
fill: false
}
]
};


return (
<div style={{ maxWidth: 800 }}>
<Line data={data} />
</div>
);
}