import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ForecastList from './ForecastList.vue';

describe('ForecastList', () => {
  const mockForecast = [
    {
      dt: Math.floor(Date.now() / 1000),
      temp: { min: 10, max: 18 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
    },
    {
      dt: Math.floor(Date.now() / 1000) + 86400,
      temp: { min: 12, max: 20 },
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }]
    },
    {
      dt: Math.floor(Date.now() / 1000) + 86400 * 2,
      temp: { min: 8, max: 15 },
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }]
    },
    {
      dt: Math.floor(Date.now() / 1000) + 86400 * 3,
      temp: { min: 11, max: 19 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
    },
    {
      dt: Math.floor(Date.now() / 1000) + 86400 * 4,
      temp: { min: 14, max: 23 },
      weather: [{ id: 800, main: 'Clear', description: 'sunny', icon: '01d' }]
    },
  ];

  describe('rendering', () => {
    it('should render section title', () => {
      const wrapper = mount(ForecastList, {
        props: { forecast: mockForecast }
      });

      expect(wrapper.text()).toContain('5-Day Forecast');
    });

    it('should render correct number of forecast days', () => {
      const wrapper = mount(ForecastList, {
        props: { forecast: mockForecast }
      });

      // Should find 5 ForecastDay components (via their containers)
      const forecastCards = wrapper.findAll('.forecast-card');
      expect(forecastCards.length).toBe(5);
    });

    it('should render all forecast temperatures', () => {
      const wrapper = mount(ForecastList, {
        props: { forecast: mockForecast }
      });

      // Check that each day's max temp is rendered
      expect(wrapper.text()).toContain('18');
      expect(wrapper.text()).toContain('20');
      expect(wrapper.text()).toContain('15');
      expect(wrapper.text()).toContain('19');
      expect(wrapper.text()).toContain('23');
    });
  });

  describe('empty state', () => {
    it('should handle empty forecast array', () => {
      const wrapper = mount(ForecastList, {
        props: { forecast: [] }
      });

      // Should still render the section but with no cards
      expect(wrapper.text()).toContain('5-Day Forecast');
      const forecastCards = wrapper.findAll('.forecast-card');
      expect(forecastCards.length).toBe(0);
    });
  });

  describe('partial data', () => {
    it('should render fewer cards if less than 5 days provided', () => {
      const partialForecast = mockForecast.slice(0, 3);
      
      const wrapper = mount(ForecastList, {
        props: { forecast: partialForecast }
      });

      const forecastCards = wrapper.findAll('.forecast-card');
      expect(forecastCards.length).toBe(3);
    });
  });

  describe('layout', () => {
    it('should use grid layout for forecast cards', () => {
      const wrapper = mount(ForecastList, {
        props: { forecast: mockForecast }
      });

      const gridContainer = wrapper.find('.grid');
      expect(gridContainer.exists()).toBe(true);
    });
  });
});
