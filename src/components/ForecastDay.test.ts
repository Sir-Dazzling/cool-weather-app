import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ForecastDay from './ForecastDay.vue';

describe('ForecastDay', () => {
  const mockForecastDay = {
    dt: Math.floor(Date.now() / 1000) + 86400, // Tomorrow
    temp: { min: 12, max: 22 },
    weather: [
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }
    ]
  };

  describe('rendering', () => {
    it('should render max temperature', () => {
      const wrapper = mount(ForecastDay, {
        props: { day: mockForecastDay }
      });

      expect(wrapper.text()).toContain('22');
    });

    it('should render min temperature', () => {
      const wrapper = mount(ForecastDay, {
        props: { day: mockForecastDay }
      });

      expect(wrapper.text()).toContain('12');
    });

    it('should render weather icon', () => {
      const wrapper = mount(ForecastDay, {
        props: { day: mockForecastDay }
      });

      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toContain('02d');
    });

    it('should render weather condition', () => {
      const wrapper = mount(ForecastDay, {
        props: { day: mockForecastDay }
      });

      expect(wrapper.text()).toContain('Clouds');
    });

    it('should have alt text for weather icon', () => {
      const wrapper = mount(ForecastDay, {
        props: { day: mockForecastDay }
      });

      const img = wrapper.find('img');
      expect(img.attributes('alt')).toBe('few clouds');
    });
  });

  describe('day labels', () => {
    it('should show "Today" for today\'s date', () => {
      const todayForecast = {
        ...mockForecastDay,
        dt: Math.floor(Date.now() / 1000), // Now
      };

      const wrapper = mount(ForecastDay, {
        props: { day: todayForecast }
      });

      expect(wrapper.text()).toContain('Today');
    });

    it('should show "Tomorrow" for tomorrow\'s date', () => {
      const tomorrowForecast = {
        ...mockForecastDay,
        dt: Math.floor(Date.now() / 1000) + 86400, // +1 day
      };

      const wrapper = mount(ForecastDay, {
        props: { day: tomorrowForecast }
      });

      expect(wrapper.text()).toContain('Tomorrow');
    });

    it('should show weekday for future dates', () => {
      const futureForecast = {
        ...mockForecastDay,
        dt: Math.floor(Date.now() / 1000) + (86400 * 5), // +5 days
      };

      const wrapper = mount(ForecastDay, {
        props: { day: futureForecast }
      });

      // Should contain a weekday abbreviation
      expect(wrapper.text()).toMatch(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/);
    });
  });

  describe('edge cases', () => {
    it('should handle negative temperatures', () => {
      const coldDay = {
        dt: Math.floor(Date.now() / 1000) + 86400,
        temp: { min: -5, max: 2 },
        weather: [{ id: 601, main: 'Snow', description: 'snow', icon: '13d' }]
      };

      const wrapper = mount(ForecastDay, {
        props: { day: coldDay }
      });

      expect(wrapper.text()).toContain('-5');
      expect(wrapper.text()).toContain('2');
    });

    it('should round decimal temperatures', () => {
      const decimalDay = {
        dt: Math.floor(Date.now() / 1000) + 86400,
        temp: { min: 10.4, max: 21.7 },
        weather: [{ id: 800, main: 'Clear', description: 'clear', icon: '01d' }]
      };

      const wrapper = mount(ForecastDay, {
        props: { day: decimalDay }
      });

      // Should show rounded values
      expect(wrapper.text()).toContain('10');
      expect(wrapper.text()).toContain('22');
    });
  });
});
