import type { Coords } from "@/src/types";
import {
  useGetAirQuality,
  useGetCurrentByCoords,
  useGetForecastByCoords,
} from "../domain";

export function useWeatherByCoords(coords: Coords | null) {
  const lat = coords?.latitude ?? 0;
  const lon = coords?.longitude ?? 0;
  const current = useGetCurrentByCoords({ lat, lon });
  const forecast = useGetForecastByCoords({ lat, lon });
  const airQuality = useGetAirQuality({ lat, lon });

  return {
    current: current.data ?? null,
    forecast: forecast.data ?? null,
    airQuality: airQuality.data ?? null,
    loading: current.isLoading || forecast.isLoading || airQuality.isLoading,
    error:
      (current.error ?? forecast.error ?? airQuality.error)?.message ?? null,
    refresh: () => {
      current.refetch();
      forecast.refetch();
      airQuality.refetch();
    },
  };
}
