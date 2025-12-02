<template>
  <span :class="['px-2 py-1 text-xs font-semibold rounded-full', statusClass]">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from "vue";


const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

// Define status labels and classes locally
const STATUS_LABELS = {
  pending: 'Antrian',
  process: 'Proses',
  selesai: 'Selesai',
  done: 'Selesai',
  delivered: 'Terkirim'
};

const STATUS_CLASSES = {
  pending: 'bg-yellow-100 text-yellow-800',
  process: 'bg-blue-100 text-blue-800',
  selesai: 'bg-green-100 text-green-800',
  done: 'bg-green-100 text-green-800',
  delivered: 'bg-purple-100 text-purple-800'
};

const label = computed(() => STATUS_LABELS[props.status] || props.status);
const statusClass = computed(
  () => STATUS_CLASSES[props.status] || "bg-gray-100 text-gray-800"
);
</script>
