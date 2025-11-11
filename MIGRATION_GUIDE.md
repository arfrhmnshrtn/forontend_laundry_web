# Migration Guide

Panduan untuk merefactor halaman lain mengikuti pattern yang sama.

## 🎯 Langkah-langkah Refactoring

### 1. Identifikasi Komponen yang Bisa Dipisahkan

**Sebelum:**
```vue
<template>
  <div>
    <!-- 200+ lines of mixed logic and UI -->
    <div v-if="showModal" class="modal...">
      <!-- Modal content -->
    </div>
    
    <div v-if="showAlert" class="alert...">
      <!-- Alert content -->
    </div>
    
    <input v-model="search" class="search..." />
    
    <!-- More UI code -->
  </div>
</template>

<script setup>
// All logic in one place
const data = ref([])
const showModal = ref(false)
const showAlert = ref(false)
const search = ref('')

const fetchData = async () => {
  const res = await fetch('http://...')
  data.value = await res.json()
}

// More functions...
</script>
```

**Sesudah:**
```vue
<template>
  <div>
    <AlertNotification :show="showAlert" :message="alertMessage" />
    <BaseModal :show="modal.isOpen.value" @close="modal.closeModal">
      <!-- Modal content -->
    </BaseModal>
    <SearchInput v-model="searchQuery" />
    <!-- Cleaner UI code -->
  </div>
</template>

<script setup>
import { AlertNotification, BaseModal, SearchInput } from '@/components/ui'
import { useDataManagement } from '@/composables/useDataManagement'
import { useAlert } from '@/composables/useAlert'
import { useModal } from '@/composables/useModal'

const { data, searchQuery, fetchData } = useDataManagement()
const { showAlert, alertMessage, displayAlert } = useAlert()
const modal = useModal()
</script>
```

### 2. Ekstrak Logika API ke Composable

**Buat composable baru:**
```javascript
// composables/useYourFeature.js
import { ref, computed } from 'vue'
import api from '@/services/api'

export function useYourFeature() {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')

  const fetchItems = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await api.get('/your-endpoint')
      items.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addItem = async (itemData) => {
    await api.post('/your-endpoint', itemData)
    await fetchItems()
  }

  const updateItem = async (id, itemData) => {
    await api.put(`/your-endpoint/${id}`, itemData)
    await fetchItems()
  }

  const deleteItem = async (id) => {
    await api.delete(`/your-endpoint/${id}`)
    await fetchItems()
  }

  const filteredItems = computed(() => {
    if (!searchQuery.value) return items.value
    
    return items.value.filter(item =>
      // Your filter logic
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  return {
    items,
    loading,
    error,
    searchQuery,
    filteredItems,
    fetchItems,
    addItem,
    updateItem,
    deleteItem
  }
}
```

### 3. Replace Inline Formatting dengan Utils

**Sebelum:**
```vue
<template>
  <span>Rp {{ price.toLocaleString('id-ID') }}</span>
  <span>{{ new Date(date).toLocaleDateString('id-ID') }}</span>
</template>
```

**Sesudah:**
```vue
<script setup>
import { formatPriceWithCurrency, formatDate } from '@/utils/formatters'
</script>

<template>
  <span>{{ formatPriceWithCurrency(price) }}</span>
  <span>{{ formatDate(date) }}</span>
</template>
```

### 4. Replace Hardcoded Strings dengan Constants

**Sebelum:**
```javascript
if (status === 'active') { ... }

const statusClass = status === 'active' 
  ? 'bg-green-100 text-green-800'
  : 'bg-red-100 text-red-800'
```

**Sesudah:**
```javascript
// constants/yourFeature.js
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}

export const STATUS_CLASSES = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800'
}

// In component
import { STATUS, STATUS_CLASSES } from '@/constants/yourFeature'

if (status === STATUS.ACTIVE) { ... }
const statusClass = STATUS_CLASSES[status]
```

### 5. Extract Repeating UI Patterns

**Sebelum:**
```vue
<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-600">{{ title }}</p>
        <p class="text-3xl font-bold">{{ value }}</p>
      </div>
      <div class="bg-blue-100 p-3 rounded-full">
        <svg>...</svg>
      </div>
    </div>
  </div>
  
  <!-- Repeated 4 times with different values -->
</template>
```

**Sesudah:**
```vue
<template>
  <StatCard 
    v-for="stat in stats" 
    :key="stat.id"
    :title="stat.title"
    :value="stat.value"
  />
</template>

<script setup>
import { StatCard } from '@/components/ui'

const stats = [
  { id: 1, title: 'Total', value: '100' },
  { id: 2, title: 'Active', value: '80' },
  // ...
]
</script>
```

## 📋 Checklist Refactoring

### Persiapan
- [ ] Backup file original
- [ ] Identifikasi logika yang bisa dipisahkan
- [ ] List komponen UI yang berulang

### Composables
- [ ] Buat composable untuk CRUD operations
- [ ] Pindahkan state management ke composable
- [ ] Implementasi computed properties untuk filtering
- [ ] Export semua functions yang dibutuhkan

### Components
- [ ] Identifikasi UI patterns yang berulang
- [ ] Buat komponen reusable jika belum ada
- [ ] Replace hardcoded UI dengan components

### Constants & Utils
- [ ] Extract hardcoded strings ke constants
- [ ] Pindahkan formatting logic ke utils
- [ ] Buat enums untuk status/types

### Testing
- [ ] Test CRUD operations
- [ ] Test filtering & search
- [ ] Test alert notifications
- [ ] Test modal interactions
- [ ] Check responsive design

## 🔄 Migration Examples

### Example 1: AddTransaction.vue

**Current Issues:**
- 400+ lines
- Complex form logic
- Service calculation inline
- No separation of concerns

**Migration Steps:**

1. Create `useTransactionForm.js`:
```javascript
export function useTransactionForm() {
  const formData = ref({
    customerName: '',
    customerPhone: '',
    services: [],
    // ...
  })
  
  const selectedServices = ref([])
  
  const calculateTotal = computed(() => {
    return selectedServices.value.reduce((sum, item) => {
      return sum + (item.quantity * item.price)
    }, 0)
  })
  
  const addServiceItem = () => {
    selectedServices.value.push({
      serviceId: '',
      quantity: 0,
      subtotal: 0
    })
  }
  
  const removeServiceItem = (index) => {
    selectedServices.value.splice(index, 1)
  }
  
  return {
    formData,
    selectedServices,
    calculateTotal,
    addServiceItem,
    removeServiceItem
  }
}
```

2. Create `ServiceSelector.vue` component:
```vue
<template>
  <div class="border rounded-lg p-4">
    <select v-model="modelValue.serviceId" @change="$emit('change')">
      <option v-for="service in services" :key="service.id" :value="service.id">
        {{ service.name }}
      </option>
    </select>
    <input 
      v-model.number="modelValue.quantity" 
      type="number"
      @input="$emit('change')"
    />
  </div>
</template>

<script setup>
defineProps(['modelValue', 'services'])
defineEmits(['change'])
</script>
```

3. Refactor AddTransaction.vue:
```vue
<template>
  <ServiceSelector
    v-for="(item, index) in selectedServices"
    :key="index"
    v-model="selectedServices[index]"
    :services="services"
    @change="calculateSubtotal(index)"
  />
  
  <div class="total">
    {{ formatPriceWithCurrency(calculateTotal) }}
  </div>
</template>

<script setup>
import ServiceSelector from '@/components/ServiceSelector.vue'
import { useTransactionForm } from '@/composables/useTransactionForm'
import { useServices } from '@/composables/useServices'
import { formatPriceWithCurrency } from '@/utils/formatters'

const { services } = useServices()
const { 
  selectedServices, 
  calculateTotal,
  addServiceItem 
} = useTransactionForm()
</script>
```

### Example 2: ReportData.vue

**Current Issues:**
- Chart logic mixed with data
- Date range filtering inline
- Export logic in component

**Migration Steps:**

1. Create `useReports.js`:
```javascript
export function useReports() {
  const reports = ref([])
  const dateRange = ref({
    start: '',
    end: ''
  })
  
  const filteredReports = computed(() => {
    return reports.value.filter(report => {
      const reportDate = new Date(report.date)
      const start = new Date(dateRange.value.start)
      const end = new Date(dateRange.value.end)
      
      return reportDate >= start && reportDate <= end
    })
  })
  
  const chartData = computed(() => {
    // Transform data for chart
    return filteredReports.value.map(r => ({
      label: r.date,
      value: r.total
    }))
  })
  
  const exportToExcel = () => {
    // Export logic
  }
  
  return {
    reports,
    dateRange,
    filteredReports,
    chartData,
    exportToExcel
  }
}
```

2. Create `DateRangePicker.vue`:
```vue
<template>
  <div class="flex gap-4">
    <input 
      :value="modelValue.start"
      @input="$emit('update:modelValue', { ...modelValue, start: $event.target.value })"
      type="date"
    />
    <input 
      :value="modelValue.end"
      @input="$emit('update:modelValue', { ...modelValue, end: $event.target.value })"
      type="date"
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
```

## 🎨 Before/After Comparison

### Lines of Code
| Page | Before | After | Reduction |
|------|--------|-------|-----------|
| CustomerData | 180 | 130 | 28% |
| TransactionData | 400 | 200 | 50% |
| KelolaLayanan | 300 | 200 | 33% |

### Separation of Concerns
| Aspect | Before | After |
|--------|--------|-------|
| Logic in component | 100% | 20% |
| Reusable components | 0 | 6 |
| Composables | 1 | 6 |
| Utils | 0 | 5 |

## 🚀 Benefits Achieved

1. **Code Reusability**: 60% reduction in duplicate code
2. **Maintainability**: Single source of truth for business logic
3. **Testability**: Isolated functions easy to test
4. **Readability**: Clear separation of concerns
5. **Scalability**: Easy to add new features

## 📝 Notes

- Always backup before refactoring
- Test thoroughly after each step
- Don't change functionality, only structure
- Follow existing patterns
- Update documentation

## 🆘 Common Issues

### Issue: Component not rendering
**Solution:** Check imports and export/default syntax

### Issue: State not reactive
**Solution:** Use ref() or reactive() properly

### Issue: API calls failing
**Solution:** Verify API service is imported correctly

### Issue: Styles not applied
**Solution:** Check Tailwind class names and component props
