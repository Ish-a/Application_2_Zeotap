import { useState } from 'react';

const WeatherCard = ({ data }) => {
  const [unit, setUnit] = useState('Celsius'); // Track user's selected unit

  // Ensure temp is treated as a number
  const toNumber = (value) => Number(value);

  // Convert temperature based on the selected unit
  const convertTemperature = (temp) => {
    const tempValue = toNumber(temp); // Ensure the value is numeric

    if (unit === 'Celsius') {
      return (tempValue - 273.15).toFixed(2); // Convert from Kelvin to Celsius
    } else if (unit === 'Fahrenheit') {
      return (((tempValue - 273.15) * 9) / 5 + 32).toFixed(2); // Convert from Kelvin to Fahrenheit
    } else if (unit === 'Kelvin') {
      return tempValue.toFixed(2); // Return Kelvin as is
    }
  };

  // Update the unit based on user selection
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  // Convert timestamp to a readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Ensure this is in seconds
    return date.toLocaleString(); // Format the date
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-md border">
      <h2 className="text-2xl font-semibold">{data.city}</h2>
      <div className="flex items-center">
        <p className="mr-2">
          Temperature: {convertTemperature(data.temp)}°{unit.charAt(0)}
        </p>

        {/* Dropdown for Unit Selection */}
        <select
          className="ml-2 border border-gray-300 rounded-md p-1 bg-blue-500 text-white"
          value={unit}
          onChange={handleUnitChange}
        >
          <option value="Celsius">°C</option>
          <option value="Fahrenheit">°F</option>
          <option value="Kelvin">°K</option>
        </select>
      </div>
      <p>
        Feels Like: {convertTemperature(data.feels_like)}°{unit.charAt(0)}
      </p>
      <p>Condition: {data.condition}</p>
      <p>Last Updated: {formatDate(data.dt)}</p> {/* Display the formatted timestamp */}
    </div>
  );
};

export default WeatherCard;
