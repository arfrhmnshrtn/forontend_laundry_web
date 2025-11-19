<template>
  <span :class="['px-2 py-1 text-xs font-semibold rounded-full', statusClass]">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from "vue";
import { STATUS_LABELS, STATUS_CLASSES } from "../../constants";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const label = computed(() => STATUS_LABELS[props.status] || props.status);
const statusClass = computed(
  () => STATUS_CLASSES[props.status] || "bg-gray-100 text-gray-800"
);
</script>
