import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((r) => r.data);
};

const getWeather = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`,
  );
  return request.then((r) => r.data);
};

export default { getAll, getWeather };
