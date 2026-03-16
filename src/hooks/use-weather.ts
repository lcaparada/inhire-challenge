import { weatherApi } from "@/src/services/weather-api";
import type {
  AirQuality,
  Coords,
  CurrentWeather,
  Forecast,
} from "@/src/types/weather";
import { useCallback, useEffect, useState } from "react";

type WeatherState = {
  current: CurrentWeather | null;
  forecast: Forecast | null;
  airQuality: AirQuality | null;
  loading: boolean;
  error: string | null;
};

const initial: WeatherState = {
  current: null,
  forecast: null,
  airQuality: null,
  loading: false,
  error: null,
};

export function useWeatherByCoords(coords: Coords | null) {
  const [state, setState] = useState<WeatherState>(initial);

  const refresh = useCallback(async () => {
    if (!coords) return;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const [current, forecast, airQuality] = await Promise.all([
        weatherApi.currentByCoords(coords.latitude, coords.longitude),
        weatherApi.forecastByCoords(coords.latitude, coords.longitude),
        weatherApi.airQuality(coords.latitude, coords.longitude),
      ]);
      setState({ current, forecast, airQuality, loading: false, error: null });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erro ao carregar clima";
      setState((s) => ({ ...s, loading: false, error: message }));
    }
  }, [coords]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, refresh };
}
