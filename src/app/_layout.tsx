import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { theme } from "@/src/theme";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SFProRounded-Regular": require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "SFProRounded-Medium": require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
    "SFProRounded-Semibold": require("@/assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "SFProRounded-Bold": require("@/assets/fonts/SF-Pro-Rounded-Bold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
