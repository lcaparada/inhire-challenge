import { ThemeProvider } from "@shopify/restyle";
import { render } from "@testing-library/react-native";
import React from "react";

import { theme } from "@/src/theme";
import type { OneCallDaily } from "@/src/types/weather";
import { DailyItem } from "../DailyItem";

jest.mock("expo-image", () => ({
  Image: () => null,
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const baseItem: OneCallDaily = {
  dt: 1700000000,
  sunrise: 1699980000,
  sunset: 1700020000,
  temp: { day: 22, min: 15, max: 27, night: 17, eve: 20, morn: 16 },
  feels_like: { day: 21, night: 16, eve: 19, morn: 15 },
  pressure: 1013,
  humidity: 60,
  wind_speed: 5,
  wind_deg: 180,
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  clouds: 0,
  pop: 0,
  uvi: 3,
};

describe("DailyItem", () => {
  it('shows "Hoje" when isToday is true', () => {
    const { getByText } = renderWithTheme(
      <DailyItem item={baseItem} timezoneOffset={0} isToday />
    );
    expect(getByText("Hoje")).toBeTruthy();
  });

  it("shows a day name when isToday is false", () => {
    const { queryByText } = renderWithTheme(
      <DailyItem item={baseItem} timezoneOffset={0} isToday={false} />
    );
    expect(queryByText("Hoje")).toBeNull();
  });

  it("renders max and min temperatures", () => {
    const { getByText } = renderWithTheme(
      <DailyItem item={baseItem} timezoneOffset={0} />
    );
    expect(getByText("27°")).toBeTruthy();
    expect(getByText("15°")).toBeTruthy();
  });

  it("shows precipitation percentage when pop is above 0.05", () => {
    const item = { ...baseItem, pop: 0.6 };
    const { getByText } = renderWithTheme(
      <DailyItem item={item} timezoneOffset={0} />
    );
    expect(getByText("60%")).toBeTruthy();
  });

  it("hides precipitation when pop is 0.05 or below", () => {
    const item = { ...baseItem, pop: 0.03 };
    const { queryByText } = renderWithTheme(
      <DailyItem item={item} timezoneOffset={0} />
    );
    expect(queryByText("3%")).toBeNull();
  });

  it("falls back to icon 01d when weather array is empty", () => {
    const item = { ...baseItem, weather: [] };
    const { getByText } = renderWithTheme(
      <DailyItem item={item} timezoneOffset={0} isToday />
    );
    expect(getByText("Hoje")).toBeTruthy();
  });
});
