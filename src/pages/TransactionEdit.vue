<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header Section -->
      <div class="flex items-center gap-4">
        <BackButton />
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Edit Transaksi</h2>
          <p class="text-gray-600 mt-1">Edit data transaksi #{{ transactionId }}</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <LoadingSpinner />
        <p class="text-gray-600 mt-4">Memuat data transaksi...</p>
      </div>

      <!-- Main Form -->
      <div v-else class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Customer Information Section -->
          <CustomerInfoSection 
            :customer-name="formData.customerName"
            :customer-phone="formData.customerPhone"
          />

          <!-- Service Details Section -->
          <ServiceDetailsSection :services="formData.detailLayanan" />

          <!-- Total Price Section -->
          <TotalPriceSection :total-price="formData.totalPrice" />

          <!-- Editable Status Section -->
          <StatusSection 
            v-model:status="formData.status"
            v-model:payment-method="formData.paymentMethod"
          />

          <!-- Action Buttons -->
          <FormActions 
            :submitting="submitting"
            @cancel="handleCancel"
          />
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import { useTransaction } from '../composables/useTransaction'

// Components
import {
  BackButton,
  LoadingSpinner,
  CustomerInfoSection,
  ServiceDetailsSection,
  TotalPriceSection,
  StatusSection,
  FormActions
} from '../components/transaction-edit'

// Router setup
const route = useRoute()
const router = useRouter()
const transactionId = route.params.id

// Composables
const { loading, fetchTransaction, updateTransaction: updateTransactionApi } = useTransaction()

// Reactive state
const submitting = ref(false)
const formData = ref({
  customerName: '',
  customerPhone: '',
  detailLayanan: [],
  totalPrice: 0,
  paymentMethod: '',
  status: 'pending',
  dateIn: '',
  dateOut: '',
  notes: ''
})

/**
 * Fetch transaction details from API
 * Uses composable to fetch and transform data
 */
const fetchTransactionDetail = async () => {
  try {
    formData.value = await fetchTransaction(transactionId)
  } catch (error) {
    console.error('Failed to fetch transaction:', error)
    alert(`Gagal memuat data transaksi: ${error.message}`)
    router.back()
  }
}

/**
 * Handle form submission
 * Only updates status and payment status as per requirements
 */
const handleSubmit = async () => {
  submitting.value = true
  try {
    const updateData = {
      status: formData.value.status,
      pembayaran_status: formData.value.paymentMethod
    }

    await updateTransactionApi(transactionId, updateData)
    
    alert('Transaksi berhasil diupdate')
    router.push('/transactions')
  } catch (error) {
    console.error('Failed to update transaction:', error)
    alert(`Gagal mengupdate transaksi: ${error.message}`)
  } finally {
    submitting.value = false
  }
}

/**
 * Handle cancel action
 * Navigates back to previous page
 */
const handleCancel = () => {
  router.back()
}

// Initialize component
onMounted(() => {
  fetchTransactionDetail()
})
</script>