import { ThemeProvider } from "@shopify/restyle";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { theme } from "@/src/theme";
import { Button } from "../Button";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("Button", () => {
  it("renders the title", () => {
    const { getByText } = renderWithTheme(<Button title="Confirm" />);
    expect(getByText("Confirm")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Click" onPress={onPress} />
    );
    fireEvent.press(getByText("Click"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("shows ActivityIndicator and hides title when loading", () => {
    const { queryByText, getByTestId } = renderWithTheme(
      <Button title="Submit" loading testID="btn" />
    );
    expect(queryByText("Submit")).toBeNull();
    // ActivityIndicator is rendered inside the button
    const btn = getByTestId("btn");
    expect(btn).toBeTruthy();
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Disabled" disabled onPress={onPress} />
    );
    fireEvent.press(getByText("Disabled"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("does not call onPress when loading", () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Button title="Loading" loading onPress={onPress} testID="btn-loading" />
    );
    fireEvent.press(getByTestId("btn-loading"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it.each([["solid"], ["outline"], ["ghost"]] as const)(
    "renders variant %s without crashing",
    (variant) => {
      const { getByText } = renderWithTheme(
        <Button title={variant} variant={variant} />
      );
      expect(getByText(variant)).toBeTruthy();
    }
  );

  it.each([["sm"], ["md"], ["lg"]] as const)(
    "renders size %s without crashing",
    (size) => {
      const { getByText } = renderWithTheme(
        <Button title={size} size={size} />
      );
      expect(getByText(size)).toBeTruthy();
    }
  );
});
