import { Image } from "expo-image";
import { Box } from "@/src/components/Box/Box";
import { Text } from "@/src/components/Text/Text";
import { weatherIconUrl } from "@/src/theme/weather-gradients";
import type { ForecastItem } from "@/src/types/weather";

type Props = {
  item: ForecastItem;
  isFirst?: boolean;
};

function formatHour(dtTxt: string): string {
  const time = dtTxt.split(" ")[1] ?? "";
  return time.slice(0, 5);
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
        {isFirst ? "Agora" : formatHour(item.dt_txt)}
      </Text>

      <Image
        source={{ uri: weatherIconUrl(icon) }}
        style={{ width: 40, height: 40 }}
        contentFit="contain"
      />

      <Text preset="paragraphs" weight="semiBold">
        {Math.round(item.main.temp)}°
      </Text>

      {item.pop > 0.05 && (
        <Text preset="notesSmall" color="textMuted">
          {Math.round(item.pop * 100)}%
        </Text>
      )}
    </Box>
  );
}
