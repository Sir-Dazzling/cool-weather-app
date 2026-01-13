<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { DEBOUNCE_MS, MIN_SEARCH_LENGTH } from '../constants';

const emit = defineEmits<{
    (e: 'search', city: string): void;
}>();

const searchQuery = ref("");
let debounceTimeout: ReturnType<typeof setTimeout>;
let isAnimating = false;

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        emit('search', searchQuery.value.trim());
    }
}

const clearSearch = () => {
    searchQuery.value = "";
    emit('search', "");
}

// Animate typing effect when setting query from outside this component
const setQueryWithAnimation = async (city: string) => {
    isAnimating = true;
    clearTimeout(debounceTimeout);
    searchQuery.value = '';
    await nextTick();

    // Typing each character with delay for nice effect
    for (let i = 0; i <= city.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 40));
        searchQuery.value = city.slice(0, i);
    }

    // Wait for Vue to process all reactive updates from the loop
    await nextTick();

    // Trigger search after animation
    handleSearch();

    // Clear any pending debounce that might have slipped through, then reset flag
    clearTimeout(debounceTimeout);
    isAnimating = false;
};

// Expose method to parent
defineExpose({ setQueryWithAnimation });

watch(searchQuery, (newVal) => {
    // Skipping auto-search during animation
    if (isAnimating) return;

    clearTimeout(debounceTimeout);

    if (newVal.trim().length >= MIN_SEARCH_LENGTH) {
        debounceTimeout = setTimeout(() => {
            handleSearch();
        }, DEBOUNCE_MS);
    } else if (newVal.trim().length === 0) {
        emit('search', '');
    }
});
</script>

<template>
    <div class="w-full max-w-2xl mx-auto relative group z-20 mb-8">
        <div class="relative rounded-full overflow-hidden hover:shadow-xl transition-all duration-300">
            <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            </div>
            <div class="flex items-center gap-3 px-6 py-4">
                <!-- Search Icon -->
                <svg class="w-5 h-5 flex-shrink-0 transition-all duration-200 group-hover:scale-110" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                <input v-model="searchQuery" @keyup.enter="handleSearch" type="text" placeholder="Search for a city..."
                    class="flex-1 bg-transparent outline-none text-base placeholder-opacity-60 transition-all duration-200"
                    style="font-family: var(--font-body);" />

                <button v-if="searchQuery" @click="clearSearch"
                    class="p-1.5 rounded-full transition-all duration-200 hover:bg-black/5 hover:cursor-pointer">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Search hint -->
        <p class="text-xs mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Try searching for "London", "New York", or "Tokyo"
        </p>
    </div>
</template>
