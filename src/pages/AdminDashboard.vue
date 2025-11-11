<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p class="text-gray-600 mt-1">Selamat Datang ...</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Total Order</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">124</p>
              <p class="text-sm text-green-600 mt-2">+12% dari bulan lalu</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Pendapatan</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">Rp. 500.000</p>
              <p class="text-sm text-green-600 mt-2">+8% dari bulan lalu</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg
                class="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Pelanggan</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">86</p>
              <p class="text-sm text-green-600 mt-2">+15% dari bulan lalu</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <svg
                class="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Pesanan Tertunda</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">18</p>
              <p class="text-sm text-orange-600 mt-2">Membutuhkan Perhatian</p>
            </div>
            <div class="bg-orange-100 p-3 rounded-full">
              <svg
                class="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Pesanan Terbaru
          </h3>
          <div class="space-y-3">
            <div
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-blue-600 font-semibold text-sm">#124</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Jon</p>
                  <p class="text-sm text-gray-500">Cuci & Setrika - 5kg</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-800">Rp.45.000</p>
                <span
                  class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                  >Proses</span
                >
              </div>
            </div>

            <div
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-blue-600 font-semibold text-sm">#123</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Jane Smith</p>
                  <p class="text-sm text-gray-500">Cuci Kering - 3 items</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-800">Rp.15.000</p>
                <span
                  class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                  >Selesai</span
                >
              </div>
            </div>

            <div
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-blue-600 font-semibold text-sm">#122</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Bob Wilson</p>
                  <p class="text-sm text-gray-500">Cuci Express - 8kg</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-800">Rp.35.000</p>
                <span
                  class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >Sedang Berlangsung</span
                >
              </div>
            </div>
          </div>
          <button
            class="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
          >
            Lihat Semua Pesanan
          </button>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Tindakan Cepat
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <router-link
              to="/transactions/add"
              class="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <svg
                class="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span class="text-sm font-medium text-gray-700">Order Baru</span>
            </router-link>

            <router-link
              to="/customers/add"
              class="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <svg
                class="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span class="text-sm font-medium text-gray-700"
                >Tambah Pelanggan</span
              >
            </router-link>

            <button
              class="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <svg
                class="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span class="text-sm font-medium text-gray-700"
                >Lihat Laporan</span
              >
            </button>

            <button
              class="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <svg
                class="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="text-sm font-medium text-gray-700">Pengaturan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "../components/AdminLayout.vue";
</script>
