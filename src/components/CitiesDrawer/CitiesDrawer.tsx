import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box } from "@/src/components/Box/Box";
import { Text } from "@/src/components/Text/Text";
import {
  useCustomCity,
  type CityLocation,
} from "@/src/context/location.context";

const DRAWER_WIDTH = Dimensions.get("window").width * 0.78;

type Props = {
  visible: boolean;
  onClose: () => void;
  gpsCityName: string | null;
  gpsCountryCode: string | null;
};

export function CitiesDrawer({
  visible,
  onClose,
  gpsCityName,
  gpsCountryCode,
}: Props) {
  const insets = useSafeAreaInsets();
  const { savedCities, activeCity, selectCity, removeCity, weatherGradient } =
    useCustomCity();

  const translateX = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: visible ? 0 : DRAWER_WIDTH,
        useNativeDriver: true,
        bounciness: 4,
        speed: 18,
      }),
      Animated.timing(backdropOpacity, {
        toValue: visible ? 1 : 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdropOpacity, translateX, visible]);

  function handleSelect(city: CityLocation | null) {
    selectCity(city);
    onClose();
  }

  function handleAddCity() {
    onClose();
    setTimeout(() => router.push("/modal"), 250);
  }

  const gpsLabel = gpsCityName
    ? `${gpsCityName}${gpsCountryCode ? `, ${gpsCountryCode}` : ""}`
    : "Minha localização";

  const isGpsActive = activeCity === null;

  return (
    <>
      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 10,
          opacity: backdropOpacity,
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: DRAWER_WIDTH,
          transform: [{ translateX }],
          zIndex: 20,
        }}
      >
        <LinearGradient colors={weatherGradient} style={{ flex: 1 }}>
          <Box
            flex={1}
            paddingHorizontal="s20"
            style={{
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 24,
            }}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginBottom="s24"
            >
              <Text preset="paragraphsBig" weight="bold">
                Cidades
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text preset="paragraphsBig" color="textSecondary">
                  ✕
                </Text>
              </TouchableOpacity>
            </Box>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            >
              <TouchableOpacity onPress={() => handleSelect(null)}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  backgroundColor={
                    isGpsActive ? "cardBackgroundStrong" : "cardBackground"
                  }
                  borderColor={isGpsActive ? "cardBorderStrong" : "cardBorder"}
                  borderWidth={1}
                  borderRadius="s16"
                  padding="s14"
                  marginBottom="s8"
                >
                  <Box style={{ gap: 2, flex: 1 }}>
                    <Text preset="notes" color="textMuted">
                      📍 Localização atual
                    </Text>
                    <Text preset="paragraphs" weight="semiBold">
                      {gpsLabel}
                    </Text>
                  </Box>
                  {isGpsActive && (
                    <Text preset="paragraphsBig" color="primary">
                      ✓
                    </Text>
                  )}
                </Box>
              </TouchableOpacity>

              {savedCities.map((city, index) => {
                const isActive =
                  activeCity?.name === city.name &&
                  activeCity?.country === city.country;

                return (
                  <TouchableOpacity
                    key={`${city.name}-${city.country}`}
                    onPress={() => handleSelect(city)}
                  >
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      backgroundColor={
                        isActive ? "cardBackgroundStrong" : "cardBackground"
                      }
                      borderColor={isActive ? "cardBorderStrong" : "cardBorder"}
                      borderWidth={1}
                      borderRadius="s16"
                      padding="s14"
                      marginBottom="s8"
                    >
                      <Box style={{ gap: 2, flex: 1 }}>
                        <Text preset="notes" color="textMuted">
                          🌍 {city.country}
                        </Text>
                        <Text preset="paragraphs" weight="semiBold">
                          {city.name}
                        </Text>
                      </Box>
                      <Box
                        flexDirection="row"
                        alignItems="center"
                        style={{ gap: 12 }}
                      >
                        {isActive && (
                          <Text preset="paragraphsBig" color="primary">
                            ✓
                          </Text>
                        )}
                        <TouchableOpacity onPress={() => removeCity(index)}>
                          <Text preset="paragraphs" color="textMuted">
                            🗑
                          </Text>
                        </TouchableOpacity>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity onPress={handleAddCity}>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                backgroundColor="cardBackground"
                borderColor="cardBorder"
                borderWidth={1}
                borderRadius="s16"
                padding="s14"
                marginTop="s12"
                style={{ gap: 8 }}
              >
                <Text preset="paragraphsBig" color="primary">
                  ＋
                </Text>
                <Text preset="paragraphs" weight="semiBold" color="primary">
                  Adicionar cidade
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </LinearGradient>
      </Animated.View>
    </>
  );
}
