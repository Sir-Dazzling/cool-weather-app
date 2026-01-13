import { BASE_URL } from "../constants";
import type { IForecastApiResponse } from "../types/forecast";
import type { ICurrentWeatherApiResponse } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

export const weatherService = {
    async getCurrentWeather(city: string): Promise<ICurrentWeatherApiResponse>{
        if (!API_KEY) throw new Error('API key is missing');

        const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
        if(!response.ok) {
            if(response.status === 404) throw new Error('City not found');
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    },

    async getForecast(city: string): Promise<IForecastApiResponse>{
        if (!API_KEY) throw new Error('API Key is missing');

        const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
        if (!response.ok) {
            if(response.status === 404) throw new Error('City not found');
            throw new Error('Failed to fetch forecast');
        }
        return await response.json();
    }
}