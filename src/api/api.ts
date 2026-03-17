import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    units: "metric",
    lang: "pt_br",
  },
});
