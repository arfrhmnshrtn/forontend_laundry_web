<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Settings</h2>
        <p class="text-gray-600 mt-1">Kelola pengaturan aplikasi dan profil Anda</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow">
            <nav class="flex flex-col">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-4',
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-blue-600 font-medium'
                    : 'text-gray-700 border-transparent hover:bg-gray-50'
                ]"
              >
                <component :is="tab.icon" class="w-5 h-5" />
                <span>{{ tab.label }}</span>
              </button>
            </nav>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow p-6">
            <div v-if="activeTab === 'profile'">
              <h3 class="text-xl font-semibold text-gray-800 mb-6">Profil Pengguna</h3>
              
              <div class="space-y-6">
                <div class="flex items-center gap-6">
                  <div class="relative">
                    <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <button class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800">Foto Profil</h4>
                    <p class="text-sm text-gray-600">JPG, GIF atau PNG. Maksimal 2MB</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      v-model="profileData.fullName"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      v-model="profileData.username"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan username"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      v-model="profileData.email"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan email"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      v-model="profileData.phone"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                    <textarea
                      v-model="profileData.address"
                      rows="3"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan alamat lengkap"
                    ></textarea>
                  </div>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t">
                  <button class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Batal
                  </button>
                  <button class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'security'">
              <h3 class="text-xl font-semibold text-gray-800 mb-6">Keamanan</h3>
              
              <div class="space-y-6">
                <div>
                  <h4 class="font-medium text-gray-800 mb-4">Ubah Password</h4>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Password Lama</label>
                      <input
                        type="password"
                        v-model="securityData.currentPassword"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan password lama"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                      <input
                        type="password"
                        v-model="securityData.newPassword"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan password baru"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
                      <input
                        type="password"
                        v-model="securityData.confirmPassword"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Konfirmasi password baru"
                      />
                    </div>
                  </div>
                </div>

                <div class="pt-4 border-t">
                  <h4 class="font-medium text-gray-800 mb-4">Autentikasi Dua Faktor</h4>
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-medium text-gray-800">Status 2FA</p>
                      <p class="text-sm text-gray-600">Tingkatkan keamanan akun Anda</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="securityData.twoFactorEnabled" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t">
                  <button class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Batal
                  </button>
                  <button class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'notifications'">
              <h3 class="text-xl font-semibold text-gray-800 mb-6">Notifikasi</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-800">Notifikasi Email</p>
                    <p class="text-sm text-gray-600">Terima notifikasi melalui email</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationData.emailNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-800">Notifikasi Push</p>
                    <p class="text-sm text-gray-600">Terima notifikasi push di browser</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationData.pushNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-800">Notifikasi Order Baru</p>
                    <p class="text-sm text-gray-600">Notifikasi saat ada order baru masuk</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationData.newOrderNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-800">Notifikasi Pembayaran</p>
                    <p class="text-sm text-gray-600">Notifikasi saat ada pembayaran diterima</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationData.paymentNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-800">Notifikasi Pelanggan Baru</p>
                    <p class="text-sm text-gray-600">Notifikasi saat ada pelanggan baru mendaftar</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationData.newCustomerNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t">
                  <button class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Batal
                  </button>
                  <button class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'system'">
              <h3 class="text-xl font-semibold text-gray-800 mb-6">Pengaturan Sistem</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nama Laundry</label>
                  <input
                    type="text"
                    v-model="systemData.businessName"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama laundry"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Mata Uang</label>
                    <select
                      v-model="systemData.currency"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="IDR">IDR - Rupiah</option>
                      <option value="USD">USD - Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Zona Waktu</label>
                    <select
                      v-model="systemData.timezone"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Asia/Jakarta">WIB - Jakarta</option>
                      <option value="Asia/Makassar">WITA - Makassar</option>
                      <option value="Asia/Jayapura">WIT - Jayapura</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Format Tanggal</label>
                  <select
                    v-model="systemData.dateFormat"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div class="pt-4 border-t">
                  <h4 class="font-medium text-gray-800 mb-4">Fitur Tambahan</h4>
                  
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p class="font-medium text-gray-800">Backup Otomatis</p>
                        <p class="text-sm text-gray-600">Backup data setiap hari</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="systemData.autoBackup" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p class="font-medium text-gray-800">Mode Maintenance</p>
                        <p class="text-sm text-gray-600">Nonaktifkan sementara sistem</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="systemData.maintenanceMode" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t">
                  <button class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Batal
                  </button>
                  <button class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';

const activeTab = ref('profile');

const tabs = [
  {
    id: 'profile',
    label: 'Profil',
    icon: 'UserIcon'
  },
  {
    id: 'security',
    label: 'Keamanan',
    icon: 'ShieldIcon'
  },
  {
    id: 'notifications',
    label: 'Notifikasi',
    icon: 'BellIcon'
  },
  {
    id: 'system',
    label: 'Sistem',
    icon: 'CogIcon'
  }
];

const profileData = ref({
  fullName: 'Admin Laundry',
  username: 'admin',
  email: 'admin@laundry.com',
  phone: '08123456789',
  address: 'Jl. Contoh No. 123, Jakarta'
});

const securityData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: false
});

const notificationData = ref({
  emailNotifications: true,
  pushNotifications: true,
  newOrderNotifications: true,
  paymentNotifications: true,
  newCustomerNotifications: false
});

const systemData = ref({
  businessName: 'Laundry Express',
  currency: 'IDR',
  timezone: 'Asia/Jakarta',
  dateFormat: 'DD/MM/YYYY',
  autoBackup: true,
  maintenanceMode: false
});

const UserIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  `
};

const ShieldIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `
};

const BellIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  `
};

const CogIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `
};
</script>
