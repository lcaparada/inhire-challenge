import { Image } from "expo-image";

import { Box } from "@/src/components/Box/Box";
import { Text } from "@/src/components/Text/Text";
import { weatherIconUrl } from "@/src/theme/weather-gradients";
import type { OneCallDaily } from "@/src/types/weather";

type Props = {
  item: OneCallDaily;
  timezoneOffset: number;
  isToday?: boolean;
};

function formatDayName(
  dt: number,
  timezoneOffset: number,
  isToday: boolean,
): string {
  if (isToday) return "Hoje";
  const date = new Date((dt + timezoneOffset) * 1000);
  const name = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    timeZone: "UTC",
  });
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function DailyItem({ item, timezoneOffset, isToday }: Props) {
  const icon = item.weather[0]?.icon ?? "01d";

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingVertical="s10"
      style={{ gap: 10 }}
    >
      <Text
        preset="paragraphs"
        weight={isToday ? "semiBold" : "regular"}
        style={{ flex: 1 }}
      >
        {formatDayName(item.dt, timezoneOffset, isToday ?? false)}
      </Text>

      {item.pop > 0.05 ? (
        <Text
          preset="notes"
          color="primary"
          style={{ minWidth: 36, textAlign: "right" }}
        >
          {Math.round(item.pop * 100)}%
        </Text>
      ) : (
        <Box style={{ minWidth: 36 }} />
      )}

      <Image
        source={{ uri: weatherIconUrl(icon) }}
        style={{ width: 36, height: 36 }}
        contentFit="contain"
      />

      <Box
        flexDirection="row"
        style={{ gap: 8, minWidth: 72, justifyContent: "flex-end" }}
      >
        <Text preset="paragraphs" weight="semiBold">
          {Math.round(item.temp.max)}°
        </Text>
        <Text preset="paragraphs" color="textMuted">
          {Math.round(item.temp.min)}°
        </Text>
      </Box>
    </Box>
  );
}
