import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEBOUNCE_MS } from '../constants';
import SearchBar from './SearchBar.vue';

describe('SearchBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('should render with empty input', () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      expect(input.exists()).toBe(true);
      expect(input.element.value).toBe('');
    });

    it('should not show clear button when input is empty', () => {
      const wrapper = mount(SearchBar);
      const clearButton = wrapper.find('button');
      
      expect(clearButton.exists()).toBe(false);
    });
  });

  describe('user input', () => {
    it('should update input value when user types', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('London');
      
      expect(input.element.value).toBe('London');
    });

    it('should show clear button when input has value', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('London');
      const clearButton = wrapper.find('button');
      
      expect(clearButton.exists()).toBe(true);
    });

    it('should clear input and emit search with empty string when clear button clicked', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('London');
      const clearButton = wrapper.find('button');
      await clearButton.trigger('click');
      
      expect(input.element.value).toBe('');
      expect(wrapper.emitted('search')).toBeTruthy();
      
      const searchEmits = wrapper.emitted('search')!;
      const lastEmit = searchEmits[searchEmits.length - 1];
      expect(lastEmit).toEqual(['']);
    });
  });

  describe('debounce behavior', () => {
    it('should NOT emit search immediately when typing', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('Lon');
      
      // Immediately after typing, search should NOT have been emitted
      const searchEmits = wrapper.emitted('search');
      expect(searchEmits).toBeFalsy();
    });

    it('should emit search after debounce delay when input length >= MIN_SEARCH_LENGTH', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('London');
      
      // Advance timers past debounce delay
      vi.advanceTimersByTime(DEBOUNCE_MS + 100);
      
      const searchEmits = wrapper.emitted('search');
      expect(searchEmits).toBeTruthy();
      expect(searchEmits![searchEmits!.length - 1]).toEqual(['London']);
    });

    it('should NOT auto-search when input length < MIN_SEARCH_LENGTH', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('Lo'); // Only 2 characters
      
      vi.advanceTimersByTime(DEBOUNCE_MS + 100);
      
      const searchEmits = wrapper.emitted('search');
      expect(searchEmits).toBeFalsy();
    });

    it('should emit search with empty string when input is cleared', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('London');
      await input.setValue('');
      
      // Should emit immediately when cleared (no debounce for empty)
      const searchEmits = wrapper.emitted('search');
      expect(searchEmits).toBeTruthy();
      expect(searchEmits![searchEmits!.length - 1]).toEqual(['']);
    });

    it('should reset debounce timer when user keeps typing', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('Lon');
      vi.advanceTimersByTime(DEBOUNCE_MS / 2);
      
      await input.setValue('Lond');
      vi.advanceTimersByTime(DEBOUNCE_MS / 2);
      
      // Should not have emitted yet because timer was reset
      expect(wrapper.emitted('search')).toBeFalsy();
      
      // Now wait for full debounce
      vi.advanceTimersByTime(DEBOUNCE_MS);
      
      const searchEmits = wrapper.emitted('search');
      expect(searchEmits).toBeTruthy();
      expect(searchEmits![searchEmits!.length - 1]).toEqual(['Lond']);
    });
  });

  describe('keyboard interaction', () => {
    it('should emit search on Enter key press', async () => {
      const wrapper = mount(SearchBar);
      const input = wrapper.find('input');
      
      await input.setValue('Paris');
      await input.trigger('keyup.enter');
      
      const searchEmits = wrapper.emitted('search');
      expect(searchEmits).toBeTruthy();
      expect(searchEmits![searchEmits!.length - 1]).toEqual(['Paris']);
    });
  });

});
