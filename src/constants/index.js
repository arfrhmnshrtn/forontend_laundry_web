export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  PROCESS: 'process',
  DONE: 'done',
  DELIVERED: 'delivered'
};

export const PAYMENT_METHOD = {
  PREPAID: 'prepaid',
  POSTPAID: 'postpaid'
};

export const PAYMENT_STATUS = {
  PAID: 'paid',
  UNPAID: 'unpaid'
};

export const SERVICE_TYPE = {
  KILOAN: 'kiloan',
  SATUAN: 'satuan'
};

export const STATUS_LABELS = {
  [TRANSACTION_STATUS.PENDING]: 'Pending',
  [TRANSACTION_STATUS.PROCESS]: 'Proses',
  [TRANSACTION_STATUS.DONE]: 'Selesai',
  [TRANSACTION_STATUS.DELIVERED]: 'Terkirim'
};

export const STATUS_CLASSES = {
  [TRANSACTION_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [TRANSACTION_STATUS.PROCESS]: 'bg-blue-100 text-blue-800',
  [TRANSACTION_STATUS.DONE]: 'bg-green-100 text-green-800',
  [TRANSACTION_STATUS.DELIVERED]: 'bg-purple-100 text-purple-800'
};
