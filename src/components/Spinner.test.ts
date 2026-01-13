import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoadingSpinner from './Spinner.vue';

describe('LoadingSpinner', () => {
  it('should render loading text', () => {
    const wrapper = mount(LoadingSpinner);
    expect(wrapper.text()).toContain('Fetching weather data...');
  });

  it('should generate spinner elements', () => {
    const wrapper = mount(LoadingSpinner);
    const spinner = wrapper.find('.animate-spin');
    expect(spinner.exists()).toBe(true);
  });
});
