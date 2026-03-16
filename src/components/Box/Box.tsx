import {
  Pressable,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { Theme } from "@/src/theme";
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  createBox,
  createRestyleComponent,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
  spacingShorthand,
  SpacingShorthandProps,
} from "@shopify/restyle";

export const Box = createBox<Theme>();

export type TouchableOpacityBoxProps = BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  LayoutProps<Theme> &
  TouchableOpacityProps &
  ShadowProps<Theme> &
  OpacityProps<Theme> &
  PositionProps<Theme>;

export type PressableBoxProps = BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  LayoutProps<Theme> &
  TouchableOpacityProps &
  ShadowProps<Theme> &
  OpacityProps<Theme> &
  PositionProps<Theme>;

export type BoxProps = React.ComponentProps<typeof Box>;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [
    backgroundColor,
    border,
    spacing,
    spacingShorthand,
    layout,
    shadow,
    position,
    opacity,
  ],
  TouchableOpacity,
);

export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
  [
    backgroundColor,
    border,
    spacing,
    spacingShorthand,
    layout,
    shadow,
    opacity,
    position,
  ],
  Pressable,
);
