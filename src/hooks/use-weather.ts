import { useCallback } from "react";

import { useGetAirQuality, useGetForecastByCoords } from "../domain";

export function useWeatherByCoords(lat: number, lon: number) {
  const forecastQuery = useGetForecastByCoords({ lat, lon });
  const airQualityQuery = useGetAirQuality({ lat, lon });

  const refresh = useCallback(() => {
    forecastQuery.refetch();
    airQualityQuery.refetch();
  }, [forecastQuery, airQualityQuery]);

  return {
    data: forecastQuery.data ?? null,
    airQuality: airQualityQuery.data ?? null,
    loading: forecastQuery.isLoading || airQualityQuery.isLoading,
    error:
      (forecastQuery.error ?? airQualityQuery.error)?.message ?? null,
    refresh,
  };
}
