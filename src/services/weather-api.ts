import type { AirQuality, CurrentWeather, Forecast } from "@/src/types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY ?? "";

async function request<T>(
  endpoint: string,
  params: Record<string, string>,
): Promise<T> {
  const query = new URLSearchParams({
    ...params,
    appid: API_KEY,
    units: "metric",
    lang: "pt_br",
  });
  const res = await fetch(`${BASE_URL}${endpoint}?${query}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Erro ${res.status}`);
  }
  return res.json();
}

export const weatherApi = {
  currentByCoords: (lat: number, lon: number) =>
    request<CurrentWeather>("/weather", {
      lat: String(lat),
      lon: String(lon),
    }),

  currentByCity: (city: string) =>
    request<CurrentWeather>("/weather", { q: city }),

  forecastByCoords: (lat: number, lon: number) =>
    request<Forecast>("/forecast", { lat: String(lat), lon: String(lon) }),

  forecastByCity: (city: string) => request<Forecast>("/forecast", { q: city }),

  airQuality: (lat: number, lon: number) =>
    request<AirQuality>("/air_pollution", {
      lat: String(lat),
      lon: String(lon),
    }),
};
