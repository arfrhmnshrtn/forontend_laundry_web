<template>
  <div class="flex gap-3 pt-4 border-t">
    <button
      type="button"
      @click="$emit('cancel')"
      class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
    >
      Batal
    </button>
    <button
      type="submit"
      :disabled="submitting"
      class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {{ submitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  submitting: {
    type: Boolean,
    required: true
  }
})

defineEmits(['cancel'])
</script>