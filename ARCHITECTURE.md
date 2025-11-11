# Arsitektur Aplikasi Laundry Management

## 📐 Layer Architecture

```
┌─────────────────────────────────────────────────┐
│                   PAGES/VIEWS                    │
│  (CustomerData, TransactionData, KelolaLayanan) │
│                                                  │
│  Bertanggung jawab:                             │
│  - Render UI                                     │
│  - Handle user interactions                      │
│  - Orchestrate composables                       │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│              UI COMPONENTS                       │
│  (AlertNotification, BaseModal, StatusBadge)    │
│                                                  │
│  Bertanggung jawab:                             │
│  - Reusable UI elements                         │
│  - Consistent styling                            │
│  - Props-based customization                     │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│               COMPOSABLES                        │
│  (useCustomers, useTransactions, useAlert)      │
│                                                  │
│  Bertanggung jawab:                             │
│  - Business logic                                │
│  - State management                              │
│  - Data transformation                           │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│              SERVICES/API                        │
│              (api.js)                            │
│                                                  │
│  Bertanggung jawab:                             │
│  - HTTP requests                                 │
│  - Error handling                                │
│  - Response transformation                       │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│            UTILS & CONSTANTS                     │
│     (formatters.js, constants/index.js)         │
│                                                  │
│  Bertanggung jawab:                             │
│  - Helper functions                              │
│  - Shared constants                              │
│  - Pure utility functions                        │
└─────────────────────────────────────────────────┘
```

## 🔄 Data Flow Example: Customer CRUD

### 1. Tambah Pelanggan

```
User Action (Click "Tambah")
         ↓
    Page Component
    (CustomerData.vue)
         ↓
    handleAdd() → modal.openModal()
         ↓
    User fills form
         ↓
    handleSave() 
         ↓
    useCustomers.addCustomer()
         ↓
    api.post('/pelanggan', data)
         ↓
    HTTP POST → Backend API
         ↓
    Response received
         ↓
    fetchCustomers() (refresh data)
         ↓
    displayAlert('Success!')
         ↓
    UI Updates
```

### 2. Component Communication

```
CustomerData.vue
    ├── uses: useCustomers (composable)
    │   └── uses: api.post/get/put/delete
    ├── uses: useAlert (composable)
    ├── uses: useModal (composable)
    └── renders:
        ├── AlertNotification (component)
        ├── BaseModal (component)
        ├── SearchInput (component)
        └── EmptyState (component)
```

## 🎯 Responsibility Matrix

| Layer | Knows About | Doesn't Know About |
|-------|-------------|-------------------|
| **Pages** | Composables, UI Components | API details, HTTP methods |
| **UI Components** | Props, Events | Business logic, API |
| **Composables** | Services, State | UI rendering, DOM |
| **Services** | HTTP, API endpoints | Vue components, State |
| **Utils** | Nothing | Everything (pure functions) |

## 📦 Module Dependencies

### CustomerData.vue Dependencies
```javascript
// Composables
import { useCustomers } from '../composables/useCustomers'
import { useAlert } from '../composables/useAlert'
import { useModal } from '../composables/useModal'

// UI Components
import AlertNotification from '../components/ui/AlertNotification.vue'
import BaseModal from '../components/ui/BaseModal.vue'
import SearchInput from '../components/ui/SearchInput.vue'
import EmptyState from '../components/ui/EmptyState.vue'

// Utils
import { getInitials } from '../utils/formatters'
```

### useCustomers Dependencies
```javascript
import { ref, computed } from 'vue'
import api from '../services/api'
```

### api.js Dependencies
```javascript
// No internal dependencies
// Only uses fetch API
```

## 🔑 Key Design Patterns

### 1. Composition Pattern
```javascript
// Combine multiple composables
const customers = useCustomers()
const alert = useAlert()
const modal = useModal()

// Use their methods
await customers.addCustomer(data)
alert.displayAlert('Success!')
modal.closeModal()
```

### 2. Single Responsibility
```javascript
// ✅ Good: Each does one thing
useCustomers() // Only customer logic
useAlert()     // Only alert logic
useModal()     // Only modal state

// ❌ Bad: God object
useEverything() // Does everything
```

### 3. Dependency Injection
```javascript
// Services injected into composables
export function useCustomers() {
  // Uses api service
  const data = await api.get('/pelanggan')
}

// Can easily swap implementation
const mockApi = { get: () => mockData }
```

## 🧪 Testing Strategy

### Unit Tests
```javascript
// Test composables
test('useCustomers.addCustomer', async () => {
  const { addCustomer } = useCustomers()
  await addCustomer({ nama: 'Test' })
  expect(api.post).toHaveBeenCalled()
})

// Test utils
test('formatPrice', () => {
  expect(formatPrice(1000)).toBe('1.000')
})
```

### Component Tests
```javascript
// Test UI components
test('StatusBadge renders correctly', () => {
  const { getByText } = render(StatusBadge, {
    props: { status: 'pending' }
  })
  expect(getByText('Pending')).toBeInTheDocument()
})
```

## 🔧 Extensibility Points

### Adding New Feature
1. Create composable if needed
   ```javascript
   // composables/useOrders.js
   export function useOrders() {
     const orders = ref([])
     const fetchOrders = async () => {
       orders.value = await api.get('/orders')
     }
     return { orders, fetchOrders }
   }
   ```

2. Create page component
   ```vue
   <!-- pages/OrderData.vue -->
   <script setup>
   import { useOrders } from '../composables/useOrders'
   const { orders, fetchOrders } = useOrders()
   </script>
   ```

3. Reuse existing UI components
   ```vue
   <template>
     <SearchInput v-model="searchQuery" />
     <StatusBadge :status="order.status" />
   </template>
   ```

## 🎨 Styling Strategy

### Tailwind CSS Classes
```javascript
// Shared classes in constants
export const BUTTON_CLASSES = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
}

// Use in components
<button :class="BUTTON_CLASSES.primary">
  Submit
</button>
```

## 📊 Performance Considerations

### Computed Properties
```javascript
// ✅ Cached, only recomputes when dependencies change
const filteredCustomers = computed(() => {
  return customers.value.filter(c => 
    c.nama.includes(searchQuery.value)
  )
})
```

### Lazy Loading
```javascript
// Routes
const CustomerData = () => import('./pages/CustomerData.vue')
```

### API Request Optimization
```javascript
// Debounce search
const debouncedSearch = debounce(fetchCustomers, 300)

// Cancel previous requests
const controller = new AbortController()
```

## 🔐 Security Considerations

### API Service
```javascript
// Centralized error handling
if (!response.ok) {
  if (response.status === 401) {
    // Redirect to login
    router.push('/login')
  }
  throw new Error('Unauthorized')
}
```

### Input Validation
```javascript
// In composables
const addCustomer = async (data) => {
  if (!data.nama || !data.no_telp) {
    throw new Error('Required fields missing')
  }
  await api.post('/pelanggan', data)
}
```

## 🚀 Deployment Checklist

- [ ] Run `npm run build`
- [ ] Check for console errors
- [ ] Test all CRUD operations
- [ ] Verify API endpoints
- [ ] Check responsive design
- [ ] Test on different browsers
- [ ] Verify loading states
- [ ] Check error handling

## 📝 Maintenance Guide

### Adding New Status
```javascript
// 1. Add to constants
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  NEW_STATUS: 'new_status' // Add here
}

// 2. Add label
export const STATUS_LABELS = {
  new_status: 'New Status Label'
}

// 3. Add styling
export const STATUS_CLASSES = {
  new_status: 'bg-pink-100 text-pink-800'
}
```

### Modifying API Endpoint
```javascript
// Only change in services/api.js
const API_BASE_URL = 'http://new-url.com/api'
```

## 🎓 Learning Resources

- Vue 3 Composition API: https://vuejs.org/guide/extras/composition-api-faq
- Tailwind CSS: https://tailwindcss.com/docs
- Best Practices: https://vuejs.org/style-guide/
