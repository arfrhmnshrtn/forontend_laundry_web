<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Total Harga
      </label>
      <input
        :value="formatPrice(totalPrice)"
        type="text"
        readonly
        class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed font-bold text-lg"
      />
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '../../utils/transactionUtils'

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true
  }
})
</script>