<script setup lang="ts">
import { POPULAR_CITIES } from '../constants';
</script>

<template>
    <div class="rounded-3xl p-12 md:p-16 text-center animate-fade-in max-w-2xl mx-auto transition-all duration-700"
        style="box-shadow: var(--shadow-md);">

        <!--Empty State Icon -->
        <div class="inline-flex p-6 rounded-full mb-6">
            <svg class="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        </div>

        <!-- Heading -->
        <h2 class="text-2xl md:text-3xl font-bold mb-3" style="font-family: var(--font-heading);">
            Welcome to Your Weather Dashboard
        </h2>

        <!-- Description -->
        <p class="text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed" style="font-family: var(--font-body);">
            Search for any city to view current weather conditions and a detailed 5-day forecast
        </p>

        <!-- Quick Access Cities -->
        <div class="flex flex-wrap justify-center gap-2 pt-6 border-t">
            <p class="w-full text-xs uppercase tracking-wide mb-3">
                Popular Cities
            </p>
            <div class="flex flex-wrap justify-center gap-2">
                <button v-for="city in POPULAR_CITIES" :key="city"
                    class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-105">
                    {{ city }}
                </button>
            </div>
        </div>
    </div>
</template>