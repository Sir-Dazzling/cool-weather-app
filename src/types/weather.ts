import type { IDailyForecast } from "./forecast";

export interface ICoordinates {
 lon: number;
 lat: number;   
}

export interface IWeatherCondition {
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
    weather: IWeatherCondition[];
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
    weather: IWeatherCondition[];
    description: string;
}

export interface IAppWeatherData {
    current: ICurrentWeatherData;
    daily: IDailyForecast[];
    cityName: string;
}

export interface IWeatherTheme {
    name: string;
    bgGradient: string;
    cardBg: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textPrimary: string;
    textSecondary: string;
    borderColor: string;
    iconColor: string;
    severity: 'normal' | 'warning' | 'severe';
}