import { ref } from "vue";
import type { IAppWeatherData } from "../types/weather";
import { weatherService } from "../services/weatherService";

export function useWeather() {
    const weatherData = ref<IAppWeatherData | null>(null);
    const cityName = ref<string>("");
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchWeatherData = async (city: string) => {
        isLoading.value = true;
        error.value = null;

        try {
            const [currentWeather, forecast] = await Promise.all([
                weatherService.getCurrentWeather(city),
                weatherService.getForecast(city)
            ]);

            cityName.value = currentWeather.name;
            weatherData.value = {
                cityName: currentWeather.name,
                current: {
                    temp: currentWeather.main.temp,
                    feels_like: currentWeather.main.feels_like,
                    humidity: currentWeather.main.humidity,
                    wind: {
                        speed: currentWeather.wind.speed,
                        deg: currentWeather.wind.deg,
                        gust: currentWeather.wind.gust
                    },
                    weather: currentWeather.weather,
                    description: currentWeather.weather[0]?.description ?? "N/A",
                },
                daily: forecast.list as any,
            }
            
        } catch (err: any) {
            if (err.message === 'City not found') {
                error.value = `City "${city}" not found. Please try again.`;
            } else {
                error.value = 'Failed to fetch weather data. Please check your connection or try again later.';
            }
            weatherData.value = null;
        } finally {
            isLoading.value = false;
        }
    }

    const clearWeatherData = () => {
        weatherData.value = null;
        cityName.value = "";
        error.value = null;
        isLoading.value = false;
    }

    return {
        weatherData,
        cityName,
        isLoading,
        error,
        fetchWeatherData,
        clearWeatherData
    }
}