import { ThemeProvider } from "@shopify/restyle";
import { render } from "@testing-library/react-native";
import React from "react";

import { theme } from "@/src/theme";
import { StatCard } from "../StatCard";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("StatCard", () => {
  it("renders the label", () => {
    const { getByText } = renderWithTheme(
      <StatCard label="Humidity" value="80%" icon="💧" />
    );
    expect(getByText("Humidity")).toBeTruthy();
  });

  it("renders the value", () => {
    const { getByText } = renderWithTheme(
      <StatCard label="Humidity" value="80%" icon="💧" />
    );
    expect(getByText("80%")).toBeTruthy();
  });

  it("renders the icon", () => {
    const { getByText } = renderWithTheme(
      <StatCard label="Humidity" value="80%" icon="💧" />
    );
    expect(getByText("💧")).toBeTruthy();
  });

  it("renders different props correctly", () => {
    const { getByText } = renderWithTheme(
      <StatCard label="Wind" value="12 km/h" icon="💨" />
    );
    expect(getByText("Wind")).toBeTruthy();
    expect(getByText("12 km/h")).toBeTruthy();
    expect(getByText("💨")).toBeTruthy();
  });
});
