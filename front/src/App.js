import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import TrendChart from './components/TrendChart';
import AdvisoryBox from './components/AdvisoryBox';
import { fetchForecast } from './api';
import { generateAdvisories } from './utils/advice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [data, setData] = useState(null);
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(location) {
    if (!location) return;
    setLoading(true);

    try {
      const res = await fetchForecast(location);
      setData(res);

      const list = res.list.slice(0, 8);
      const adv = generateAdvisories(list);
      setAdvisories(adv);

    } catch (e) {
      console.error(e);
      alert("Failed to fetch weather");
    }

    setLoading(false);
  }

  function downloadPDF() {
    const input = document.getElementById('report');
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = 190;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
      pdf.save('advisory.pdf');
    });
  }

  return (
    <div className="app">
      <h1>Weather Forecast & Advisory</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <div>Loading...</div>}

      {data && (
        <div id="report">
          <WeatherCard city={data.city} next={data.list[0]} />
          <TrendChart list={data.list.slice(0, 12)} />
          <AdvisoryBox advisories={advisories} />
        </div>
      )}

      {data && (
        <div style={{ marginTop: 12 }}>
          <button onClick={downloadPDF}>Download Advisory as PDF</button>
        </div>
      )}

      <footer style={{ marginTop: 20 }}>
        <small>see the weather report here</small>
      </footer>
    </div>
  );
}

export default App;