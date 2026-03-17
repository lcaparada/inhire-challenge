import { ThemeProvider } from "@shopify/restyle";
import { render } from "@testing-library/react-native";
import React from "react";
import { StyleSheet } from "react-native";

import { theme } from "@/src/theme";
import { $fontFamily, $fontSize, Text } from "../Text";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const flatStyle = (element: { props: { style: unknown } }) =>
  StyleSheet.flatten(element.props.style as Parameters<typeof StyleSheet.flatten>[0]);

describe("Text", () => {
  it("renders children correctly", () => {
    const { getByText } = renderWithTheme(<Text>Hello World</Text>);
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("applies default preset (default) font size", () => {
    const { getByText } = renderWithTheme(<Text>Default</Text>);
    const style = flatStyle(getByText("Default"));
    expect(style).toMatchObject({ ...$fontFamily.regular, ...$fontSize.default });
  });

  it("applies bold weight", () => {
    const { getByText } = renderWithTheme(<Text weight="bold">Bold</Text>);
    const style = flatStyle(getByText("Bold"));
    expect(style).toMatchObject($fontFamily.bold);
  });

  it("applies semiBold weight", () => {
    const { getByText } = renderWithTheme(<Text weight="semiBold">SemiBold</Text>);
    const style = flatStyle(getByText("SemiBold"));
    expect(style).toMatchObject($fontFamily.semiBold);
  });

  it("applies titleBig preset font size", () => {
    const { getByText } = renderWithTheme(<Text preset="titleBig">Title</Text>);
    const style = flatStyle(getByText("Title"));
    expect(style).toMatchObject($fontSize.titleBig);
  });

  it("applies notes preset font size", () => {
    const { getByText } = renderWithTheme(<Text preset="notes">Note</Text>);
    const style = flatStyle(getByText("Note"));
    expect(style).toMatchObject($fontSize.notes);
  });

  it("merges custom style with preset styles", () => {
    const customStyle = { opacity: 0.5 };
    const { getByText } = renderWithTheme(<Text style={customStyle}>Styled</Text>);
    const style = flatStyle(getByText("Styled"));
    expect(style).toMatchObject({ ...$fontFamily.regular, ...$fontSize.default, ...customStyle });
  });
});
