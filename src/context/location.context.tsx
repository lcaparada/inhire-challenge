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
  savedCities: CityLocation[];
  activeCity: CityLocation | null; // null = GPS
  addCity: (city: CityLocation) => void;
  removeCity: (index: number) => void;
  selectCity: (city: CityLocation | null) => void;
  weatherGradient: GradientPair;
  setWeatherGradient: (gradient: GradientPair) => void;
};

const LocationContext = createContext<ContextValue>({
  savedCities: [],
  activeCity: null,
  addCity: () => {},
  removeCity: () => {},
  selectCity: () => {},
  weatherGradient: DEFAULT_GRADIENT,
  setWeatherGradient: () => {},
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [savedCities, setSavedCities] = useState<CityLocation[]>([]);
  const [activeCity, setActiveCity] = useState<CityLocation | null>(null);
  const [weatherGradient, setWeatherGradient] =
    useState<GradientPair>(DEFAULT_GRADIENT);

  function addCity(city: CityLocation) {
    setSavedCities((prev) => {
      const alreadyExists = prev.some(
        (c) => c.name === city.name && c.country === city.country,
      );
      return alreadyExists ? prev : [...prev, city];
    });
    setActiveCity(city);
  }

  function removeCity(index: number) {
    setSavedCities((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next;
    });
    setActiveCity((prev) => {
      if (prev && savedCities[index]?.name === prev.name) return null;
      return prev;
    });
  }

  function selectCity(city: CityLocation | null) {
    setActiveCity(city);
  }

  return (
    <LocationContext.Provider
      value={{
        savedCities,
        activeCity,
        addCity,
        removeCity,
        selectCity,
        weatherGradient,
        setWeatherGradient,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useCustomCity() {
  return useContext(LocationContext);
}
