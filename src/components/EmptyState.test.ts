import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EmptyState from './EmptyState.vue';
import { POPULAR_CITIES } from '../constants';

describe('EmptyState', () => {
  describe('rendering', () => {
    it('should render welcome heading', () => {
      const wrapper = mount(EmptyState);

      expect(wrapper.text()).toContain('Welcome');
      expect(wrapper.text()).toContain('Weather Dashboard');
    });

    it('should render description text', () => {
      const wrapper = mount(EmptyState);

      expect(wrapper.text()).toContain('Search for any city');
      expect(wrapper.text()).toContain('5-day forecast');
    });

    it('should render popular cities section', () => {
      const wrapper = mount(EmptyState);

      expect(wrapper.text()).toContain('Popular Cities');
    });

    it('should render all popular city buttons', () => {
      const wrapper = mount(EmptyState);

      POPULAR_CITIES.forEach(city => {
        expect(wrapper.text()).toContain(city);
      });
    });

    it('should render correct number of city buttons', () => {
      const wrapper = mount(EmptyState);

      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBe(POPULAR_CITIES.length);
    });

    it('should render cloud icon', () => {
      const wrapper = mount(EmptyState);

      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
    });
  });

  describe('interactions', () => {
    it('should emit search event when city button is clicked', async () => {
      const wrapper = mount(EmptyState);

      const buttons = wrapper.findAll('button');
      await buttons[0]!.trigger('click');

      expect(wrapper.emitted('search')).toBeTruthy();
    });

    it('should emit correct city name when button is clicked', async () => {
      const wrapper = mount(EmptyState);

      const buttons = wrapper.findAll('button');
      await buttons[0]!.trigger('click');

      const searchEmits = wrapper.emitted('search')!;
      expect(searchEmits[0]).toEqual([POPULAR_CITIES[0]]);
    });

    it('should emit different city for each button', async () => {
      const wrapper = mount(EmptyState);
      const buttons = wrapper.findAll('button');

      // Click each button and verify correct city is emitted
      for (let i = 0; i < buttons.length; i++) {
        await buttons[i]!.trigger('click');
      }

      const searchEmits = wrapper.emitted('search')!;
      expect(searchEmits.length).toBe(POPULAR_CITIES.length);
      
      POPULAR_CITIES.forEach((city, index) => {
        expect(searchEmits[index]).toEqual([city]);
      });
    });
  });

  describe('accessibility', () => {
    it('should have clickable buttons for cities', () => {
      const wrapper = mount(EmptyState);

      const buttons = wrapper.findAll('button');
      buttons.forEach(button => {
        expect(button.element.tagName).toBe('BUTTON');
      });
    });
  });
});
