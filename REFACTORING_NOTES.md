# Refactoring Notes

## Struktur Folder Baru

```
src/
├── assets/           # Asset statis (gambar, font, dll)
├── components/       # Komponen Vue
│   ├── ui/          # Komponen UI reusable
│   │   ├── AlertNotification.vue
│   │   ├── BaseModal.vue
│   │   ├── EmptyState.vue
│   │   ├── SearchInput.vue
│   │   ├── StatCard.vue
│   │   └── StatusBadge.vue
│   ├── AdminHeader.vue
│   ├── AdminLayout.vue
│   └── AdminSidebar.vue
├── composables/      # Vue Composables (logika reusable)
│   ├── useAlert.js
│   ├── useCustomers.js
│   ├── useModal.js
│   ├── useServices.js
│   ├── useServicesApi.js
│   └── useTransactions.js
├── constants/        # Konstanta dan enum
│   └── index.js
├── pages/           # Halaman/Views
│   ├── AddTransaction.vue
│   ├── AdminDashboard.vue
│   ├── CustomerData.vue (refactored)
│   ├── KelolaLayanan.vue (refactored)
│   ├── Login.vue
│   ├── ReportData.vue
│   ├── Settings.vue
│   └── TransactionData.vue (refactored)
├── router/          # Vue Router
│   └── index.js
├── services/        # API Service Layer
│   └── api.js
└── utils/           # Utility functions
    └── formatters.js
```

## Perubahan Utama

### 1. **Composables** (Logika Bisnis Terpusat)
- `useCustomers.js` - CRUD pelanggan
- `useTransactions.js` - CRUD transaksi
- `useServicesApi.js` - CRUD layanan
- `useAlert.js` - Alert notification
- `useModal.js` - Modal state management

**Manfaat:**
- Logika bisnis terpisah dari UI
- Mudah di-test
- Reusable di berbagai komponen

### 2. **Komponen UI Reusable**
- `AlertNotification.vue` - Notifikasi toast
- `BaseModal.vue` - Modal dialog
- `EmptyState.vue` - State kosong
- `SearchInput.vue` - Input pencarian
- `StatCard.vue` - Kartu statistik
- `StatusBadge.vue` - Badge status

**Manfaat:**
- DRY (Don't Repeat Yourself)
- Konsistensi UI
- Mudah maintenance

### 3. **API Service Layer**
File: `services/api.js`

Menyediakan satu titik akses untuk semua API call:
```javascript
import api from '../services/api';

// GET request
const data = await api.get('/pelanggan');

// POST request
await api.post('/pelanggan', { nama: 'John', no_telp: '08123456789' });

// PUT request
await api.put('/pelanggan/1', { nama: 'John Updated' });

// DELETE request
await api.delete('/pelanggan/1');
```

**Manfaat:**
- Error handling terpusat
- Mudah menambahkan interceptor (auth, logging)
- Base URL terpusat

### 4. **Constants & Enums**
File: `constants/index.js`

```javascript
import { TRANSACTION_STATUS, STATUS_LABELS, STATUS_CLASSES } from '../constants';
```

**Manfaat:**
- Menghindari typo
- Mudah maintenance
- Type safety (jika menggunakan TypeScript)

### 5. **Utils/Formatters**
File: `utils/formatters.js`

```javascript
import { formatPrice, formatDate, getInitials } from '../utils/formatters';
```

**Manfaat:**
- Formatting konsisten
- Reusable
- Mudah di-test

## Cara Menggunakan Composables

### Contoh: useCustomers

```vue
<script setup>
import { useCustomers } from '../composables/useCustomers';

const {
  customers,           // ref: daftar pelanggan
  loading,            // ref: loading state
  error,              // ref: error message
  searchQuery,        // ref: query pencarian
  filteredCustomers,  // computed: hasil filter
  fetchCustomers,     // function: fetch data
  addCustomer,        // function: tambah pelanggan
  updateCustomer,     // function: update pelanggan
  deleteCustomer      // function: hapus pelanggan
} = useCustomers();

// Fetch data saat mounted
onMounted(fetchCustomers);

// Tambah pelanggan
await addCustomer({ nama: 'John', no_telp: '08123456789' });
</script>
```

## File Backup

File asli yang sudah di-backup:
- `CustomerData.vue.backup`
- `TransactionData.vue.backup`
- `KelolaLayanan.vue.backup`

## Best Practices yang Diterapkan

1. **Separation of Concerns**
   - UI components terpisah dari logika bisnis
   - API calls terpusat di service layer

2. **Composition API**
   - Menggunakan Vue 3 Composition API
   - Logika reusable melalui composables

3. **Single Responsibility Principle**
   - Setiap function/component punya satu tanggung jawab

4. **DRY (Don't Repeat Yourself)**
   - Komponen UI reusable
   - Utils functions untuk operasi umum

5. **Consistent Naming**
   - Composables: `use{Name}`
   - Components: PascalCase
   - Files: camelCase atau PascalCase

## Next Steps (Opsional)

1. **TypeScript Migration**
   - Tambahkan type safety
   - Better IDE support

2. **Unit Testing**
   - Test composables
   - Test utils functions

3. **Pinia State Management**
   - Untuk state global yang kompleks
   - Alternative dari Vuex

4. **Form Validation**
   - Menggunakan VeeValidate atau Zod
   - Validasi konsisten

5. **Error Boundary**
   - Global error handling
   - User-friendly error messages
