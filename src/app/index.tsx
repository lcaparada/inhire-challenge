import {
  getWeatherGradient,
  isDayTime,
  theme,
  weatherIconUrl,
} from "@/src/theme";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Box,
  CitiesDrawer,
  DailyItem,
  HourlyItem,
  StatCard,
  Text,
} from "../components";
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

function getUviLabel(uvi: number): string {
  if (uvi <= 2) return "Baixo";
  if (uvi <= 5) return "Moderado";
  if (uvi <= 7) return "Alto";
  if (uvi <= 10) return "Muito alto";
  return "Extremo";
}

function formatVisibility(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(0)} km`;
  return `${meters} m`;
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const location = useLocation();
  const { activeCity, setWeatherGradient } = useCustomCity();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeLat =
    activeCity?.coords.latitude ?? location.coords?.latitude ?? 0;
  const activeLon =
    activeCity?.coords.longitude ?? location.coords?.longitude ?? 0;
  const weather = useWeatherByCoords(activeLat, activeLon);

  const oneCall = weather.data;
  const cw = oneCall?.current;
  const isLoading = (activeCity ? false : location.loading) || weather.loading;
  const error = (activeCity ? null : location.error) ?? weather.error;

  const weatherId = cw?.weather[0]?.id ?? 800;
  const day = cw ? isDayTime(cw.dt, cw.sunrise, cw.sunset) : true;
  const gradient = getWeatherGradient(weatherId, day);
  const [gradientStart, gradientEnd] = gradient;

  useEffect(() => {
    setWeatherGradient([gradientStart, gradientEnd]);
  }, [gradientStart, gradientEnd, setWeatherGradient]);

  const hourly = oneCall?.hourly.slice(0, 8) ?? [];
  const daily = oneCall?.daily ?? [];
  const todayDaily = daily[0];
  const forecastDays = daily.slice(0, 7);
  const aqi = weather.airQuality?.list[0];

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

        {cw && oneCall && !isLoading && (
          <>
            {/* Header */}
            <Box alignItems="center" marginBottom="s8">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                style={{ width: "100%", marginBottom: 4 }}
              >
                <Box style={{ width: 32 }} />
                <Text preset="paragraphsXL" weight="bold">
                  {activeCity
                    ? `${activeCity.name}, ${activeCity.country}`
                    : `${location.cityName ?? ""}${location.countryCode ? `, ${location.countryCode}` : ""}`}
                </Text>
                <TouchableOpacity onPress={() => setDrawerOpen(true)}>
                  <Text preset="paragraphsBig" color="textSecondary">
                    ☰
                  </Text>
                </TouchableOpacity>
              </Box>
              <Text
                preset="notes"
                color="textSecondary"
                style={{ textTransform: "capitalize", marginTop: 2 }}
              >
                {formatDate(cw.dt, oneCall.timezone_offset)}
              </Text>
            </Box>

            {/* Main weather */}
            <Box alignItems="center" paddingVertical="s12">
              <Image
                source={{ uri: weatherIconUrl(cw.weather[0]?.icon ?? "01d") }}
                style={{ width: 110, height: 110 }}
                contentFit="contain"
              />
              <Text
                weight="regular"
                style={{ fontSize: 80, lineHeight: 88, fontWeight: "200" }}
              >
                {Math.round(cw.temp)}°C
              </Text>
              <Text
                preset="default"
                color="textSecondary"
                style={{ textTransform: "capitalize", marginTop: 4 }}
              >
                {cw.weather[0]?.description}
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

            {/* Stats row 1 */}
            <Box flexDirection="row" marginBottom="s10" style={{ gap: 10 }}>
              <StatCard
                icon="💧"
                label="Umidade"
                value={`${cw.humidity}%`}
              />
              <StatCard
                icon="💨"
                label="Vento"
                value={`${Math.round(cw.wind_speed * 3.6)} km/h`}
              />
              <StatCard
                icon="🌡️"
                label="Sensação"
                value={`${Math.round(cw.feels_like)}°`}
              />
            </Box>

            {/* Stats row 2 */}
            <Box flexDirection="row" marginBottom="s16" style={{ gap: 10 }}>
              <StatCard
                icon="☀️"
                label="UV"
                value={`${Math.round(cw.uvi)} · ${getUviLabel(cw.uvi)}`}
              />
              <StatCard
                icon="👁️"
                label="Visibilidade"
                value={formatVisibility(cw.visibility)}
              />
              <StatCard
                icon="🔵"
                label="Pressão"
                value={`${cw.pressure} hPa`}
              />
            </Box>

            {/* Hourly forecast */}
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

            {/* 7-day forecast */}
            {forecastDays.length > 0 && (
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
                  marginBottom="s4"
                >
                  Próximos dias
                </Text>
                {forecastDays.map((item, index) => (
                  <Box key={item.dt}>
                    {index > 0 && (
                      <Box
                        style={{
                          height: 1,
                          backgroundColor: theme.colors.cardBorder,
                        }}
                      />
                    )}
                    <DailyItem
                      item={item}
                      timezoneOffset={oneCall.timezone_offset}
                      isToday={index === 0}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* Air quality */}
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

            {/* Sunrise / Sunset */}
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
                  {new Date(cw.sunrise * 1000).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
                  {new Date(cw.sunset * 1000).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Box>
            </Box>
          </>
        )}
      </ScrollView>

      <CitiesDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        gpsCityName={location.cityName}
        gpsCountryCode={location.countryCode}
      />
    </LinearGradient>
  );
}
