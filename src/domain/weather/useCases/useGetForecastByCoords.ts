import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/src/infra";
import { weatherService } from "../weather.service";
import { GetForecastByCoords } from "../weather.types";

export const useGetForecastByCoords = (params: GetForecastByCoords.Params) => {
  return useQuery({
    queryKey: [QueryKeys.GetForecastByCoords, params.lat, params.lon],
    queryFn: () => weatherService.getForecastByCoords(params),
    enabled: Boolean(params.lat && params.lon),
  });
};
