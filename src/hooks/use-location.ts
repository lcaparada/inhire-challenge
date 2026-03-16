import { useEffect, useState } from "react";
import * as Location from "expo-location";
import type { Coords } from "@/src/types/weather";

type LocationState = {
  coords: Coords | null;
  error: string | null;
  loading: boolean;
};

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    coords: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setState({
          coords: null,
          error: "Permissão de localização negada",
          loading: false,
        });
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setState({ coords: location.coords, error: null, loading: false });
    })();
  }, []);

  return state;
}
