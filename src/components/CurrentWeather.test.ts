import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CurrentWeather from './CurrentWeather.vue';

const mockWeatherData = {
  temp: 18,
  feels_like: 16,
  humidity: 65,
  weather: [
    { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
  ],
  description: 'clear sky',
  wind: { speed: 5.5, deg: 180, gust: 8 }
};

describe('CurrentWeather', () => {
  describe('rendering', () => {
    it('should render city name', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'London'
        }
      });

      expect(wrapper.text()).toContain('London');
    });

    it('should render temperature', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'Paris'
        }
      });

      expect(wrapper.text()).toContain('18');
    });

    it('should render feels like temperature', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'Tokyo'
        }
      });

      expect(wrapper.text()).toContain('16');
    });

    it('should render humidity', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'Berlin'
        }
      });

      expect(wrapper.text()).toContain('65');
    });

    it('should render wind speed', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'Madrid'
        }
      });

      // Wind speed rounded: 5.5 → should show as 5 or 6
      expect(wrapper.text()).toMatch(/5|6/);
    });

    it('should render weather description', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'Rome'
        }
      });

      expect(wrapper.text().toLowerCase()).toContain('clear sky');
    });

    it('should render weather icon', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'Amsterdam'
        }
      });

      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toContain('01d');
    });
  });

  describe('date display', () => {
    it('should show current date', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'Vienna'
        }
      });

      // Should contain month name and year
      expect(wrapper.text()).toMatch(/January|February|March|April|May|June|July|August|September|October|November|December/);
      expect(wrapper.text()).toMatch(/\d{4}/); // Year
    });
  });

  describe('accessibility', () => {
    it('should have alt text for weather icon', () => {
      const wrapper = mount(CurrentWeather, {
        props: {
          currentWeather: mockWeatherData,
          cityName: 'Prague'
        }
      });

      const img = wrapper.find('img');
      expect(img.attributes('alt')).toBe('clear sky');
    });
  });
});
