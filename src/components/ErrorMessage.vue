<script setup lang="ts">
defineProps<{
    message: string | null;
}>();
</script>

<template>
    <transition name="fade">
        <div v-if="message" class="max-w-2xl w-full mb-6 px-5 py-4 rounded-xl border animate-fade-in backdrop-blur-sm"
            style="
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.3);
        box-shadow: var(--shadow-sm);
      ">
            <div class="flex items-start gap-3">
                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: #EF4444;" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm font-medium" style="color: #DC2626;">
                    {{ message }}
                </p>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
