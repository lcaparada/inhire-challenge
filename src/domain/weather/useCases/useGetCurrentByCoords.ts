import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/src/infra";
import { weatherService } from "../weather.service";
import { GetCurrentByCoords } from "../weather.types";

export const useGetCurrentByCoords = (params: GetCurrentByCoords.Params) => {
  return useQuery({
    queryKey: [QueryKeys.GetCurrentByCoords, params.lat, params.lon],
    queryFn: () => weatherService.getCurrentByCoords(params),
    enabled: Boolean(params.lat && params.lon),
  });
};
