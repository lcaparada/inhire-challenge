import { ThemeProvider } from "@shopify/restyle";
import { render } from "@testing-library/react-native";
import React from "react";

import { theme } from "@/src/theme";
import type { OneCallHourly } from "@/src/types/weather";
import { HourlyItem } from "../HourlyItem";

jest.mock("expo-image", () => ({
  Image: () => null,
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const baseItem: OneCallHourly = {
  dt: 1700000000,
  temp: 22.6,
  feels_like: 21,
  humidity: 70,
  wind_speed: 5,
  wind_deg: 180,
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  pop: 0,
};

describe("HourlyItem", () => {
  it('shows "Agora" when isFirst is true', () => {
    const { getByText } = renderWithTheme(
      <HourlyItem item={baseItem} isFirst />,
    );
    expect(getByText("Agora")).toBeTruthy();
  });

  it("shows formatted time when isFirst is false", () => {
    const { queryByText } = renderWithTheme(<HourlyItem item={baseItem} />);
    expect(queryByText("Agora")).toBeNull();
  });

  it("renders rounded temperature with degree symbol", () => {
    const { getByText } = renderWithTheme(<HourlyItem item={baseItem} />);
    expect(getByText("23°")).toBeTruthy();
  });

  it("hides precipitation when pop is 0.05 or below", () => {
    const item = { ...baseItem, pop: 0.05 };
    const { queryByText } = renderWithTheme(<HourlyItem item={item} />);
    expect(queryByText("5%")).toBeNull();
  });

  it("shows precipitation percentage when pop is above 0.05", () => {
    const item = { ...baseItem, pop: 0.4 };
    const { getByText } = renderWithTheme(<HourlyItem item={item} />);
    expect(getByText("40%")).toBeTruthy();
  });

  it("falls back to icon 01d when weather array is empty", () => {
    const item = { ...baseItem, weather: [] };
    const { getByText } = renderWithTheme(<HourlyItem item={item} isFirst />);
    expect(getByText("Agora")).toBeTruthy();
  });
});
