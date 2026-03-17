import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/src/infra";
import { weatherService } from "../weather.service";
import { GetCurrentByCity } from "../weather.types";

export const useGetCurrentByCity = (params: GetCurrentByCity.Params) => {
  return useQuery({
    queryKey: [QueryKeys.GetCurrentByCity, params.q],
    queryFn: () => weatherService.getCurrentByCity(params),
    enabled: Boolean(params.q),
  });
};
