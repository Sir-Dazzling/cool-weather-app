<template>
    <div class="flex flex-col items-center justify-center my-16 space-y-4">
        <div class="relative">
            <div class="w-14 h-14 rounded-full border-4 border-t-transparent animate-spin dynamic-spinner"></div>
            <div
                class="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent animate-pulse dynamic-spinner-glow">
            </div>
        </div>
        <span class="text-base font-medium animate-pulse-subtle dynamic-text-secondary"
            style="font-family: var(--font-heading);">
            Fetching weather data...
        </span>
    </div>
</template>
