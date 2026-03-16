import { theme } from "@/src/theme";

type GradientPair = [string, string];

export function getWeatherGradient(
  weatherId: number,
  isDay: boolean
): GradientPair {
  const c = theme.colors;

  if (weatherId >= 200 && weatherId < 300)
    return [c.gradientThunderstormStart, c.gradientThunderstormEnd];
  if (weatherId >= 300 && weatherId < 400)
    return [c.gradientDrizzleStart, c.gradientDrizzleEnd];
  if (weatherId >= 500 && weatherId < 600)
    return [c.gradientRainStart, c.gradientRainEnd];
  if (weatherId >= 600 && weatherId < 700)
    return [c.gradientSnowStart, c.gradientSnowEnd];
  if (weatherId >= 700 && weatherId < 800)
    return [c.gradientMistStart, c.gradientMistEnd];
  if (weatherId === 800)
    return isDay
      ? [c.gradientClearDayStart, c.gradientClearDayEnd]
      : [c.gradientClearNightStart, c.gradientClearNightEnd];
  if (weatherId > 800)
    return isDay
      ? [c.gradientCloudsStart, c.gradientCloudsEnd]
      : [c.gradientCloudsNightStart, c.gradientCloudsNightEnd];

  return [c.gradientClearDayStart, c.gradientClearDayEnd];
}

export function isDayTime(dt: number, sunrise: number, sunset: number) {
  return dt >= sunrise && dt < sunset;
}

export function weatherIconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
