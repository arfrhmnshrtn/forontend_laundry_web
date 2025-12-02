<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Status *
      </label>
      <select
        :value="status"
        @input="$emit('update:status', $event.target.value)"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option
          v-for="statusOption in TRANSACTION_STATUSES"
          :key="statusOption.value"
          :value="statusOption.value"
        >
          {{ statusOption.label }}
        </option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Status Pembayaran *
      </label>
      <select
        :value="paymentMethod"
        @input="$emit('update:paymentMethod', $event.target.value)"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option
          v-for="paymentOption in PAYMENT_STATUSES"
          :key="paymentOption.value"
          :value="paymentOption.value"
        >
          {{ paymentOption.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
// Define transaction and payment statuses locally
const TRANSACTION_STATUSES = [
  { value: "pending", label: "Antrian" },
  { value: "selesai", label: "Selesai" },
];

const PAYMENT_STATUSES = [
  { value: "Lunas", label: "Lunas" },
  { value: "Belum Lunas", label: "Belum Lunas" },
];

defineProps({
  status: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

defineEmits(["update:status", "update:paymentMethod"]);
</script>
