<script setup lang="ts">
import type { IAppWeatherData } from '../types/weather';
import { getCurrentDateFormatted } from '../utils/dateUtils';

defineProps<{
  currentWeather: IAppWeatherData['current'];
  cityName: string;
}>();

const formatTemp = (temp: number) => Math.round(temp);
const currentDate = getCurrentDateFormatted();
</script>

<template>
  <div class="dynamic-card rounded-3xl p-8 md:p-10 animate-fade-in transition-all duration-700"
    style="box-shadow: var(--shadow-md);">
    <!-- City Name & Main Info -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold mb-1 dynamic-text-primary" style="font-family: var(--font-heading);">
          {{ cityName }}
        </h2>
        <p class="text-sm font-medium dynamic-text-secondary" style="font-family: var(--font-body);">
          {{ currentDate }}
        </p>
      </div>

      <!-- Temperature Display -->
      <div class="flex items-center gap-4">
        <template v-if="currentWeather.weather && currentWeather.weather[0]">
          <img :src="`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`"
            :alt="currentWeather.weather[0].description" class="w-24 h-24 md:w-28 md:h-28 drop-shadow-lg" />
        </template>
        <div class="flex items-baseline">
          <span class="text-7xl md:text-8xl font-light tracking-tighter dynamic-text-gradient"
            style="font-family: var(--font-heading);">
            {{ formatTemp(currentWeather.temp) }}
          </span>
          <span class="text-4xl font-light ml-1" style="color: var(--dynamic-primary);">°C</span>
        </div>
      </div>
    </div>

    <!-- Weather Description -->
    <div class="mb-6" v-if="currentWeather.weather && currentWeather.weather[0]">
      <p class="text-lg font-medium capitalize dynamic-text-secondary" style="font-family: var(--font-body);">
        {{ currentWeather.weather[0].description }}
      </p>
    </div>

    <!-- Weather Details Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t" style="border-color: var(--color-border-light);">

      <!-- Feels Like -->
      <div class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-black/5">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" style="color: var(--dynamic-icon);" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="text-xs uppercase tracking-wide font-medium dynamic-text-secondary">
            Feels Like
          </span>
        </div>
        <span class="text-2xl font-semibold dynamic-text-primary" style="font-family: var(--font-heading);">
          {{ formatTemp(currentWeather.feels_like) }}°
        </span>
      </div>

      <!-- Humidity -->
      <div class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-black/5">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" style="color: var(--dynamic-icon);" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span class="text-xs uppercase tracking-wide font-medium dynamic-text-secondary">
            Humidity
          </span>
        </div>
        <span class="text-2xl font-semibold dynamic-text-primary" style="font-family: var(--font-heading);">
          {{ currentWeather.humidity }}%
        </span>
      </div>

      <!-- Wind Speed -->
      <div class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-black/5"
        v-if="currentWeather.wind">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" style="color: var(--dynamic-icon);" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span class="text-xs uppercase tracking-wide font-medium dynamic-text-secondary">
            Wind
          </span>
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-semibold dynamic-text-primary" style="font-family: var(--font-heading);">
            {{ Math.round(currentWeather.wind.speed) }}
          </span>
          <span class="text-sm dynamic-text-secondary">m/s</span>
        </div>
      </div>

      <!-- Condition -->
      <div class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-black/5"
        v-if="currentWeather.weather && currentWeather.weather[0]">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" style="color: var(--dynamic-icon);" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span class="text-xs uppercase tracking-wide font-medium dynamic-text-secondary">
            Condition
          </span>
        </div>
        <span class="text-lg font-semibold capitalize truncate dynamic-text-primary"
          style="font-family: var(--font-heading);">
          {{ currentWeather.weather[0].main }}
        </span>
      </div>

    </div>
  </div>
</template>