import axios from "axios";

const BASE_URL = "https://api.weatherapi.com/v1";

export const getRealtimeWeather = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}current.json?key=${import.meta.env.VITE_API_KEY}&q=${query}&aqi=no`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getForecastWeather = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${query}&days=3&aqi=no&alerts=no`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
