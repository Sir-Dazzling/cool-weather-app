import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorMessage from './ErrorMessage.vue';

describe('ErrorMessage', () => {
  it('should render error message when passed', () => {
    const wrapper = mount(ErrorMessage, {
      props: { message: 'City not found' }
    });
    
    expect(wrapper.text()).toContain('City not found');
  });

  it('should not render anything when message is null', () => {
    const wrapper = mount(ErrorMessage, {
      props: { message: null }
    });
    
    expect(wrapper.text()).toBe('');
  });

  it('should not render anything when message is empty string', () => {
    const wrapper = mount(ErrorMessage, {
      props: { message: '' }
    });
    
    expect(wrapper.text()).toBe('');
  });
});
