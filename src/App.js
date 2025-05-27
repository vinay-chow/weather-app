import React, { useEffect, useState } from 'react';
import './App.css';
import { getCurrentWeather } from './WeatherService';
import WeatherChart from './components/WeatherChart';

function App() {
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('');
  const [current, setCurrent] = useState(null);
  const [historical, setHistorical] = useState([]);

  const fetchWeather = async (selectedCity) => {
    try {
      const currentData = await getCurrentWeather(selectedCity);
      setCurrent(currentData);

      const fakeHistorical = Array.from({ length: 5 }, (_, i) => {
        const timestamp = Math.floor(Date.now() / 1000) - (i + 1) * 86400;
        const baseTemp = currentData.main.temp - i;
        return {
          current: {
            dt: timestamp,
            temp: baseTemp,
          },
          hourly: Array.from({ length: 24 }, () => ({
            temp: baseTemp - Math.random() * 2 + 1, // random min/max range
          })),
        };
      });

      setHistorical(fakeHistorical);
    } catch (error) {
      alert('Could not fetch weather. Please check the city name.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <div className="App">
      <h1>Weather in {city}</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }}>
          Search
        </button>
      </form>

      {current ? (
        <>
          <p>Temperature: {current.main.temp} °C</p>
          <p>Humidity: {current.main.humidity}%</p>
          <p>Conditions: {current.weather[0].description}</p>
          <WeatherChart historicalData={historical} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
