import { useCallback } from "react";

import {
  useGetAirQuality,
  useGetCurrentByCoords,
  useGetForecastByCoords,
} from "../domain";

export function useWeatherByCoords(lat: number, lon: number) {
  const current = useGetCurrentByCoords({ lat, lon });
  const forecast = useGetForecastByCoords({ lat, lon });
  const airQuality = useGetAirQuality({ lat, lon });

  const refresh = useCallback(() => {
    current.refetch();
    forecast.refetch();
    airQuality.refetch();
  }, [current.refetch, forecast.refetch, airQuality.refetch]);

  return {
    current: current.data ?? null,
    forecast: forecast.data ?? null,
    airQuality: airQuality.data ?? null,
    loading: current.isLoading || forecast.isLoading || airQuality.isLoading,
    error:
      (current.error ?? forecast.error ?? airQuality.error)?.message ?? null,
    refresh,
  };
}
