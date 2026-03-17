import { createContext, useContext, useState } from "react";

import type { Coords } from "@/src/types/weather";

export type CityLocation = {
  name: string;
  country: string;
  coords: Coords;
};

type ContextValue = {
  customCity: CityLocation | null;
  setCustomCity: (city: CityLocation | null) => void;
};

const LocationContext = createContext<ContextValue>({
  customCity: null,
  setCustomCity: () => {},
});

export function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customCity, setCustomCity] = useState<CityLocation | null>(null);

  return (
    <LocationContext.Provider value={{ customCity, setCustomCity }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useCustomCity() {
  return useContext(LocationContext);
}
