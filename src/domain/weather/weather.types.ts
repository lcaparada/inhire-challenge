import { AirQuality, CurrentWeather, Forecast, OneCall } from "@/src/types";

export namespace GetCurrentByCoords {
  export type Params = {
    lat: number;
    lon: number;
    exclude?: string;
  };

  export type Result = OneCall;
}

export namespace GetCurrentByCity {
  export type Params = {
    q: string;
  };

  export type Result = CurrentWeather;
}

export namespace GetForecastByCoords {
  export type Params = {
    lat: number;
    lon: number;
    exclude?: string;
  };

  export type Result = OneCall;
}

export namespace GetForecastByCity {
  export type Params = {
    q: string;
  };

  export type Result = Forecast;
}

export namespace GetAirQuality {
  export type Params = {
    lat: number;
    lon: number;
  };

  export type Result = AirQuality;
}
