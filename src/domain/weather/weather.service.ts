import { api } from "@/src/api/api";

import {
  GetAirQuality,
  GetCurrentByCity,
  GetCurrentByCoords,
  GetForecastByCity,
  GetForecastByCoords,
} from "./weather.types";

const getCurrentByCoords = async (
  params: GetCurrentByCoords.Params,
): Promise<GetCurrentByCoords.Result> => {
  try {
    const { data } = await api.get<GetCurrentByCoords.Result>(
      "/data/3.0/onecall",
      { params: { ...params, exclude: "minutely,daily,alerts" } },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getCurrentByCity = async (
  params: GetCurrentByCity.Params,
): Promise<GetCurrentByCity.Result> => {
  try {
    const { data } = await api.get<GetCurrentByCity.Result>(
      "/data/2.5/weather",
      { params },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getForecastByCoords = async (
  params: GetForecastByCoords.Params,
): Promise<GetForecastByCoords.Result> => {
  try {
    const { data } = await api.get<GetForecastByCoords.Result>(
      "/data/3.0/onecall",
      { params: { ...params, exclude: "minutely,alerts" } },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getForecastByCity = async (
  params: GetForecastByCity.Params,
): Promise<GetForecastByCity.Result> => {
  try {
    const { data } = await api.get<GetForecastByCity.Result>(
      "/data/2.5/forecast",
      { params },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getAirQuality = async (
  params: GetAirQuality.Params,
): Promise<GetAirQuality.Result> => {
  try {
    const { data } = await api.get<GetAirQuality.Result>(
      "/data/2.5/air_pollution",
      { params },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const weatherService = {
  getCurrentByCoords,
  getCurrentByCity,
  getForecastByCoords,
  getForecastByCity,
  getAirQuality,
};
