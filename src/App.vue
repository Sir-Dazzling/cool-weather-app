<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import ForecastList from './components/ForecastList.vue';
import EmptyState from './components/EmptyState.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-8 px-4 md:px-8 transition-all duration-700">
    <!-- App Header -->
    <AppHeader />

    <!-- Search Bar -->
    <div class="w-full max-w-2xl z-20 mb-8">
      <SearchBar />
    </div>

    <!-- Empty State, when no data is available -->
    <div class="w-full max-w-4xl">
      <EmptyState />
    </div>

    <!-- Weather Data Display, when data is available -->
    <transition v-if="false" name="slide-up">
      <div class="w-full max-w-6xl px-4 lg:px-0">

        <!-- Current Weather Card -->
        <div class="mb-8">
          <CurrentWeather />
        </div>

        <!-- Forecast Card -->
        <div>
          <ForecastList />
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
