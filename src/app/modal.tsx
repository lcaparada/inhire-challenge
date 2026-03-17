import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box, Button, Text } from "@/src/components";
import { useCustomCity } from "@/src/context/location.context";
import { weatherService } from "@/src/domain/weather/weather.service";
import { theme } from "@/src/theme";


export default function SearchCityScreen() {
  const insets = useSafeAreaInsets();
  const { setCustomCity, weatherGradient } = useCustomCity();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getCurrentByCity({ q: trimmed });
      setCustomCity({
        name: data.name,
        country: data.sys.country,
        coords: { latitude: data.coord.lat, longitude: data.coord.lon },
      });
      router.back();
    } catch {
      setError("Cidade não encontrada. Tente outro nome.");
      setLoading(false);
    }
  }

  function handleGPS() {
    setCustomCity(null);
    router.back();
  }

  return (
    <LinearGradient
      colors={weatherGradient}
      style={{ flex: 1 }}
    >
    <Box
      flex={1}
      padding="s24"
      gap={"s16"}
      paddingTop={"s32"}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text preset="paragraphsBig" weight="semiBold">
          Buscar cidade
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text color="textSecondary">✕</Text>
        </TouchableOpacity>
      </Box>

      <Box
        flexDirection="row"
        alignItems="center"
        backgroundColor="cardBackground"
        borderColor="cardBorder"
        borderWidth={1}
        borderRadius="s12"
        paddingHorizontal="s14"
        style={{ gap: 8 }}
      >
        <Text preset="paragraphs" color="textMuted">
          🔍
        </Text>
        <TextInput
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setError(null);
          }}
          placeholder="Ex: São Paulo, London, Tokyo..."
          placeholderTextColor={theme.colors.textMuted}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          autoFocus
          style={{
            flex: 1,
            paddingVertical: 12,
            color: theme.colors.textPrimary,
            fontSize: 15,
          }}
        />
      </Box>
      {error && (
        <Text preset="notes" color="aqiPoor">
          {error}
        </Text>
      )}
      <Button
        title="Buscar"
        onPress={handleSearch}
        loading={loading}
        disabled={!query.trim()}
      />

      <Button
        title="📍 Usar minha localização"
        variant="ghost"
        onPress={handleGPS}
      />
    </Box>
    </LinearGradient>
  );
}
