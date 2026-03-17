import { Image } from "expo-image";

import { Box } from "@/src/components/Box/Box";
import { Text } from "@/src/components/Text/Text";
import { weatherIconUrl } from "@/src/theme/weather-gradients";
import type { OneCallHourly } from "@/src/types/weather";

type Props = {
  item: OneCallHourly;
  isFirst?: boolean;
};

function formatHour(dt: number): string {
  const date = new Date(dt * 1000);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HourlyItem({ item, isFirst }: Props) {
  const icon = item.weather[0]?.icon ?? "01d";

  return (
    <Box
      alignItems="center"
      backgroundColor="cardBackground"
      borderColor="cardBorder"
      borderWidth={1}
      borderRadius="s16"
      paddingVertical="s12"
      paddingHorizontal="s14"
      style={{ gap: 2, minWidth: 64 }}
    >
      <Text preset="notes" color="textSecondary">
        {isFirst ? "Agora" : formatHour(item.dt)}
      </Text>

      <Image
        source={{ uri: weatherIconUrl(icon) }}
        style={{ width: 40, height: 40 }}
        contentFit="contain"
      />

      <Text preset="paragraphs" weight="semiBold">
        {Math.round(item.temp)}°
      </Text>

      {item.pop > 0.05 && (
        <Text preset="notesSmall" color="textMuted">
          {Math.round(item.pop * 100)}%
        </Text>
      )}
    </Box>
  );
}
