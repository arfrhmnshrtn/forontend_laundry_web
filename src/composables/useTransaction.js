import { ref } from 'vue'
import api from '../services/api'
import { transformTransactionData } from '../utils/transactionUtils'

/**
 * Composable for transaction operations
 * @returns {Object} Transaction operations and state
 */
export const useTransaction = () => {
  const loading = ref(false)
  const error = ref(null)

  /**
   * Fetch transaction details by ID
   * @param {string|number} transactionId - Transaction ID
   * @returns {Promise<Object>} Transformed transaction data
   */
  const fetchTransaction = async (transactionId) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get(`/transaksi/${transactionId}`)
      const transaction = response.data?.data || response.data || response
      return transformTransactionData(transaction)
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update transaction status and payment status
   * @param {string|number} transactionId - Transaction ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<void>}
   */
  const updateTransaction = async (transactionId, updateData) => {
    loading.value = true
    error.value = null
    
    try {
      await api.put(`/transaksi/${transactionId}`, updateData)
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchTransaction,
    updateTransaction
  }
}