<script setup lang="ts">
import type { DailyForecast } from '../types/forecast';

defineProps<{
  day: DailyForecast;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 backdrop-blur-md group"
    style="
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    ">

    <!-- Day Name -->
    <div class="text-center">
      <span class="block text-sm font-semibold uppercase tracking-wide transition-colors duration-200 text-[#0F1419]"
        style="
              font-family: var(--font-heading); 
    
            ">
        Today
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
        <span class="text-xl font-bold text-[#0F1419]" style="
                font-family: var(--font-heading);
              ">
          <!-- {{ Math.round(day.temp.max) }}° -->
        </span>
      </div>
      <span class="text-base text-[#536878]" style="
              font-family: var(--font-body);
            ">
        {{ Math.round(day.temp.min) }}°
      </span>
    </div>

    <!-- Weather Description -->
    <p v-if="day.weather && day.weather[0]"
      class="text-xs text-center capitalize px-3 py-1.5 rounded-full transition-colors duration-200 text-[#45B1E8] bg-[#E0F2FB] font-[600]">
      <!-- {{ day.weather[0].main }} -->
    </p>
  </div>
</template>