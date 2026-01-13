import { FORECAST_DAYS, TEMP_MAX_INITIAL, TEMP_MIN_INITIAL } from "../constants";
import type { IDailyForecast, IForecastItem } from "../types/forecast";

/**
 * Aggregates 3-hour forecast chunks into daily summaries
 * @param data - Array of 3-hour forecast items from OpenWeatherMap API
 * @returns Array of daily forecast summaries (max 5 days)
 */
export function aggregateForecastByDay(data: IForecastItem[]): IDailyForecast[]{
    const dailyMap = new Map<string, IForecastItem[]>();

    // I'm grouping items by date
    data.forEach(item => {
        const dateParts = item.dt_txt.split(" ");
        const date = dateParts[0] ?? "";

        if(date && !dailyMap.has(date)){
            dailyMap.set(date, []);
        }

        if(date){
            dailyMap.get(date)?.push(item);
        }
    })

    const dailyForecasts: IDailyForecast[] = [];

    // Calculating the min/max tems and selecting the corresponding weather for each day
    dailyMap.forEach((items) => {
        let min = TEMP_MIN_INITIAL;
        let max = TEMP_MAX_INITIAL;

        items.forEach(i => {
            if(i.main.temp_min < min) min = i.main.temp_min;
            if(i.main.temp_max > max) max = i.main.temp_max;
        })

        // Pick weather icon from middle of the day (around noon) for best representation
        const noonItem = items[Math.floor(items.length / 2)];

        if(noonItem && noonItem.weather && noonItem.weather[0]){
            dailyForecasts.push({
                dt: noonItem.dt,
                temp: {min, max},
                weather: noonItem.weather
            })
        }
    });

    // Finally sorting by date and linit the output to the configured number of days
    return dailyForecasts.sort((a, b) => a.dt - b.dt).slice(0, FORECAST_DAYS);
}