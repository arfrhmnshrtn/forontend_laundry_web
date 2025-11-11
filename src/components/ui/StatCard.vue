<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-600 font-medium">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-800 mt-2">{{ value }}</p>
        <p v-if="subtitle" :class="['text-sm mt-2', subtitleClass]">
          {{ subtitle }}
        </p>
      </div>
      <div :class="['p-3 rounded-full', iconBgClass]">
        <slot name="icon">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  subtitleClass: {
    type: String,
    default: 'text-green-600'
  },
  iconBgClass: {
    type: String,
    default: 'bg-blue-100'
  }
});
</script>
