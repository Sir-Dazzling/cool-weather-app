import { computed } from "vue";
import type { IWeatherCondition, IWeatherTheme } from "../types/weather";

export function useWeatherTheme(weatherCondition?: IWeatherCondition) {
  const getTheme = computed((): IWeatherTheme => {
    if (!weatherCondition) {
      return getDefaultTheme();
    }

    const condition = weatherCondition.main.toLowerCase();
    const icon = weatherCondition.icon;
    const isNight = icon.includes('n');

    // Severe weather conditions
    if (['thunderstorm', 'tornado', 'squall'].includes(condition)) {
      return getStormyTheme();
    }

    // Night themes
    if (isNight) {
      if (['clear'].includes(condition)) {
        return getClearNightTheme();
      }
      return getCloudyNightTheme();
    }

    // Day themes
    switch (condition) {
      case 'clear':
        return getSunnyTheme();
      
      case 'clouds':
        return getCloudyTheme();
      
      case 'rain':
      case 'drizzle':
        return getRainyTheme();
      
      case 'snow':
        return getSnowyTheme();
      
      case 'mist':
      case 'fog':
      case 'haze':
      case 'smoke':
        return getMistyTheme();
      
      default:
        return getDefaultTheme();
    }
  });

  return {
    theme: getTheme
  };
}

// Theme Definitions
function getDefaultTheme(): IWeatherTheme {
  return {
    name: 'default',
    bgGradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    primaryColor: '#0EA5E9',
    secondaryColor: '#0284C7',
    accentColor: '#0369A1',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    borderColor: '#E0F2FE',
    iconColor: '#0EA5E9',
    severity: 'normal'
  };
}

function getSunnyTheme(): IWeatherTheme {
  return {
    name: 'sunny',
    bgGradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 30%, #FCD34D 60%, #60A5FA 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    accentColor: '#EA580C',
    textPrimary: '#1F2937',
    textSecondary: '#4B5563',
    borderColor: '#FEF3C7',
    iconColor: '#F59E0B',
    severity: 'normal'
  };
}

function getCloudyTheme(): IWeatherTheme {
  return {
    name: 'cloudy',
    bgGradient: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 50%, #CBD5E1 100%)',
    cardBg: 'rgba(255, 255, 255, 0.98)',
    primaryColor: '#64748B',
    secondaryColor: '#475569',
    accentColor: '#334155',
    textPrimary: '#1E293B',
    textSecondary: '#475569',
    borderColor: '#E2E8F0',
    iconColor: '#64748B',
    severity: 'normal'
  };
}

function getRainyTheme(): IWeatherTheme {
  return {
    name: 'rainy',
    bgGradient: 'linear-gradient(135deg, #DBEAFE 0%, #93C5FD 40%, #3B82F6 100%)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    primaryColor: '#2563EB',
    secondaryColor: '#1D4ED8',
    accentColor: '#1E40AF',
    textPrimary: '#1E293B',
    textSecondary: '#475569',
    borderColor: '#DBEAFE',
    iconColor: '#3B82F6',
    severity: 'warning'
  };
}

function getSnowyTheme(): IWeatherTheme {
  return {
    name: 'snowy',
    bgGradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%)',
    cardBg: 'rgba(255, 255, 255, 0.98)',
    primaryColor: '#0EA5E9',
    secondaryColor: '#0284C7',
    accentColor: '#0369A1',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    borderColor: '#F0F9FF',
    iconColor: '#0EA5E9',
    severity: 'warning'
  };
}

function getStormyTheme(): IWeatherTheme {
  return {
    name: 'stormy',
    bgGradient: 'linear-gradient(135deg, #1E293B 0%, #334155 40%, #475569 100%)',
    cardBg: 'rgba(30, 41, 59, 0.95)',
    primaryColor: '#EF4444',
    secondaryColor: '#DC2626',
    accentColor: '#F59E0B',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    borderColor: '#475569',
    iconColor: '#EF4444',
    severity: 'severe'
  };
}

function getMistyTheme(): IWeatherTheme {
  return {
    name: 'misty',
    bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #CBD5E1 100%)',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    primaryColor: '#94A3B8',
    secondaryColor: '#64748B',
    accentColor: '#475569',
    textPrimary: '#1E293B',
    textSecondary: '#475569',
    borderColor: '#E2E8F0',
    iconColor: '#94A3B8',
    severity: 'normal'
  };
}

function getClearNightTheme(): IWeatherTheme {
  return {
    name: 'clear-night',
    bgGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 40%, #4C1D95 100%)',
    cardBg: 'rgba(30, 27, 75, 0.92)',
    primaryColor: '#A78BFA',
    secondaryColor: '#8B5CF6',
    accentColor: '#7C3AED',
    textPrimary: '#F5F3FF',
    textSecondary: '#DDD6FE',
    borderColor: '#4C1D95',
    iconColor: '#C4B5FD',
    severity: 'normal'
  };
}

function getCloudyNightTheme(): IWeatherTheme {
  return {
    name: 'cloudy-night',
    bgGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
    cardBg: 'rgba(15, 23, 42, 0.95)',
    primaryColor: '#60A5FA',
    secondaryColor: '#3B82F6',
    accentColor: '#2563EB',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    borderColor: '#334155',
    iconColor: '#60A5FA',
    severity: 'normal'
  };
}