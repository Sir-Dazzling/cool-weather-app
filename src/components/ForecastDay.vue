<script setup lang="ts">
import type { IDailyForecast } from '../types/forecast';
import { formatDayWithDate } from '../utils/dateUtils';

defineProps<{
  day: IDailyForecast;
}>();

// Get the day label (Today, Tomorrow, or "Mon 13")
const getDayLabel = (dt: number) => formatDayWithDate(dt);
</script>

<template>
  <div
    class="flex flex-col hover:cursor-pointer items-center gap-3 p-5 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 backdrop-blur-md group forecast-card"
    style="
         background: var(--dynamic-card-bg, rgba(255, 255, 255, 0.95)); 
         border-color: var(--dynamic-border, #E0F2FB);
         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
       " @mouseenter="($event.currentTarget as HTMLElement).style.borderColor = 'var(--dynamic-primary)'"
    @mouseleave="($event.currentTarget as HTMLElement).style.borderColor = 'var(--dynamic-border)'">

    <!-- Day Name -->
    <div class="text-center">
      <span class="block text-sm font-semibold uppercase tracking-wide transition-colors duration-200" style="
              color: var(--dynamic-text-primary, #0F1419); 
              font-family: var(--font-heading); 
              letter-spacing: 0.05em;
            ">
        {{ getDayLabel(day.dt) }}
      </span>
    </div>

    <!-- Weather Icon -->
    <div class="relative">
      <img v-if="day.weather && day.weather[0]" :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
        :alt="day.weather[0].description" class="w-16 h-16 drop-shadow-lg" />
    </div>

    <!-- Temperature Range -->
    <div class="flex flex-col items-center gap-0.5 w-full">
      <div class="flex items-baseline gap-1">
        <span class="text-xl font-bold" style="
                color: var(--dynamic-text-primary, #0F1419); 
                font-family: var(--font-heading);
              ">
          {{ Math.round(day.temp.max) }}°
        </span>
      </div>
      <span class="text-base" style="
              color: var(--dynamic-text-secondary, #536878); 
              font-family: var(--font-body);
            ">
        {{ Math.round(day.temp.min) }}°
      </span>
    </div>

    <!-- Weather Description -->
    <p v-if="day.weather && day.weather[0]"
      class="text-xs text-center capitalize px-3 py-1.5 rounded-full transition-colors duration-200" style="
         color: var(--dynamic-primary, #45B1E8); 
         background-color: var(--dynamic-border, #E0F2FB); 
         font-weight: 600;
       ">
      {{ day.weather[0].main }}
    </p>
  </div>
</template>