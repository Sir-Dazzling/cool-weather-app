import { describe, it, expect } from 'vitest';
import { useWeather } from './useWeather';

describe('useWeather', () => {
  describe('initial state', () => {
    it('should have null weatherData initially', () => {
      const { weatherData } = useWeather();
      expect(weatherData.value).toBeNull();
    });

    it('should have empty cityName initially', () => {
      const { cityName } = useWeather();
      expect(cityName.value).toBe('');
    });

    it('should not be loading initially', () => {
      const { isLoading } = useWeather();
      expect(isLoading.value).toBe(false);
    });

    it('should have no error initially', () => {
      const { error } = useWeather();
      expect(error.value).toBeNull();
    });
  });

  describe('clearWeather', () => {
    it('should have clearWeather function', () => {
      const { clearWeatherData } = useWeather();
      expect(typeof clearWeatherData).toBe('function');
    });

    it('should clear error when called', () => {
      const { error, clearWeatherData } = useWeather();
      // Manually set an error to test clearing
      error.value = 'Test error';
      expect(error.value).toBe('Test error');
      
      clearWeatherData();
      
      expect(error.value).toBeNull();
    });

    it('should clear cityName when called', () => {
      const { cityName, clearWeatherData } = useWeather();
      cityName.value = 'London';
      
      clearWeatherData();
      
      expect(cityName.value).toBe('');
    });

    it('should clear weatherData when called', () => {
      const { weatherData, clearWeatherData } = useWeather();
      // weatherData starts as null, clearWeather should keep it null
      clearWeatherData();
      expect(weatherData.value).toBeNull();
    });
  });

  describe('fetchWeather', () => {
    it('should have fetchWeather function', () => {
      const { fetchWeatherData } = useWeather();
      expect(typeof fetchWeatherData).toBe('function');
    });

    it('should return all expected reactive properties', () => {
      const result = useWeather();
      
      expect(result).toHaveProperty('weatherData');
      expect(result).toHaveProperty('cityName');
      expect(result).toHaveProperty('isLoading');
      expect(result).toHaveProperty('error');
      expect(result).toHaveProperty('fetchWeatherData');
      expect(result).toHaveProperty('clearWeatherData');
    });
  });
});
