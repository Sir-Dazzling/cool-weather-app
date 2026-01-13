import { format, fromUnixTime, isToday, isTomorrow } from 'date-fns';

/**
 * Format a Unix timestamp to a readable date string
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string like "Monday, Jan 13"
 */
export function formatFullDate(timestamp: number): string {
  return format(fromUnixTime(timestamp), 'EEEE, MMM d');
}

/**
 * Format a Unix timestamp to just the weekday
 * @param timestamp - Unix timestamp in seconds
 * @returns Weekday abbreviation like "Mon" or "Today"/"Tomorrow" for relative dates
 */
export function formatWeekday(timestamp: number): string {
  const date = fromUnixTime(timestamp);
  
  if (isToday(date)) {
    return 'Today';
  }
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  
  return format(date, 'EEE');
}

/**
 * Format a Unix timestamp to show both day and date
 * @param timestamp - Unix timestamp in seconds
 * @returns String like "Mon 13" or "Today"/"Tomorrow"
 */
export function formatDayWithDate(timestamp: number): string {
  const date = fromUnixTime(timestamp);
  
  if (isToday(date)) {
    return 'Today';
  }
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  
  return format(date, 'EEE d');
}

/**
 * Get current date formatted
 * @returns Formatted current date like "Monday, January 13, 2026"
 */
export function getCurrentDateFormatted(): string {
  return format(new Date(), 'EEEE, MMMM d, yyyy');
}

/**
 * Get current time formatted
 * @returns Formatted current time like "2:10 PM"
 */
export function getCurrentTimeFormatted(): string {
  return format(new Date(), 'h:mm a');
}
