import * as Location from "expo-location";
import { useEffect, useState } from "react";

import type { Coords } from "@/src/types/weather";

type LocationState = {
  coords: Coords | null;
  cityName: string | null;
  countryCode: string | null;
  error: string | null;
  loading: boolean;
};

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    coords: null,
    cityName: null,
    countryCode: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setState({
          coords: null,
          cityName: null,
          countryCode: null,
          error: "Permissão de localização negada",
          loading: false,
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [geocode] = await Location.reverseGeocodeAsync(location.coords);

      setState({
        coords: location.coords,
        cityName: geocode?.city ?? geocode?.subregion ?? geocode?.region ?? null,
        countryCode: geocode?.isoCountryCode ?? null,
        error: null,
        loading: false,
      });
    })();
  }, []);

  return state;
}
