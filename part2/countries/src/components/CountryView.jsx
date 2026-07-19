import { useState, useEffect } from "react";
import weatherService from "../services/countries";

const CountryView = ({ country }) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherService.getWeather(lat, lon).then((data) => {
      setWeatherData(data);
    });
  }, []);

  if (!weatherData) return <div>Fetching weather data...</div>;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital {country.capital}
        <br />
        Area {country.area}
      </p>
      <h2>Languages</h2>

      <ul>
        {Object.entries(country.languages).map((l) => (
          <li key={l[0]}>{l[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weatherData.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`}
      />
    </div>
  );
};

export default CountryView;
