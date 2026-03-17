import { createContext, useContext, useState } from "react";

import { theme } from "@/src/theme";
import type { Coords } from "@/src/types/weather";

export type CityLocation = {
  name: string;
  country: string;
  coords: Coords;
};

type GradientPair = [string, string];

const DEFAULT_GRADIENT: GradientPair = [
  theme.colors.gradientClearDayStart,
  theme.colors.gradientClearDayEnd,
];

type ContextValue = {
  customCity: CityLocation | null;
  setCustomCity: (city: CityLocation | null) => void;
  weatherGradient: GradientPair;
  setWeatherGradient: (gradient: GradientPair) => void;
};

const LocationContext = createContext<ContextValue>({
  customCity: null,
  setCustomCity: () => {},
  weatherGradient: DEFAULT_GRADIENT,
  setWeatherGradient: () => {},
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [customCity, setCustomCity] = useState<CityLocation | null>(null);
  const [weatherGradient, setWeatherGradient] =
    useState<GradientPair>(DEFAULT_GRADIENT);

  return (
    <LocationContext.Provider
      value={{ customCity, setCustomCity, weatherGradient, setWeatherGradient }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useCustomCity() {
  return useContext(LocationContext);
}
