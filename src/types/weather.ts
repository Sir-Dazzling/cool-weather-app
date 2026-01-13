import type { DailyForecast } from "./forecast";

export interface ICoordinates {
 lon: number;
 lat: number;   
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
}

export interface IWind {
    speed: number;
    deg: number;
    gust?: number;
}

export interface IClouds {
    all: number;
}

export interface ISys {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface ICurrentWeatherApiResponse {
    coord: ICoordinates;
    weather: WeatherCondition[];
    base: string;
    main: IMainWeatherData;
    visibility: number;
    wind: IWind;
    clouds: IClouds;
    dt: number;
    sys: ISys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

// Application Internal Types (Normalized for View props)

export interface ICurrentWeatherData {
    temp: number;
    feels_like: number;
    humidity: number;
    wind: IWind;
    weather: WeatherCondition[];
    description: string;
}

export interface AppWeatherData {
  current: ICurrentWeatherData;
  daily: DailyForecast[];
  cityName: string;
}