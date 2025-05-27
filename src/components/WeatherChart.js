import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const WeatherChart = ({ historicalData }) => {
  if (!historicalData.length) return null;

  const labels = historicalData.map((d) =>
    new Date(d.current.dt * 1000).toLocaleDateString()
  );

  const currentTemps = historicalData.map((d) => d.current.temp);
  const minTemps = historicalData.map((d) =>
    Math.min(...d.hourly.map((h) => h.temp))
  );
  const maxTemps = historicalData.map((d) =>
    Math.max(...d.hourly.map((h) => h.temp))
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Min Temp (°C)',
        data: minTemps,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Max Temp (°C)',
        data: maxTemps,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Current Temp (°C)',
        data: currentTemps,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2>5-Day Temperature Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default WeatherChart;
