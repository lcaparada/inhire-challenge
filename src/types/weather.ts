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
