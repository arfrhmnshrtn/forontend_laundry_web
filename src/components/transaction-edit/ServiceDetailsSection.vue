<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Detail Layanan
    </h3>
    <div class="space-y-3">
      <div
        v-for="service in services"
        :key="service.id"
        class="border border-gray-300 rounded-lg p-4 bg-gray-50"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Layanan
            </label>
            <input
              :value="service.namaLayanan"
              type="text"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ getServiceUnitLabel(service.tipeLayanan) }}
            </label>
            <input
              :value="service.berat"
              type="text"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Subtotal
            </label>
            <input
              :value="formatPrice(service.subtotal)"
              type="text"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice, getServiceUnitLabel } from '../../utils/transactionUtils'

defineProps({
  services: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>