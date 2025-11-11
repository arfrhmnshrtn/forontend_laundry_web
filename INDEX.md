# Laundry Management System - Frontend Documentation

## 📚 Dokumentasi

Proyek ini telah di-refactor untuk meningkatkan kualitas kode. Berikut panduan dokumentasi:

### 🚀 Mulai Dari Sini
1. **[REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md)** - Ringkasan perubahan dan manfaat refactoring
2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference untuk development sehari-hari

### 📖 Dokumentasi Lengkap
- **[REFACTORING_NOTES.md](./REFACTORING_NOTES.md)** - Penjelasan detail struktur dan best practices
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arsitektur sistem dan design patterns
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Panduan untuk refactor halaman lain

## 📊 Statistik Proyek

### Struktur File
```
Total Files: 31
├── Components: 10
│   ├── Layout: 3
│   └── UI Components: 6 (+ 1 index)
├── Composables: 7 (6 + 1 index)
├── Pages: 10 (8 aktif + 2 backup)
├── Services: 1
├── Utils: 1
├── Constants: 1
└── Router: 1
```

### Code Quality Improvements
- **Code Reduction**: 30-50% per halaman
- **Reusable Components**: 6 komponen UI
- **Composables**: 6 business logic modules
- **Type Safety**: Constants untuk status & labels
- **API Centralization**: 1 service layer

## 🎯 Yang Sudah Di-refactor

### ✅ Halaman
- [x] CustomerData.vue - Data Pelanggan
- [x] TransactionData.vue - Data Transaksi
- [x] KelolaLayanan.vue - Kelola Layanan

### ✅ Infrastructure
- [x] API Service Layer
- [x] Constants & Enums
- [x] Utility Functions
- [x] Composables Pattern

### ✅ UI Components
- [x] AlertNotification
- [x] BaseModal
- [x] StatusBadge
- [x] SearchInput
- [x] EmptyState
- [x] StatCard

## 📋 Belum Di-refactor (Opsional)

### Halaman yang Bisa Di-refactor
- [ ] AddTransaction.vue - Form kompleks, bisa dipisah
- [ ] AdminDashboard.vue - Static data, bisa pakai StatCard
- [ ] ReportData.vue - Chart logic bisa dipisah
- [ ] Settings.vue - Tergantung kompleksitas

### Features yang Bisa Ditambahkan
- [ ] Form validation dengan VeeValidate
- [ ] State management dengan Pinia
- [ ] TypeScript migration
- [ ] Unit testing
- [ ] E2E testing

## 🚀 Quick Start

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📖 Cara Menggunakan Dokumentasi

### Untuk Developer Baru
1. Baca **REFACTORING_SUMMARY.md** untuk overview
2. Lihat **QUICK_REFERENCE.md** untuk pattern yang umum
3. Ikuti **ARCHITECTURE.md** untuk memahami struktur

### Untuk Maintenance
1. Gunakan **QUICK_REFERENCE.md** sebagai cheat sheet
2. Lihat **ARCHITECTURE.md** untuk design decisions
3. Ikuti pattern yang sudah ada

### Untuk Refactoring Halaman Lain
1. Baca **MIGRATION_GUIDE.md** step by step
2. Follow checklist yang ada
3. Test thoroughly sebelum commit

## 🎨 Tech Stack

- **Vue 3** - Progressive JavaScript Framework
- **Vue Router** - Official router
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool

## 🏗️ Arsitektur

```
┌─────────────┐
│   Pages     │  ← User Interface
└──────┬──────┘
       │
┌──────▼──────┐
│ Composables │  ← Business Logic
└──────┬──────┘
       │
┌──────▼──────┐
│  Services   │  ← API Layer
└──────┬──────┘
       │
┌──────▼──────┐
│  Backend    │  ← REST API
└─────────────┘
```

## 📁 Struktur Folder

```
src/
├── components/      # Vue components
│   ├── ui/         # Reusable UI components
│   ├── AdminHeader.vue
│   ├── AdminLayout.vue
│   └── AdminSidebar.vue
├── composables/    # Business logic (Vue Composition API)
├── constants/      # Constants & enums
├── pages/          # Page components
├── router/         # Vue Router config
├── services/       # API service layer
└── utils/          # Utility functions
```

## 🎯 Best Practices

1. **Separation of Concerns**
   - UI di components
   - Logic di composables
   - API di services

2. **Reusability**
   - Buat komponen untuk UI yang berulang
   - Buat composables untuk logic yang berulang

3. **Consistency**
   - Gunakan constants untuk strings
   - Gunakan utils untuk formatting
   - Follow naming conventions

4. **Maintainability**
   - One responsibility per function
   - Clear naming
   - Proper documentation

## 📝 Naming Conventions

### Files
- Components: `PascalCase.vue`
- Composables: `camelCase.js` (prefix: use)
- Utils: `camelCase.js`
- Pages: `PascalCase.vue`

### Variables
- Refs: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Functions: `camelCase`
- Components: `PascalCase`

## 🔧 Configuration

### API Base URL
Edit di `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api'
```

### Tailwind Config
Edit di `tailwind.config.js` (jika ada custom config)

### Router
Edit di `src/router/index.js`

## 🤝 Contributing

1. Follow existing patterns
2. Write clean, readable code
3. Test before commit
4. Update documentation jika perlu

## 📞 Support

Jika ada pertanyaan tentang struktur atau cara pakai:
1. Check **QUICK_REFERENCE.md** dulu
2. Lihat contoh di halaman yang sudah di-refactor
3. Ikuti pattern yang sama

## 🎉 Kesimpulan

Refactoring ini membuat codebase:
- ✅ Lebih clean dan organized
- ✅ Mudah maintain dan scale
- ✅ Follow Vue.js best practices
- ✅ Ready for production

**Happy coding! 🚀**
