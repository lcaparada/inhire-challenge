import { ThemeProvider } from "@shopify/restyle";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";

import type { CityLocation } from "@/src/context/location.context";
import { theme } from "@/src/theme";
import { CitiesDrawer } from "../CitiesDrawer";

jest.mock("expo-router", () => ({ router: { push: jest.fn() } }));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const mockSelectCity = jest.fn();
const mockRemoveCity = jest.fn();

const mockUseCustomCity = {
  savedCities: [] as CityLocation[],
  activeCity: null as CityLocation | null,
  selectCity: mockSelectCity,
  removeCity: mockRemoveCity,
  weatherGradient: ["#000", "#111"] as [string, string],
  addCity: jest.fn(),
  setWeatherGradient: jest.fn(),
};

jest.mock("@/src/context/location.context", () => ({
  useCustomCity: () => mockUseCustomCity,
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const defaultProps = {
  visible: true,
  onClose: jest.fn(),
  gpsCityName: "São Paulo",
  gpsCountryCode: "BR",
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseCustomCity.savedCities = [];
  mockUseCustomCity.activeCity = null;
});

describe("CitiesDrawer", () => {
  it("renders the GPS city label", () => {
    const { getByText } = renderWithTheme(<CitiesDrawer {...defaultProps} />);
    expect(getByText("São Paulo, BR")).toBeTruthy();
  });

  it('shows "Minha localização" when gpsCityName is null', () => {
    const { getByText } = renderWithTheme(
      <CitiesDrawer
        {...defaultProps}
        gpsCityName={null}
        gpsCountryCode={null}
      />,
    );
    expect(getByText("Minha localização")).toBeTruthy();
  });

  it("renders saved cities", () => {
    mockUseCustomCity.savedCities = [
      {
        name: "Lisboa",
        country: "PT",
        coords: { latitude: 38.7, longitude: -9.1 },
      },
      {
        name: "Paris",
        country: "FR",
        coords: { latitude: 48.8, longitude: 2.3 },
      },
    ];
    const { getByText } = renderWithTheme(<CitiesDrawer {...defaultProps} />);
    expect(getByText("Lisboa")).toBeTruthy();
    expect(getByText("Paris")).toBeTruthy();
  });

  it("calls onClose when backdrop is pressed", () => {
    const onClose = jest.fn();
    const { getByText } = renderWithTheme(
      <CitiesDrawer {...defaultProps} onClose={onClose} />,
    );
    fireEvent.press(getByText("✕"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls selectCity(null) and onClose when GPS row is pressed", () => {
    const onClose = jest.fn();
    const { getByText } = renderWithTheme(
      <CitiesDrawer {...defaultProps} onClose={onClose} />,
    );
    fireEvent.press(getByText("São Paulo, BR"));
    expect(mockSelectCity).toHaveBeenCalledWith(null);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls selectCity with the city and onClose when a saved city is pressed", () => {
    const city: CityLocation = {
      name: "Lisboa",
      country: "PT",
      coords: { latitude: 38.7, longitude: -9.1 },
    };
    mockUseCustomCity.savedCities = [city];
    const onClose = jest.fn();
    const { getByText } = renderWithTheme(
      <CitiesDrawer {...defaultProps} onClose={onClose} />,
    );
    fireEvent.press(getByText("Lisboa"));
    expect(mockSelectCity).toHaveBeenCalledWith(city);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls removeCity with the correct index when delete is pressed", () => {
    mockUseCustomCity.savedCities = [
      {
        name: "Lisboa",
        country: "PT",
        coords: { latitude: 38.7, longitude: -9.1 },
      },
    ];
    const { getAllByText } = renderWithTheme(
      <CitiesDrawer {...defaultProps} />,
    );
    fireEvent.press(getAllByText("🗑")[0]);
    expect(mockRemoveCity).toHaveBeenCalledWith(0);
  });

  it("shows checkmark (✓) next to active GPS city", () => {
    mockUseCustomCity.activeCity = null;
    const { getAllByText } = renderWithTheme(
      <CitiesDrawer {...defaultProps} />,
    );
    expect(getAllByText("✓").length).toBeGreaterThanOrEqual(1);
  });

  it("shows checkmark next to active saved city", () => {
    const city: CityLocation = {
      name: "Lisboa",
      country: "PT",
      coords: { latitude: 38.7, longitude: -9.1 },
    };
    mockUseCustomCity.savedCities = [city];
    mockUseCustomCity.activeCity = city;
    const { getAllByText } = renderWithTheme(
      <CitiesDrawer {...defaultProps} />,
    );
    expect(getAllByText("✓").length).toBeGreaterThanOrEqual(1);
  });

  it('navigates to /modal when "Adicionar cidade" is pressed', async () => {
    jest.useFakeTimers();
    const { getByText } = renderWithTheme(<CitiesDrawer {...defaultProps} />);
    fireEvent.press(getByText("Adicionar cidade"));
    jest.runAllTimers();
    expect(router.push).toHaveBeenCalledWith("/modal");
    jest.useRealTimers();
  });
});
