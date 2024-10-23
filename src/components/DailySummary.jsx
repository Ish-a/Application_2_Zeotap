import { useState } from 'react';

const DailySummary = ({ weatherData }) => {
  const [unit, setUnit] = useState('Celsius'); // Initialize state at the top

  if (!weatherData.length) {
    return <p>No weather data available.</p>; // Handle no data scenario safely
  }

  // Helper to convert temperature based on selected unit
  const convertTemperature = (temp) => {
    const tempValue = parseFloat(temp); // Ensure temp is a number

    if (unit === 'Celsius') {
      return (tempValue - 273.15).toFixed(2); // Convert from Kelvin to Celsius
    } else if (unit === 'Fahrenheit') {
      return (((tempValue - 273.15) * 9) / 5 + 32).toFixed(2); // Convert from Kelvin to Fahrenheit
    } else if (unit === 'Kelvin') {
      return tempValue.toFixed(2); // Return Kelvin as is
    }
  };

  // Extract temperatures and calculate aggregates
  const temps = weatherData.map((data) => parseFloat(data.temp));
  const avgTemp = convertTemperature(temps.reduce((a, b) => a + b, 0) / temps.length);
  const maxTemp = convertTemperature(Math.max(...temps));
  const minTemp = convertTemperature(Math.min(...temps));

  return (
    <div className="mt-10 p-5 bg-gray-200 rounded-md">
      <h3 className="text-xl font-bold mb-3">Daily Weather Summary</h3>

      {/* Temperature Unit Selector */}
      <div className="mb-5">
        <label className="mr-2 font-semibold">Select Unit:</label>
        <select
          className="border border-gray-400 rounded px-2 py-1"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="Celsius">Celsius (°C)</option>
          <option value="Fahrenheit">Fahrenheit (°F)</option>
          <option value="Kelvin">Kelvin (K)</option>
        </select>
      </div>

      {/* Display Weather Summary */}
      <p>Average Temperature: {avgTemp}°{unit === 'Kelvin' ? 'K' : unit.charAt(0)}</p>
      <p>Max Temperature: {maxTemp}°{unit === 'Kelvin' ? 'K' : unit.charAt(0)}</p>
      <p>Min Temperature: {minTemp}°{unit === 'Kelvin' ? 'K' : unit.charAt(0)}</p>
    </div>
  );
};

export default DailySummary;
