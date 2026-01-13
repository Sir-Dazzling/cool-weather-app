import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppHeader from './AppHeader.vue';

describe('AppHeader', () => {
  it('should render main title', () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.text()).toContain('Weather Dashboard');
  });

  it('should render subtitle', () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.text()).toContain('Your personal weather companion');
  });
});
