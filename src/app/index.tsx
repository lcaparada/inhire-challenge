import {
  getWeatherGradient,
  isDayTime,
  theme,
  weatherIconUrl,
} from "@/src/theme";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, HourlyItem, StatCard, Text } from "../components";
import { useCustomCity } from "../context/location.context";
import { useLocation, useWeatherByCoords } from "../hooks";

const AQI_INFO: Record<number, { label: string; color: string }> = {
  1: { label: "Boa", color: theme.colors.aqiGood },
  2: { label: "Regular", color: theme.colors.aqiFair },
  3: { label: "Moderada", color: theme.colors.aqiModerate },
  4: { label: "Ruim", color: theme.colors.aqiPoor },
  5: { label: "Péssima", color: theme.colors.aqiVeryPoor },
};

function formatDate(dt: number, timezone: number): string {
  const date = new Date((dt + timezone) * 1000);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const location = useLocation();
  const { customCity, setCustomCity, setWeatherGradient } = useCustomCity();

  const activeCoords = customCity?.coords ?? location.coords;
  const weather = useWeatherByCoords(activeCoords);

  const current = weather.current;
  const isLoading = (customCity ? false : location.loading) || weather.loading;
  const error = (customCity ? null : location.error) ?? weather.error;

  const weatherId = current?.current.weather[0]?.id ?? 800;
  const day = current
    ? isDayTime(
        current.current.dt,
        current.current.sunrise,
        current.current.sunset,
      )
    : true;
  const gradient = getWeatherGradient(weatherId, day);

  useEffect(() => {
    setWeatherGradient(gradient);
  }, [gradient[0], gradient[1]]);

  const hourly = current?.hourly.slice(0, 8) ?? [];
  const aqi = weather.airQuality?.list[0];
  const todayDaily = weather.forecast?.daily[0];

  return (
    <LinearGradient colors={gradient} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && (
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: 400 }}
          >
            <ActivityIndicator size="large" color={theme.colors.white} />
            <Text
              preset="paragraphs"
              color="textSecondary"
              style={{ marginTop: 12 }}
            >
              {location.loading
                ? "Obtendo localização..."
                : "Carregando clima..."}
            </Text>
          </Box>
        )}

        {error && !isLoading && (
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: 400, gap: 16 }}
          >
            <Text
              preset="paragraphs"
              color="textSecondary"
              style={{ textAlign: "center" }}
            >
              {error}
            </Text>
            <TouchableOpacity
              onPress={weather.refresh}
              style={{
                backgroundColor: theme.colors.cardBackground,
                borderColor: theme.colors.cardBorder,
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 24,
                paddingVertical: 10,
              }}
            >
              <Text preset="paragraphs" weight="semiBold">
                Tentar novamente
              </Text>
            </TouchableOpacity>
          </Box>
        )}

        {current && !isLoading && (
          <>
            <Box alignItems="center" marginBottom="s8">
              <TouchableOpacity
                onPress={() => router.push("/modal")}
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Text preset="paragraphsXL" weight="bold">
                  {customCity
                    ? `${customCity.name}, ${customCity.country}`
                    : `${location.cityName ?? ""}${location.countryCode ? `, ${location.countryCode}` : ""}`}
                </Text>
                <Text preset="paragraphsBig" color="textSecondary">
                  ▾
                </Text>
              </TouchableOpacity>

              {customCity && (
                <TouchableOpacity
                  onPress={() => setCustomCity(null)}
                  style={{ marginTop: 4 }}
                >
                  <Text preset="notes" color="textMuted">
                    📍 Usar minha localização
                  </Text>
                </TouchableOpacity>
              )}

              <Text
                preset="notes"
                color="textSecondary"
                style={{ textTransform: "capitalize", marginTop: 2 }}
              >
                {formatDate(current.current.dt, current.timezone_offset)}
              </Text>
            </Box>

            <Box alignItems="center" paddingVertical="s12">
              <Image
                source={{
                  uri: weatherIconUrl(
                    current.current.weather[0]?.icon ?? "01d",
                  ),
                }}
                style={{ width: 110, height: 110 }}
                contentFit="contain"
              />
              <Text
                weight="regular"
                style={{ fontSize: 80, lineHeight: 88, fontWeight: "200" }}
              >
                {Math.round(current.current.temp)}°C
              </Text>
              <Text
                preset="default"
                color="textSecondary"
                style={{ textTransform: "capitalize", marginTop: 4 }}
              >
                {current.current.weather[0]?.description}
              </Text>
              <Text
                preset="paragraphs"
                color="textMuted"
                style={{ marginTop: 4 }}
              >
                Máx {Math.round(todayDaily?.temp.max ?? 0)}° · Mín{" "}
                {Math.round(todayDaily?.temp.min ?? 0)}°
              </Text>
            </Box>

            <Box flexDirection="row" marginVertical="s16" style={{ gap: 10 }}>
              <StatCard
                icon="💧"
                label="Umidade"
                value={`${current.current.humidity}%`}
              />
              <StatCard
                icon="💨"
                label="Vento"
                value={`${Math.round(current.current.wind_speed * 3.6)} km/h`}
              />
              <StatCard
                icon="🌡️"
                label="Sensação"
                value={`${Math.round(current.current.feels_like)}°`}
              />
            </Box>

            {hourly.length > 0 && (
              <Box marginBottom="s16">
                <Text
                  preset="paragraphsBig"
                  weight="semiBold"
                  marginBottom="s10"
                >
                  Hoje
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginHorizontal: -20 }}
                  contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
                >
                  {hourly.map((item, index) => (
                    <HourlyItem
                      key={item.dt}
                      item={item}
                      isFirst={index === 0}
                    />
                  ))}
                </ScrollView>
              </Box>
            )}

            {aqi && (
              <Box
                backgroundColor="cardBackground"
                borderColor="cardBorder"
                borderWidth={1}
                borderRadius="s16"
                padding="s16"
                marginBottom="s12"
              >
                <Text
                  preset="paragraphsBig"
                  weight="semiBold"
                  marginBottom="s8"
                >
                  Qualidade do ar
                </Text>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  style={{ gap: 10 }}
                >
                  <Box
                    borderRadius="s8"
                    paddingHorizontal="s10"
                    paddingVertical="s4"
                    style={{ backgroundColor: AQI_INFO[aqi.main.aqi]?.color }}
                  >
                    <Text preset="paragraphs" weight="semiBold">
                      {AQI_INFO[aqi.main.aqi]?.label ?? "—"}
                    </Text>
                  </Box>
                  <Text preset="notes" color="textSecondary">
                    PM2.5: {aqi.components.pm2_5.toFixed(1)} · NO₂:{" "}
                    {aqi.components.no2.toFixed(1)}
                  </Text>
                </Box>
              </Box>
            )}

            <Box flexDirection="row" style={{ gap: 10 }}>
              <Box
                flex={1}
                backgroundColor="cardBackground"
                borderColor="cardBorder"
                borderWidth={1}
                borderRadius="s16"
                padding="s14"
                style={{ gap: 4 }}
              >
                <Text preset="notes" color="textSecondary">
                  🌅 Nascer do sol
                </Text>
                <Text preset="titleSmall" weight="semiBold">
                  {new Date(current.current.sunrise * 1000).toLocaleTimeString(
                    "pt-BR",
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </Text>
              </Box>
              <Box
                flex={1}
                backgroundColor="cardBackground"
                borderColor="cardBorder"
                borderWidth={1}
                borderRadius="s16"
                padding="s14"
                style={{ gap: 4 }}
              >
                <Text preset="notes" color="textSecondary">
                  🌇 Pôr do sol
                </Text>
                <Text preset="titleSmall" weight="semiBold">
                  {new Date(current.current.sunset * 1000).toLocaleTimeString(
                    "pt-BR",
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </Text>
              </Box>
            </Box>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
