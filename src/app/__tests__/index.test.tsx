import { ThemeProvider } from "@shopify/restyle";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { theme } from "@/src/theme";
import type { OneCall } from "@/src/types/weather";
import HomeScreen from "../index";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("expo-image", () => ({ Image: () => null }));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock("@/src/components/CitiesDrawer/CitiesDrawer", () => ({
  CitiesDrawer: () => null,
}));

const mockSetWeatherGradient = jest.fn();

const mockCustomCity = {
  activeCity: null as null | {
    name: string;
    country: string;
    coords: { latitude: number; longitude: number };
  },
  setWeatherGradient: mockSetWeatherGradient,
  weatherGradient: ["#000", "#111"] as [string, string],
};

jest.mock("@/src/context/location.context", () => ({
  useCustomCity: () => mockCustomCity,
}));

const mockRefresh = jest.fn();

const mockUseLocation = jest.fn();
const mockUseWeatherByCoords = jest.fn();

jest.mock("@/src/hooks", () => ({
  useLocation: () => mockUseLocation(),
  useWeatherByCoords: () => mockUseWeatherByCoords(),
}));

const LOCATION_IDLE = {
  coords: { latitude: -23.5, longitude: -46.6 },
  cityName: "São Paulo",
  countryCode: "BR",
  error: null,
  loading: false,
};

const WEATHER_LOADING = {
  data: null,
  airQuality: null,
  loading: true,
  error: null,
  refresh: mockRefresh,
};
const WEATHER_ERROR = {
  data: null,
  airQuality: null,
  loading: false,
  error: "Erro de rede",
  refresh: mockRefresh,
};

const oneCall: OneCall = {
  lat: -23.5,
  lon: -46.6,
  timezone: "America/Sao_Paulo",
  timezone_offset: -10800,
  current: {
    dt: 1700050000,
    sunrise: 1700030000,
    sunset: 1700075000,
    temp: 24.3,
    feels_like: 25.1,
    pressure: 1015,
    humidity: 72,
    uvi: 4.5,
    clouds: 20,
    visibility: 10000,
    wind_speed: 3.5,
    wind_deg: 90,
    weather: [
      { id: 800, main: "Clear", description: "céu limpo", icon: "01d" },
    ],
  },
  hourly: Array.from({ length: 8 }, (_, i) => ({
    dt: 1700050000 + i * 3600,
    temp: 22 + i,
    feels_like: 21,
    humidity: 70,
    wind_speed: 3,
    wind_deg: 90,
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
    pop: 0,
  })),
  daily: Array.from({ length: 7 }, (_, i) => ({
    dt: 1700050000 + i * 86400,
    sunrise: 1700030000,
    sunset: 1700075000,
    temp: { day: 24, min: 18, max: 27, night: 19, eve: 22, morn: 18 },
    feels_like: { day: 23, night: 18, eve: 21, morn: 17 },
    pressure: 1015,
    humidity: 65,
    wind_speed: 4,
    wind_deg: 100,
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
    clouds: 10,
    pop: 0,
    uvi: 5,
  })),
};

const WEATHER_OK = {
  data: oneCall,
  airQuality: {
    list: [
      {
        main: { aqi: 2 },
        components: { co: 200, no2: 5.1, pm2_5: 8.3, pm10: 12, o3: 60 },
      },
    ],
  },
  loading: false,
  error: null,
  refresh: mockRefresh,
};

const renderScreen = () =>
  render(
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>,
  );

beforeEach(() => {
  jest.clearAllMocks();
  mockCustomCity.activeCity = null;
  mockUseLocation.mockReturnValue(LOCATION_IDLE);
  mockUseWeatherByCoords.mockReturnValue(WEATHER_OK);
});

describe("HomeScreen", () => {
  describe("loading state", () => {
    it("shows loading indicator while weather is fetching", () => {
      mockUseWeatherByCoords.mockReturnValue(WEATHER_LOADING);
      const { getByText } = renderScreen();
      expect(getByText("Carregando clima...")).toBeTruthy();
    });

    it("shows location loading message while fetching GPS", () => {
      mockUseLocation.mockReturnValue({
        ...LOCATION_IDLE,
        loading: true,
        coords: null,
      });
      mockUseWeatherByCoords.mockReturnValue(WEATHER_LOADING);
      const { getByText } = renderScreen();
      expect(getByText("Obtendo localização...")).toBeTruthy();
    });
  });

  describe("error state", () => {
    it("shows error message when weather fetch fails", () => {
      mockUseWeatherByCoords.mockReturnValue(WEATHER_ERROR);
      const { getByText } = renderScreen();
      expect(getByText("Erro de rede")).toBeTruthy();
    });

    it("shows 'Tentar novamente' button on error", () => {
      mockUseWeatherByCoords.mockReturnValue(WEATHER_ERROR);
      const { getByText } = renderScreen();
      expect(getByText("Tentar novamente")).toBeTruthy();
    });

    it("calls refresh when 'Tentar novamente' is pressed", () => {
      mockUseWeatherByCoords.mockReturnValue(WEATHER_ERROR);
      const { getByText } = renderScreen();
      fireEvent.press(getByText("Tentar novamente"));
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  describe("weather content", () => {
    it("shows the GPS city name and country code", () => {
      const { getByText } = renderScreen();
      expect(getByText("São Paulo, BR")).toBeTruthy();
    });

    it("shows the current temperature rounded", () => {
      const { getByText } = renderScreen();
      expect(getByText("24°C")).toBeTruthy();
    });

    it("shows the weather description", () => {
      const { getByText } = renderScreen();
      expect(getByText("céu limpo")).toBeTruthy();
    });

    it("shows max and min temperature of today", () => {
      const { getByText } = renderScreen();
      expect(getByText(/Máx 27° · Mín 18°/)).toBeTruthy();
    });

    it("shows humidity stat card", () => {
      const { getByText } = renderScreen();
      expect(getByText("72%")).toBeTruthy();
      expect(getByText("Umidade")).toBeTruthy();
    });

    it("shows wind speed stat card in km/h", () => {
      const { getByText } = renderScreen();
      expect(getByText("13 km/h")).toBeTruthy();
      expect(getByText("Vento")).toBeTruthy();
    });

    it("shows feels_like stat card", () => {
      const { getByText } = renderScreen();
      expect(getByText("Sensação")).toBeTruthy();
    });

    it("shows UV index stat card", () => {
      const { getByText } = renderScreen();
      expect(getByText("5 · Moderado")).toBeTruthy();
    });

    it("shows visibility stat card", () => {
      const { getByText } = renderScreen();
      expect(getByText("10 km")).toBeTruthy();
      expect(getByText("Visibilidade")).toBeTruthy();
    });

    it("shows pressure stat card", () => {
      const { getByText } = renderScreen();
      expect(getByText("1015 hPa")).toBeTruthy();
    });

    it("shows the hourly forecast section header", () => {
      const { getAllByText } = renderScreen();
      expect(getAllByText("Hoje").length).toBeGreaterThanOrEqual(1);
    });

    it("shows the 'Próximos dias' section", () => {
      const { getByText } = renderScreen();
      expect(getByText("Próximos dias")).toBeTruthy();
    });

    it("shows 'Qualidade do ar' section with AQI label", () => {
      const { getByText } = renderScreen();
      expect(getByText("Qualidade do ar")).toBeTruthy();
      expect(getByText("Regular")).toBeTruthy();
    });

    it("shows PM2.5 and NO₂ values in air quality section", () => {
      const { getByText } = renderScreen();
      expect(getByText(/PM2\.5: 8\.3/)).toBeTruthy();
    });

    it("shows sunrise time card", () => {
      const { getByText } = renderScreen();
      expect(getByText("🌅 Nascer do sol")).toBeTruthy();
    });

    it("shows sunset time card", () => {
      const { getByText } = renderScreen();
      expect(getByText("🌇 Pôr do sol")).toBeTruthy();
    });

    it("opens the drawer when ☰ is pressed", () => {
      const { getByText } = renderScreen();
      expect(getByText("☰")).toBeTruthy();
      fireEvent.press(getByText("☰"));
    });
  });

  describe("activeCity mode", () => {
    it("shows the active city name instead of GPS name", () => {
      mockCustomCity.activeCity = {
        name: "Lisboa",
        country: "PT",
        coords: { latitude: 38.7, longitude: -9.1 },
      };
      const { getByText } = renderScreen();
      expect(getByText("Lisboa, PT")).toBeTruthy();
    });
  });
});
