import { createTheme } from "@shopify/restyle";

const palette = {
  skyBlue50: "#E1F5FE",
  skyBlue100: "#B3E5FC",
  skyBlue200: "#81D4FA",
  skyBlue300: "#4FC3F7",
  skyBlue400: "#29B6F6",
  skyBlue500: "#03A9F4",
  skyBlue600: "#039BE5",
  skyBlue700: "#0288D1",
  skyBlue800: "#0277BD",
  skyBlue900: "#01579B",

  nightBlue50: "#E8EAF6",
  nightBlue100: "#C5CAE9",
  nightBlue700: "#303F9F",
  nightBlue800: "#283593",
  nightBlue900: "#1A237E",
  nightBlueDeep: "#0D1B2A",

  stormGrey50: "#ECEFF1",
  stormGrey100: "#CFD8DC",
  stormGrey300: "#90A4AE",
  stormGrey400: "#78909C",
  stormGrey500: "#607D8B",
  stormGrey600: "#546E7A",
  stormGrey700: "#455A64",
  stormGrey800: "#37474F",
  stormGrey900: "#263238",

  rainSlate700: "#2C3E50",
  rainSlate800: "#1C2833",

  snowLight: "#CFD8DC",
  snowMid: "#90A4AE",

  tempFreezing: "#82B1FF",
  tempCold: "#4FC3F7",
  tempCool: "#64B5F6",
  tempMild: "#81C784",
  tempWarm: "#FFB74D",
  tempHot: "#EF5350",

  aqiGood: "#4CAF50",
  aqiFair: "#8BC34A",
  aqiModerate: "#FFC107",
  aqiPoor: "#FF5722",
  aqiVeryPoor: "#B71C1C",

  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  glassWeak: "rgba(255,255,255,0.12)",
  glassLight: "rgba(255,255,255,0.18)",
  glassMedium: "rgba(255,255,255,0.24)",
  glassStrong: "rgba(255,255,255,0.36)",
  glassBorderWeak: "rgba(255,255,255,0.15)",
  glassBorder: "rgba(255,255,255,0.25)",
  glassBorderStrong: "rgba(255,255,255,0.42)",

  darkOverlayWeak: "rgba(0,0,0,0.08)",
  darkOverlay: "rgba(0,0,0,0.18)",
} as const;

export const theme = createTheme({
  colors: {
    ...palette,

    appBackground: palette.nightBlueDeep,

    textPrimary: palette.white,
    textSecondary: "rgba(255,255,255,0.80)",
    textMuted: "rgba(255,255,255,0.55)",
    textOnSnow: "#1A237E", // texto escuro para o tema neve

    tabBarBackground: palette.nightBlueDeep,
    tabBarActive: palette.skyBlue300,
    tabBarInactive: "rgba(255,255,255,0.45)",
    tabBarBorder: "rgba(255,255,255,0.10)",

    cardBackground: palette.glassMedium,
    cardBorder: palette.glassBorder,
    cardBackgroundWeak: palette.glassLight,
    cardBorderWeak: palette.glassBorderWeak,
    cardBackgroundStrong: palette.glassStrong,
    cardBorderStrong: palette.glassBorderStrong,

    inputBackground: palette.glassLight,
    inputBorder: palette.glassBorder,
    inputPlaceholder: "rgba(255,255,255,0.45)",

    primary: palette.skyBlue300,
    primaryDark: palette.skyBlue700,
    primaryText: palette.white,

    gradientClearDayStart: palette.skyBlue300,
    gradientClearDayEnd: palette.skyBlue800,
    gradientClearNightStart: palette.nightBlue900,
    gradientClearNightEnd: "#0D47A1",
    gradientCloudsStart: palette.stormGrey400,
    gradientCloudsEnd: palette.stormGrey700,
    gradientCloudsNightStart: palette.stormGrey800,
    gradientCloudsNightEnd: palette.stormGrey900,
    gradientRainStart: "#4A6572",
    gradientRainEnd: palette.rainSlate700,
    gradientDrizzleStart: palette.stormGrey500,
    gradientDrizzleEnd: palette.stormGrey800,
    gradientThunderstormStart: palette.stormGrey800,
    gradientThunderstormEnd: "#1C1C1C",
    gradientSnowStart: palette.snowLight,
    gradientSnowEnd: palette.snowMid,
    gradientMistStart: palette.stormGrey300,
    gradientMistEnd: palette.stormGrey500,
  },

  spacing: {
    s0: 0,
    s2: 2,
    s3: 3,
    s4: 4,
    s5: 5,
    s6: 6,
    s7: 7,
    s8: 8,
    s9: 9,
    s10: 10,
    s12: 12,
    s14: 14,
    s16: 16,
    s18: 18,
    s20: 20,
    s22: 22,
    s24: 24,
    s25: 25,
    s26: 26,
    s28: 28,
    s30: 30,
    s32: 32,
    s35: 35,
    s40: 40,
    s48: 48,
    s56: 56,
    s100: 100,
    s200: 200,
    s300: 300,
    s400: 400,
  },

  borderRadii: {
    s0: 0,
    s4: 4,
    s8: 8,
    s10: 10,
    s12: 12,
    s16: 16,
    s20: 20,
    s25: 25,
    s32: 32,
    s48: 48,
    full: 999,
  },

  breakpoints: {
    phone: 0,
    tablet: 768,
  },

  textVariants: {
    defaults: {
      color: "textPrimary",
      fontSize: 14,
    },
    temperature: {
      color: "textPrimary",
      fontSize: 72,
      fontWeight: "200",
      lineHeight: 80,
    },
    cityName: {
      color: "textPrimary",
      fontSize: 22,
      fontWeight: "700",
    },
    title: {
      color: "textPrimary",
      fontSize: 28,
      fontWeight: "700",
    },
    sectionTitle: {
      color: "textPrimary",
      fontSize: 16,
      fontWeight: "600",
    },
    description: {
      color: "textSecondary",
      fontSize: 18,
    },
    metricValue: {
      color: "textPrimary",
      fontSize: 16,
      fontWeight: "600",
    },
    metricLabel: {
      color: "textMuted",
      fontSize: 11,
    },
    tempSmall: {
      color: "textPrimary",
      fontSize: 15,
      fontWeight: "600",
    },
    hour: {
      color: "textSecondary",
      fontSize: 12,
    },
    precipitation: {
      color: "textMuted",
      fontSize: 11,
    },
    body: {
      color: "textSecondary",
      fontSize: 15,
    },
    caption: {
      color: "textMuted",
      fontSize: 12,
    },
  },

  zIndices: undefined,
});

export type Theme = typeof theme;
