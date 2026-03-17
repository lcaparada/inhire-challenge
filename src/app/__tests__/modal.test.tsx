import { ThemeProvider } from "@shopify/restyle";
import { act, fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";

import { theme } from "@/src/theme";
import SearchCityScreen from "../modal";

jest.mock("expo-router", () => ({ router: { back: jest.fn() } }));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children: React.ReactNode }) => children,
}));

const mockAddCity = jest.fn();
const mockSelectCity = jest.fn();

jest.mock("@/src/context/location.context", () => ({
  useCustomCity: () => ({
    addCity: mockAddCity,
    selectCity: mockSelectCity,
    weatherGradient: ["#000", "#111"] as [string, string],
  }),
}));

const mockGetCurrentByCity = jest.fn();

jest.mock("@/src/domain/weather/weather.service", () => ({
  weatherService: { getCurrentByCity: mockGetCurrentByCity },
}));

const renderScreen = () =>
  render(
    <ThemeProvider theme={theme}>
      <SearchCityScreen />
    </ThemeProvider>,
  );

beforeEach(() => jest.clearAllMocks());

describe("SearchCityScreen (modal)", () => {
  it("renders the screen title", () => {
    const { getByText } = renderScreen();
    expect(getByText("Buscar cidade")).toBeTruthy();
  });

  it("renders the search input with placeholder", () => {
    const { getByPlaceholderText } = renderScreen();
    expect(
      getByPlaceholderText("Ex: São Paulo, London, Tokyo..."),
    ).toBeTruthy();
  });

  it("renders the Buscar and GPS buttons", () => {
    const { getByText } = renderScreen();
    expect(getByText("Buscar")).toBeTruthy();
    expect(getByText("📍 Usar minha localização")).toBeTruthy();
  });

  it("calls router.back() when ✕ is pressed", () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText("✕"));
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it("Buscar button does not trigger search when query is empty", () => {
    const { getByPlaceholderText } = renderScreen();
    const input = getByPlaceholderText("Ex: São Paulo, London, Tokyo...");
    fireEvent(input, "submitEditing");
    expect(mockGetCurrentByCity).not.toHaveBeenCalled();
  });

  it("shows error message when city is not found", async () => {
    mockGetCurrentByCity.mockRejectedValueOnce(new Error("Not found"));

    const { getByPlaceholderText, getByText } = renderScreen();
    const input = getByPlaceholderText("Ex: São Paulo, London, Tokyo...");
    fireEvent.changeText(input, "xyzxyz");

    await act(async () => {
      await (input.props.onSubmitEditing as () => Promise<void>)();
    });

    expect(getByText("Cidade não encontrada. Tente outro nome.")).toBeTruthy();
    expect(router.back).not.toHaveBeenCalled();
  });

  it("clears the error when text changes after a failed search", async () => {
    mockGetCurrentByCity.mockRejectedValueOnce(new Error("Not found"));

    const { getByPlaceholderText, getByText, queryByText } = renderScreen();
    const input = getByPlaceholderText("Ex: São Paulo, London, Tokyo...");
    fireEvent.changeText(input, "xyzxyz");

    await act(async () => {
      await (input.props.onSubmitEditing as () => Promise<void>)();
    });

    expect(getByText("Cidade não encontrada. Tente outro nome.")).toBeTruthy();

    fireEvent.changeText(input, "London");
    expect(queryByText("Cidade não encontrada. Tente outro nome.")).toBeNull();
  });

  it("calls selectCity(null) and router.back() when GPS button is pressed", () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText("📍 Usar minha localização"));
    expect(mockSelectCity).toHaveBeenCalledWith(null);
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it("does not search when query is only whitespace", async () => {
    const { getByPlaceholderText } = renderScreen();
    const input = getByPlaceholderText("Ex: São Paulo, London, Tokyo...");
    fireEvent.changeText(input, "   ");

    await act(async () => {
      await (input.props.onSubmitEditing as () => Promise<void>)();
    });

    expect(mockGetCurrentByCity).not.toHaveBeenCalled();
  });
});
