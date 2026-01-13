import { describe, it, expect } from 'vitest';
import { 
  formatFullDate, 
  formatWeekday, 
  formatDayWithDate, 
  getCurrentDateFormatted,
  getCurrentTimeFormatted 
} from './dateUtils';

describe('dateUtils', () => {
  describe('formatFullDate', () => {
    it('should format timestamp to full date string', () => {
      // January 13, 2026 at noon UTC
      const timestamp = 1768392000;
      const result = formatFullDate(timestamp);
      
      // Should contain the weekday and month
      expect(result).toMatch(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/);
      expect(result).toMatch(/Jan/);
    });
  });

  describe('formatWeekday', () => {
    it('should return "Today" for today\'s date', () => {
      const now = Math.floor(Date.now() / 1000);
      const result = formatWeekday(now);
      
      expect(result).toBe('Today');
    });

    it('should return "Tomorrow" for tomorrow\'s date', () => {
      const tomorrow = Math.floor(Date.now() / 1000) + 86400; // +24 hours
      const result = formatWeekday(tomorrow);
      
      expect(result).toBe('Tomorrow');
    });

    it('should return weekday abbreviation for other dates', () => {
      const nextWeek = Math.floor(Date.now() / 1000) + (86400 * 7);
      const result = formatWeekday(nextWeek);
      
      // Should be a 3-letter weekday abbreviation
      expect(result).toMatch(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/);
    });
  });

  describe('formatDayWithDate', () => {
    it('should return "Today" for today', () => {
      const now = Math.floor(Date.now() / 1000);
      const result = formatDayWithDate(now);
      
      expect(result).toBe('Today');
    });

    it('should return "Tomorrow" for tomorrow', () => {
      const tomorrow = Math.floor(Date.now() / 1000) + 86400;
      const result = formatDayWithDate(tomorrow);
      
      expect(result).toBe('Tomorrow');
    });

    it('should return "Day Date" format for other dates', () => {
      const futureDate = Math.floor(Date.now() / 1000) + (86400 * 5);
      const result = formatDayWithDate(futureDate);
      
      // Should match format like "Mon 18" or "Fri 17"
      expect(result).toMatch(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) \d{1,2}$/);
    });
  });

  describe('getCurrentDateFormatted', () => {
    it('should return formatted current date', () => {
      const result = getCurrentDateFormatted();
      
      // Should contain year
      expect(result).toMatch(/\d{4}/);
      // Should contain month name
      expect(result).toMatch(/January|February|March|April|May|June|July|August|September|October|November|December/);
    });
  });

  describe('getCurrentTimeFormatted', () => {
    it('should return formatted time with AM/PM', () => {
      const result = getCurrentTimeFormatted();
      
      // Should match format like "2:30 PM" or "11:45 AM"
      expect(result).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });
  });
});
