/**
 * Format price to Indonesian currency format
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

/**
 * Get appropriate label based on service type
 * @param {string} serviceType - Type of service ('Kiloan' or other)
 * @returns {string} Label text for the service unit
 */
export const getServiceUnitLabel = (serviceType) => {
  return serviceType === 'Kiloan' ? 'Berat (kg)' : 'Jumlah (pcs)'
}

/**
 * Transform API transaction data to component format
 * @param {Object} transaction - Raw transaction data from API
 * @returns {Object} Transformed transaction data
 */
export const transformTransactionData = (transaction) => {
  return {
    customerName: transaction.nama_pelanggan,
    customerPhone: transaction.no_telepon || '-',
    totalPrice: parseFloat(transaction.total_harga),
    dateIn: transaction.tanggal_masuk,
    dateOut: transaction.tanggal_selesai,
    status: transaction.status.toLowerCase(),
    paymentMethod: transaction.pembayaran_status,
    detailLayanan: (transaction.details || []).map(service => ({
      id: service.detail_id,
      namaLayanan: service.nama_layanan,
      tipeLayanan: service.tipe_layanan,
      durasi: service.durasi,
      berat: parseFloat(service.berat),
      subtotal: parseFloat(service.subtotal)
    })),
    notes: transaction.catatan || ''
  }
}