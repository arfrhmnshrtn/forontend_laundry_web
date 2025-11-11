<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="handleClose"
  >
    <div :class="['bg-white rounded-lg shadow overflow-hidden', sizeClass]">
      <div class="p-4 border-b flex justify-between items-center">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <button
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <slot></slot>
      </div>
      
      <div v-if="$slots.footer" class="p-6 border-t">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
});

const emit = defineEmits(['close']);

const sizeClass = computed(() => {
  const sizes = {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-2xl w-full',
    xl: 'max-w-4xl w-full'
  };
  return sizes[props.size];
});

const handleClose = () => {
  emit('close');
};
</script>
