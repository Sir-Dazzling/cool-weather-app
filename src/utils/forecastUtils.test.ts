import { describe, expect, it } from 'vitest';
import type { IForecastItem } from '../types/forecast';
import { aggregateForecastByDay } from './forecastUtils';

// Mock forecast data simulating API response
const createMockForecastItem = (
  date: string, 
  tempMin: number, 
  tempMax: number,
  icon: string = '01d'
): IForecastItem => ({
  dt: Math.floor(new Date(date).getTime() / 1000),
  main: {
    temp: (tempMin + tempMax) / 2,
    feels_like: (tempMin + tempMax) / 2,
    temp_min: tempMin,
    temp_max: tempMax,
    pressure: 1013,
    sea_level: 1013,
    grnd_level: 1013,
    humidity: 50,
    temp_kf: 0,
  },
  weather: [{
    id: 800,
    main: 'Clear',
    description: 'clear sky',
    icon,
  }],
  clouds: { all: 0 },
  wind: { speed: 5, deg: 180, gust: 7 },
  visibility: 10000,
  pop: 0,
  sys: { pod: 'd' },
  dt_txt: date,
});

describe('aggregateForecastByDay', () => {
  it('should group forecast items by date', () => {
    const mockData: IForecastItem[] = [
      createMockForecastItem('2026-01-13 09:00:00', 10, 15),
      createMockForecastItem('2026-01-13 12:00:00', 12, 18),
      createMockForecastItem('2026-01-13 15:00:00', 14, 20),
      createMockForecastItem('2026-01-14 09:00:00', 8, 12),
      createMockForecastItem('2026-01-14 12:00:00', 10, 14),
    ];

    const result = aggregateForecastByDay(mockData);

    expect(result).toHaveLength(2);
    expect(result[0]!.temp.min).toBe(10);
    expect(result[0]!.temp.max).toBe(20);
  });

  it('should return maximum 5 days of forecast', () => {
    const mockData: IForecastItem[] = [];
    
    // Add 7 days of data
    for (let day = 13; day <= 19; day++) {
      mockData.push(createMockForecastItem(`2026-01-${day} 12:00:00`, 10, 20));
    }

    const result = aggregateForecastByDay(mockData);

    expect(result).toHaveLength(5);
  });

  it('should sort results by date', () => {
    const mockData: IForecastItem[] = [
      createMockForecastItem('2026-01-15 12:00:00', 10, 20),
      createMockForecastItem('2026-01-13 12:00:00', 10, 20),
      createMockForecastItem('2026-01-14 12:00:00', 10, 20),
    ];

    const result = aggregateForecastByDay(mockData);

    expect(result[0]!.dt).toBeLessThan(result[1]!.dt);
    expect(result[1]!.dt).toBeLessThan(result[2]!.dt);
  });

  it('should calculate correct min/max temperatures from multiple readings', () => {
    const mockData: IForecastItem[] = [
      createMockForecastItem('2026-01-13 06:00:00', 5, 10),   // Morning: cold
      createMockForecastItem('2026-01-13 12:00:00', 15, 22),  // Noon: warm
      createMockForecastItem('2026-01-13 18:00:00', 12, 18),  // Evening: mild
      createMockForecastItem('2026-01-13 21:00:00', 8, 12),   // Night: cooling
    ];

    const result = aggregateForecastByDay(mockData);

    expect(result).toHaveLength(1);
    expect(result[0]!.temp.min).toBe(5);   // Lowest temp_min
    expect(result[0]!.temp.max).toBe(22);  // Highest temp_max
  });

  it('should handle empty input', () => {
    const result = aggregateForecastByDay([]);
    expect(result).toHaveLength(0);
  });

  it('should include weather data from middle of day', () => {
    const mockData: IForecastItem[] = [
      createMockForecastItem('2026-01-13 06:00:00', 5, 10),
      createMockForecastItem('2026-01-13 12:00:00', 15, 22),
      createMockForecastItem('2026-01-13 18:00:00', 12, 18),
    ];

    const result = aggregateForecastByDay(mockData);

    // Should pick the middle item (12:00)
    expect(result[0]!.weather[0]!.description).toBe('clear sky');
  });
});
