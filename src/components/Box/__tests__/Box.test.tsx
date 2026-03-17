import { ThemeProvider } from "@shopify/restyle";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { theme } from "@/src/theme";
import { Box, TouchableOpacityBox, PressableBox } from "../Box";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("Box", () => {
  it("renders children", () => {
    const { getByText } = renderWithTheme(
      <Box>
        <Text>inside box</Text>
      </Box>
    );
    expect(getByText("inside box")).toBeTruthy();
  });
});

describe("TouchableOpacityBox", () => {
  it("renders children", () => {
    const { getByText } = renderWithTheme(
      <TouchableOpacityBox>
        <Text>touchable</Text>
      </TouchableOpacityBox>
    );
    expect(getByText("touchable")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <TouchableOpacityBox onPress={onPress}>
        <Text>press me</Text>
      </TouchableOpacityBox>
    );
    fireEvent.press(getByText("press me"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <TouchableOpacityBox onPress={onPress} disabled>
        <Text>disabled</Text>
      </TouchableOpacityBox>
    );
    fireEvent.press(getByText("disabled"));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe("PressableBox", () => {
  it("renders children", () => {
    const { getByText } = renderWithTheme(
      <PressableBox>
        <Text>pressable</Text>
      </PressableBox>
    );
    expect(getByText("pressable")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <PressableBox onPress={onPress}>
        <Text>press me</Text>
      </PressableBox>
    );
    fireEvent.press(getByText("press me"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
