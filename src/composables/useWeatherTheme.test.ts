import { describe, it, expect } from 'vitest';
import { useWeatherTheme } from './useWeatherTheme';
import type { IWeatherCondition } from '../types/weather';

describe('useWeatherTheme', () => {
  describe('default theme', () => {
    it('should return default theme when no condition is provided', () => {
      const { theme } = useWeatherTheme(undefined);
      
      expect(theme.value.name).toBe('default');
      expect(theme.value.severity).toBe('normal');
    });
  });

  describe('sunny theme', () => {
    it('should return sunny theme for clear day conditions', () => {
      const condition: IWeatherCondition = {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d', // day icon
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('sunny');
      expect(theme.value.severity).toBe('normal');
    });
  });

  describe('night themes', () => {
    it('should return clear night theme for clear night conditions', () => {
      const condition: IWeatherCondition = {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01n', // night icon
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('clear-night');
    });

    it('should return cloudy night theme for cloudy night conditions', () => {
      const condition: IWeatherCondition = {
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03n', // night icon
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('cloudy-night');
    });
  });

  describe('weather conditions', () => {
    it('should return cloudy theme for clouds', () => {
      const condition: IWeatherCondition = {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d',
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('cloudy');
    });

    it('should return rainy theme for rain', () => {
      const condition: IWeatherCondition = {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10d',
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('rainy');
      expect(theme.value.severity).toBe('warning');
    });

    it('should return rainy theme for drizzle', () => {
      const condition: IWeatherCondition = {
        id: 300,
        main: 'Drizzle',
        description: 'light drizzle',
        icon: '09d',
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('rainy');
    });

    it('should return snowy theme for snow', () => {
      const condition: IWeatherCondition = {
        id: 601,
        main: 'Snow',
        description: 'snow',
        icon: '13d',
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('snowy');
      expect(theme.value.severity).toBe('warning');
    });

    it('should return misty theme for fog/mist', () => {
      const condition: IWeatherCondition = {
        id: 701,
        main: 'Mist',
        description: 'mist',
        icon: '50d',
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('misty');
    });
  });

  describe('severe weather', () => {
    it('should return stormy theme for thunderstorm', () => {
      const condition: IWeatherCondition = {
        id: 200,
        main: 'Thunderstorm',
        description: 'thunderstorm',
        icon: '11d',
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('stormy');
      expect(theme.value.severity).toBe('severe');
    });

    it('should return stormy theme for tornado', () => {
      const condition: IWeatherCondition = {
        id: 781,
        main: 'Tornado',
        description: 'tornado',
        icon: '50d',
      };
      
      const { theme } = useWeatherTheme(condition);
      
      expect(theme.value.name).toBe('stormy');
      expect(theme.value.severity).toBe('severe');
    });
  });

  describe('theme properties', () => {
    it('should include all required theme properties', () => {
      const { theme } = useWeatherTheme(undefined);
      
      expect(theme.value).toHaveProperty('name');
      expect(theme.value).toHaveProperty('bgGradient');
      expect(theme.value).toHaveProperty('cardBg');
      expect(theme.value).toHaveProperty('primaryColor');
      expect(theme.value).toHaveProperty('secondaryColor');
      expect(theme.value).toHaveProperty('accentColor');
      expect(theme.value).toHaveProperty('textPrimary');
      expect(theme.value).toHaveProperty('textSecondary');
      expect(theme.value).toHaveProperty('borderColor');
      expect(theme.value).toHaveProperty('iconColor');
      expect(theme.value).toHaveProperty('severity');
    });
  });
});
