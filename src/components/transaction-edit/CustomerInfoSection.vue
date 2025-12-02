<template>
  <div class="bg-gray-50 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Informasi Pelanggan
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nama Pelanggan
        </label>
        <input
          :value="customerName"
          type="text"
          readonly
          class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          No. Telepon
        </label>
        <input
          :value="customerPhone"
          type="tel"
          readonly
          class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  }
})
</script>