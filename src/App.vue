<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import ForecastList from './components/ForecastList.vue';
import EmptyState from './components/EmptyState.vue';
import { useWeather } from './composables/useWeather';
import ErrorMessage from './components/ErrorMessage.vue';
import Spinner from './components/Spinner.vue';
import { computed, ref } from 'vue';
import { useWeatherTheme } from './composables/useWeatherTheme';

const { weatherData, cityName, isLoading, error, fetchWeatherData, clearWeatherData } = useWeather();

const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);

const handleSearch = (city: string) => {
  if (!city) {
    clearWeatherData();
    return;
  }
  fetchWeatherData(city);
}

// Handle popular city clicks from EmptyState
//Should trigger typing animation in SearchBar
const handlePopularCityClick = (city: string) => {
  searchBarRef.value?.setQueryWithAnimation(city);
}

// Dynamic theme based on current weather - computed reactively
const theme = computed(() => {
  const currentWeatherCondition = weatherData.value?.current.weather?.[0];
  const { theme: weatherTheme } = useWeatherTheme(currentWeatherCondition);
  return weatherTheme.value;
});

const dynamicStyles = computed(() => ({
  background: theme.value.bgGradient,
  '--dynamic-primary': theme.value.primaryColor,
  '--dynamic-secondary': theme.value.secondaryColor,
  '--dynamic-accent': theme.value.accentColor,
  '--dynamic-text-primary': theme.value.textPrimary,
  '--dynamic-text-secondary': theme.value.textSecondary,
  '--dynamic-card-bg': theme.value.cardBg,
  '--dynamic-border': theme.value.borderColor,
  '--dynamic-icon': theme.value.iconColor,
}));

const severityClass = computed(() => {
  const severity = theme.value.severity;
  return {
    'severity-normal': severity === 'normal',
    'severity-warning': severity === 'warning',
    'severity-severe': severity === 'severe',
  };
});

</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-8 px-4 md:px-8 transition-all duration-700"
    :style="dynamicStyles" :class="severityClass">
    <AppHeader />

    <SearchBar ref="searchBarRef" @search="handleSearch" />

    <!-- Error fallback -->
    <ErrorMessage :message="error" />

    <!-- Loading State -->
    <Spinner v-if="isLoading" />

    <!-- Empty State, when no data is available -->
    <div v-if="!isLoading && !weatherData && !error" class="w-full max-w-4xl">
      <EmptyState @search="handlePopularCityClick" />
    </div>

    <!-- Weather Data Display, when data is available -->
    <transition v-if="weatherData && !isLoading" name="slide-up">
      <div class="w-full max-w-6xl px-4 lg:px-0">

        <!-- Current Weather Card -->
        <div class="mb-8">
          <CurrentWeather :currentWeather="weatherData.current" :cityName="cityName" />
        </div>

        <!-- Forecast Card -->
        <div>
          <ForecastList :forecast="weatherData.daily" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Component Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
  transition: all 0.4s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
