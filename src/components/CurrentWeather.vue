<template>
  <div class="rounded-3xl p-8 md:p-10 animate-fade-in transition-all duration-700"
    style="box-shadow: var(--shadow-md);">
    <!-- City Name & Main Info -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold mb-1" style="font-family: var(--font-heading);">
          Lagos
        </h2>
        <p class="text-sm font-medium" style="font-family: var(--font-body);">
          12 Jan 2026
        </p>
      </div>

      <!-- Temperature Display -->
      <div class="flex items-center gap-4">
        <div>
          <!-- To Do -->
          <p>Temp icon</p>
        </div>
        <div class="flex items-baseline">
          <span class="text-7xl md:text-8xl font-light tracking-tighter" style="font-family: var(--font-heading);">
            25
          </span>
          <span class="text-4xl font-light ml-1">°C</span>
        </div>
      </div>
    </div>

    <!-- Weather Description -->
    <div>
      <p class="text-lg font-medium capitalize" style="font-family: var(--font-body);">
        Test weather description
      </p>
    </div>

    <!-- Weather Details Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t" style="border-color: var(--color-border-light);">
      <!-- Feels Like -->
      <div class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-black/5">
        <div class="flex items-center gap-2">
          <!-- Temperature level icon -->
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="text-xs uppercase tracking-wide font-medium">
            Feels Like
          </span>
        </div>
        <span class="text-2xl font-semibold" style="font-family: var(--font-heading);">
          25°C
        </span>
      </div>

      <!-- Humidity -->
      <div class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-black/5">
        <div class="flex items-center gap-2">
          <!-- Humidity icon -->
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span class="text-xs uppercase tracking-wide font-medium">
            Humidity
          </span>
        </div>
        <span class="text-2xl font-semibold" style="font-family: var(--font-heading);">
          25%
        </span>
      </div>

      <!-- Wind Speed -->
      <div class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-black/5">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span class="text-xs uppercase tracking-wide font-medium">
            Wind
          </span>
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-semibold" style="font-family: var(--font-heading);">
            25
          </span>
          <span class="text-sm">m/s</span>
        </div>
      </div>

      <!-- Condition -->
      <div class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-black/5">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span class="text-xs uppercase tracking-wide font-medium">
            Condition
          </span>
        </div>
        <span class="text-lg font-semibold capitalize truncate" style="font-family: var(--font-heading);">
          Test condition
        </span>
      </div>
    </div>
  </div>
</template>