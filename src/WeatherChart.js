// src/components/WeatherChart.js

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

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const WeatherChart = ({ historicalData }) => {
  if (!historicalData.length) return null;

  const data = {
    labels: historicalData.map((d) =>
      new Date(d.current.dt * 1000).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: historicalData.map((d) => d.current.temp),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Past 5 Days Temperature</h2>
      <Line data={data} />
    </div>
  );
};

export default WeatherChart;
