# Quick Reference Guide

## 📁 Struktur Folder

```
src/
├── 📄 App.vue                  # Root component
├── 📄 main.js                  # Entry point
├── 📄 style.css                # Global styles
│
├── 📂 components/              # Vue components
│   ├── AdminHeader.vue
│   ├── AdminLayout.vue
│   ├── AdminSidebar.vue
│   └── 📂 ui/                  # Reusable UI components
│       ├── AlertNotification.vue
│       ├── BaseModal.vue
│       ├── EmptyState.vue
│       ├── SearchInput.vue
│       ├── StatCard.vue
│       ├── StatusBadge.vue
│       └── index.js            # Exports all UI components
│
├── 📂 composables/             # Business logic (reusable)
│   ├── useAlert.js             # Alert notification logic
│   ├── useCustomers.js         # Customer CRUD & filtering
│   ├── useModal.js             # Modal state management
│   ├── useServices.js          # Service data (static)
│   ├── useServicesApi.js       # Service CRUD with API
│   ├── useTransactions.js      # Transaction CRUD & filtering
│   └── index.js                # Exports all composables
│
├── 📂 constants/               # Constants & enums
│   └── index.js                # Status, labels, classes
│
├── 📂 pages/                   # Page components (views)
│   ├── AddTransaction.vue
│   ├── AdminDashboard.vue
│   ├── CustomerData.vue        # ✨ Refactored
│   ├── KelolaLayanan.vue       # ✨ Refactored
│   ├── Login.vue
│   ├── ReportData.vue
│   ├── Settings.vue
│   └── TransactionData.vue     # ✨ Refactored
│
├── 📂 router/                  # Vue Router config
│   └── index.js
│
├── 📂 services/                # API service layer
│   └── api.js                  # Centralized API calls
│
└── 📂 utils/                   # Utility functions
    └── formatters.js           # Format price, date, etc.
```

## 🎯 Import Cheat Sheet

### UI Components
```javascript
// Option 1: Import individually
import AlertNotification from '@/components/ui/AlertNotification.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

// Option 2: Import all at once
import { 
  AlertNotification, 
  BaseModal, 
  StatusBadge 
} from '@/components/ui'
```

### Composables
```javascript
// Import what you need
import { useCustomers } from '@/composables/useCustomers'
import { useAlert } from '@/composables/useAlert'
import { useModal } from '@/composables/useModal'

// Or import from index
import { 
  useCustomers, 
  useAlert, 
  useModal 
} from '@/composables'
```

### Utils & Constants
```javascript
// Utils
import { 
  formatPrice, 
  formatDate, 
  getInitials 
} from '@/utils/formatters'

// Constants
import { 
  TRANSACTION_STATUS, 
  STATUS_LABELS, 
  STATUS_CLASSES 
} from '@/constants'
```

### API Service
```javascript
import api from '@/services/api'

// Usage
await api.get('/endpoint')
await api.post('/endpoint', data)
await api.put('/endpoint/:id', data)
await api.delete('/endpoint/:id')
```

## 🔧 Common Usage Patterns

### 1. Basic Page Setup
```vue
<script setup>
import { onMounted } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { useCustomers, useAlert, useModal } from '@/composables'

const { 
  customers, 
  loading, 
  fetchCustomers 
} = useCustomers()

const { showAlert, alertMessage, displayAlert } = useAlert()
const modal = useModal()

onMounted(fetchCustomers)
</script>

<template>
  <AdminLayout>
    <!-- Your content here -->
  </AdminLayout>
</template>
```

### 2. CRUD Operations
```javascript
// CREATE
await addCustomer({ nama: 'John', no_telp: '08123456789' })

// READ
await fetchCustomers()

// UPDATE
await updateCustomer(id, { nama: 'John Updated' })

// DELETE
await deleteCustomer(id)
```

### 3. Modal Pattern
```vue
<script setup>
import { useModal } from '@/composables'
import { BaseModal } from '@/components/ui'

const modal = useModal()

const handleOpen = () => modal.openModal()
const handleClose = () => modal.closeModal()
</script>

<template>
  <button @click="handleOpen">Open Modal</button>
  
  <BaseModal 
    :show="modal.isOpen.value" 
    title="My Modal"
    @close="handleClose"
  >
    <!-- Modal content -->
  </BaseModal>
</template>
```

### 4. Alert Pattern
```vue
<script setup>
import { useAlert } from '@/composables'
import { AlertNotification } from '@/components/ui'

const { showAlert, alertMessage, alertType, displayAlert } = useAlert()

const handleSuccess = () => {
  displayAlert('Operation successful!', 'success')
}

const handleError = () => {
  displayAlert('Something went wrong!', 'error')
}
</script>

<template>
  <AlertNotification 
    :show="showAlert" 
    :message="alertMessage"
    :type="alertType"
  />
</template>
```

### 5. Search & Filter Pattern
```vue
<script setup>
import { SearchInput } from '@/components/ui'
import { useCustomers } from '@/composables'

const { searchQuery, filteredCustomers } = useCustomers()
</script>

<template>
  <SearchInput 
    v-model="searchQuery" 
    placeholder="Search customers..."
  />
  
  <div v-for="customer in filteredCustomers" :key="customer.id">
    {{ customer.nama }}
  </div>
</template>
```

## 🎨 Component Props Reference

### AlertNotification
```vue
<AlertNotification 
  :show="true"              // Boolean - show/hide
  message="Success!"         // String - message to display
  type="success"            // 'success' | 'error' | 'warning' | 'info'
/>
```

### BaseModal
```vue
<BaseModal 
  :show="true"              // Boolean - show/hide
  title="Modal Title"       // String - modal title
  size="md"                 // 'sm' | 'md' | 'lg' | 'xl'
  @close="handleClose"      // Event - close handler
>
  <!-- Content slot -->
  
  <template #footer>
    <!-- Footer slot (optional) -->
  </template>
</BaseModal>
```

### StatusBadge
```vue
<StatusBadge 
  status="pending"          // String - status key from constants
/>
```

### SearchInput
```vue
<SearchInput 
  v-model="searchQuery"     // String - search query
  placeholder="Search..."   // String - placeholder text
/>
```

### EmptyState
```vue
<EmptyState 
  title="No Data"           // String - main title
  description="Add new data" // String - description (optional)
>
  <template #icon>
    <!-- Custom icon slot (optional) -->
  </template>
  
  <template #action>
    <!-- Action buttons slot (optional) -->
  </template>
</EmptyState>
```

### StatCard
```vue
<StatCard 
  title="Total Orders"          // String - card title
  value="124"                    // String | Number - main value
  subtitle="+12% from last month" // String - subtitle (optional)
  subtitleClass="text-green-600" // String - Tailwind classes
  iconBgClass="bg-blue-100"      // String - Tailwind classes
>
  <template #icon>
    <!-- Custom icon SVG -->
  </template>
</StatCard>
```

## 📋 Constants Reference

### Transaction Status
```javascript
import { TRANSACTION_STATUS } from '@/constants'

TRANSACTION_STATUS.PENDING    // 'pending'
TRANSACTION_STATUS.PROCESS    // 'process'
TRANSACTION_STATUS.DONE       // 'done'
TRANSACTION_STATUS.DELIVERED  // 'delivered'
```

### Status Labels
```javascript
import { STATUS_LABELS } from '@/constants'

STATUS_LABELS['pending']    // 'Pending'
STATUS_LABELS['process']    // 'Proses'
STATUS_LABELS['done']       // 'Selesai'
STATUS_LABELS['delivered']  // 'Terkirim'
```

### Status Classes (Tailwind)
```javascript
import { STATUS_CLASSES } from '@/constants'

STATUS_CLASSES['pending']    // 'bg-yellow-100 text-yellow-800'
STATUS_CLASSES['process']    // 'bg-blue-100 text-blue-800'
STATUS_CLASSES['done']       // 'bg-green-100 text-green-800'
STATUS_CLASSES['delivered']  // 'bg-purple-100 text-purple-800'
```

## 🛠️ Utils Reference

### formatPrice
```javascript
import { formatPrice } from '@/utils/formatters'

formatPrice(1000)      // '1.000'
formatPrice(1000000)   // '1.000.000'
```

### formatPriceWithCurrency
```javascript
import { formatPriceWithCurrency } from '@/utils/formatters'

formatPriceWithCurrency(50000)  // 'Rp 50.000'
```

### formatDate
```javascript
import { formatDate } from '@/utils/formatters'

formatDate('2024-01-15')  // '15 Jan 2024'
```

### getInitials
```javascript
import { getInitials } from '@/utils/formatters'

getInitials('John Doe')  // 'J'
```

### addDays
```javascript
import { addDays } from '@/utils/formatters'

addDays('2024-01-15', 3)  // '2024-01-18'
```

## 🚀 API Service Reference

### GET Request
```javascript
import api from '@/services/api'

const data = await api.get('/pelanggan')
```

### POST Request
```javascript
await api.post('/pelanggan', {
  nama: 'John Doe',
  no_telp: '08123456789'
})
```

### PUT Request
```javascript
await api.put('/pelanggan/1', {
  nama: 'John Updated'
})
```

### DELETE Request
```javascript
await api.delete('/pelanggan/1')
```

## 💡 Tips & Best Practices

1. **Always use composables for business logic**
   ```javascript
   // ❌ Don't fetch directly in component
   const data = await fetch('/api/customers')
   
   // ✅ Use composable
   const { customers, fetchCustomers } = useCustomers()
   ```

2. **Reuse UI components**
   ```vue
   <!-- ❌ Don't duplicate UI code -->
   <div class="px-2 py-1 rounded-full bg-green-100">Success</div>
   
   <!-- ✅ Use component -->
   <StatusBadge status="done" />
   ```

3. **Use constants instead of hardcoded strings**
   ```javascript
   // ❌ Don't hardcode
   if (status === 'pending') { ... }
   
   // ✅ Use constant
   if (status === TRANSACTION_STATUS.PENDING) { ... }
   ```

4. **Format data using utils**
   ```javascript
   // ❌ Don't format inline
   `Rp ${price.toLocaleString('id-ID')}`
   
   // ✅ Use formatter
   formatPriceWithCurrency(price)
   ```

## 📖 Documentation Files

- **REFACTORING_SUMMARY.md** - Overview of changes
- **REFACTORING_NOTES.md** - Detailed explanations
- **ARCHITECTURE.md** - System architecture
- **QUICK_REFERENCE.md** - This file (quick lookup)

## 🆘 Troubleshooting

### Import errors?
```javascript
// Use @ alias for src directory
import Component from '@/components/Component.vue'
// Instead of
import Component from '../../../components/Component.vue'
```

### Composable not reactive?
```javascript
// ✅ Destructure with proper refs
const { customers, loading } = useCustomers()

// ❌ Don't destructure computed/refs incorrectly
const customers = useCustomers().customers.value
```

### Modal not closing?
```javascript
// ✅ Use the composable's close method
modal.closeModal()

// ❌ Don't set isOpen directly
modal.isOpen = false  // Won't work!
```
