import { QueryKeys } from "@/src/infra";
import { useQuery } from "@tanstack/react-query";
import { weatherService } from "../weather.service";
import { GetAirQuality } from "../weather.types";

export const useGetAirQuality = (params: GetAirQuality.Params) => {
  return useQuery({
    queryKey: [QueryKeys.GetAirQuality, params.lat, params.lon],
    queryFn: () => weatherService.getAirQuality(params),
    enabled: Boolean(params.lat && params.lon),
  });
};
