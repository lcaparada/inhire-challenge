import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/src/infra";
import { weatherService } from "../weather.service";
import { GetForecastByCity } from "../weather.types";

export const useGetForecastByCity = (params: GetForecastByCity.Params) => {
  return useQuery({
    queryKey: [QueryKeys.GetForecastByCity, params.q],
    queryFn: () => weatherService.getForecastByCity(params),
    enabled: Boolean(params.q),
  });
};
