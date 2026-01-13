import type { IClouds, ICoordinates, IWind, WeatherCondition } from "./weather";

export interface IMainForecastData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface IForecastSys {
    pod: string;
}

export interface IForecastItem {
    dt: number;
    main: IMainForecastData;
    weather: WeatherCondition[];
    clouds: IClouds;
    wind: IWind;
    visibility: number;
    pop: number;
    sys: IForecastSys;
    dt_txt: string;
}

export interface IForecastedCity {
    id: number;
    name: string;
    coord: ICoordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface IForecastApiResponse {
    cod: string;
    message: number;
    cnt: number;
    list: IForecastItem[];
    city: IForecastedCity;
}

// Application Internal Types (Normalized for View props)

export interface ITemperature {
    max: number;
    min: number;
}

export interface DailyForecast {
    dt: number;
    weather: WeatherCondition[];
    temp: ITemperature;
}