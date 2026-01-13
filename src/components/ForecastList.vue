<script setup lang="ts">
import type { IDailyForecast } from '../types/forecast';
import ForecastDay from './ForecastDay.vue';

defineProps<{
  forecast: IDailyForecast[];
}>();
</script>

<template>
  <div class="dynamic-card rounded-3xl p-6 md:p-8 animate-fade-in transition-all duration-700"
    style="box-shadow: var(--shadow-md);">
    <!-- Section Header -->
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2.5 rounded-xl" style="background: var(--dynamic-primary);">
        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <h3 class="text-xl font-semibold dynamic-text-primary" style="font-family: var(--font-heading);">
          5-Day Forecast
        </h3>
        <p class="text-sm dynamic-text-secondary">
          Extended weather outlook
        </p>
      </div>
    </div>

    <!-- Forecast Grid -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <ForecastDay v-for="day in forecast" :key="day.dt" :day="day" />
    </div>
  </div>
</template>