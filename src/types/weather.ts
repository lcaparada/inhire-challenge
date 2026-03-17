export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type CurrentWeather = {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  dt: number;
  timezone: number;
};

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
  pop: number;
  dt_txt: string;
};

export type Forecast = {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type AirQuality = {
  list: {
    main: { aqi: number };
    components: {
      co: number;
      no2: number;
      pm2_5: number;
      pm10: number;
      o3: number;
    };
  }[];
};

export type Coords = {
  latitude: number;
  longitude: number;
};

export type OneCallCurrent = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
};

export type OneCallHourly = {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
  pop: number;
};

export type OneCallDaily = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  uvi: number;
};

export type OneCall = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: OneCallCurrent;
  hourly: OneCallHourly[];
  daily: OneCallDaily[];
};
