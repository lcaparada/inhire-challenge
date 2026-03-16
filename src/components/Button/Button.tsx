import { ActivityIndicator } from "react-native";

import { TouchableOpacityBox, TouchableOpacityBoxProps } from "../Box/Box";
import { Text, TextVariants, TextWeightVariants } from "../Text/Text";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
}

type ButtonStyle = {
  paddingHorizontal: TouchableOpacityBoxProps["paddingHorizontal"];
  paddingVertical: TouchableOpacityBoxProps["paddingVertical"];
  borderRadius: TouchableOpacityBoxProps["borderRadius"];
  textPreset: TextVariants;
  textWeight: TextWeightVariants;
};

const SIZE_STYLES: Record<ButtonSize, ButtonStyle> = {
  sm: {
    paddingHorizontal: "s16",
    paddingVertical: "s8",
    borderRadius: "s10",
    textPreset: "paragraphs",
    textWeight: "semiBold",
  },
  md: {
    paddingHorizontal: "s24",
    paddingVertical: "s12",
    borderRadius: "s12",
    textPreset: "paragraphsBig",
    textWeight: "semiBold",
  },
  lg: {
    paddingHorizontal: "s32",
    paddingVertical: "s16",
    borderRadius: "s16",
    textPreset: "default",
    textWeight: "bold",
  },
};

const VARIANT_STYLES: Record<
  ButtonVariant,
  Pick<
    TouchableOpacityBoxProps,
    "backgroundColor" | "borderWidth" | "borderColor"
  > & { textColor: TouchableOpacityBoxProps["backgroundColor"] }
> = {
  solid: {
    backgroundColor: "cardBackgroundStrong",
    borderWidth: 1,
    borderColor: "cardBorderStrong",
    textColor: "textPrimary",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "cardBorder",
    textColor: "textPrimary",
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    textColor: "primary",
  },
};

export const Button = ({
  title,
  variant = "solid",
  size = "md",
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const sizeStyle = SIZE_STYLES[size];
  const variantStyle = VARIANT_STYLES[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacityBox
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      activeOpacity={0.7}
      {...sizeStyle}
      backgroundColor={variantStyle.backgroundColor}
      borderWidth={variantStyle.borderWidth}
      borderColor={variantStyle.borderColor}
      opacity={isDisabled ? 0.5 : 1}
      disabled={isDisabled}
      style={{ gap: 8 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          preset={sizeStyle.textPreset}
          weight={sizeStyle.textWeight}
          color={variantStyle.textColor}
        >
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
};
