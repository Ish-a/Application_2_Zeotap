import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import DailySummary from './components/DailySummary';
import Alert from './components/Alert';

const api = {
  key: '9fecb1f5bb412f2c7004071d20fff2a2',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [unit, setUnit] = useState('Celsius'); // State to manage temperature units

  // Fetch weather data for Indian cities every 5 minutes
  const fetchWeatherData = async () => {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const promises = cities.map(city =>
      axios.get(`${api.base}weather?q=${city}&appid=${api.key}`)
    );
    const responses = await Promise.all(promises);
    const data = responses.map(res => ({
      city: res.data.name,
      temp: res.data.main.temp, // Store the raw temperature in Kelvin
      condition: res.data.weather[0].main,
      feels_like: res.data.main.feels_like, // Store the raw feels_like in Kelvin
      timestamp: res.data.dt,
    }));
    setWeatherData(data);
    handleAlerts(data); // Check for alerts
  };

  // Trigger an alert if any city's temperature exceeds 35°C
  const handleAlerts = (data) => {
    const alertCity = data.find(d => convertTemperature(d.temp) > 35);
    if (alertCity) {
      setAlert(`⚠️ High Temperature Alert! ${alertCity.city} is currently ${convertTemperature(alertCity.temp)}°${unit.charAt(0)}`);
    } else {
      setAlert(null);
    }
  };

  // Convert temperature based on the selected unit
  const convertTemperature = (temp) => {
    if (unit === 'Celsius') {
      return (temp - 273.15).toFixed(2);
    } else if (unit === 'Fahrenheit') {
      return (((temp - 273.15) * 9) / 5 + 32).toFixed(2);
    } else if (unit === 'Kelvin') {
      return temp.toFixed(2);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // 5 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <Header setUnit={setUnit} /> {/* Pass setUnit function to Header component */}
      {alert && <Alert message={alert} />}
      <div className="grid grid-cols-3 gap-4">
        {weatherData.map((data, index) => (
          <WeatherCard
            key={index}
            data={{ 
              city: data.city, 
              temp: data.temp, 
              feels_like: data.feels_like, 
              condition: data.condition, 
              dt: data.timestamp // Ensure this is in seconds
            }} 
            unit={unit}
            convertTemperature={convertTemperature}
          />
        ))}
      </div>
      <DailySummary weatherData={weatherData} convertTemperature={convertTemperature} />
    </div>
  );
};

export default App;
