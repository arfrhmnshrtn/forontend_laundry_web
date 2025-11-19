<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p class="text-gray-600 mt-1">Selamat Datang ...</p>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <p class="text-gray-600 mt-4">Memuat data dashboard...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Total Order</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ totalOrders }}</p>
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
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ formatPriceWithCurrency(totalRevenue) }}</p>
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
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ totalCustomers }}</p>
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
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ pendingOrders }}</p>
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
          <div v-if="recentOrders.length > 0" class="space-y-3">
            <div
              v-for="order in recentOrders"
              :key="order.id"
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-blue-600 font-semibold text-sm">#{{ order.id }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ order.customerName }}</p>
                  <p class="text-sm text-gray-500">{{ order.services }} - {{ formatWeight(order.berat) }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-800">{{ formatPriceWithCurrency(order.totalPrice) }}</p>
                <span
                  :class="getStatusBadgeClass(order.status)"
                  class="text-xs px-2 py-1 rounded-full"
                >{{ getStatusLabel(order.status) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <p>Belum ada pesanan</p>
          </div>
          <router-link
            to="/transactions"
            class="block w-full mt-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
          >
            Lihat Semua Pesanan
          </router-link>
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
import { ref, computed, onMounted } from "vue";
import AdminLayout from "../components/AdminLayout.vue";
import api from "../services/api";
import { formatPriceWithCurrency } from "../utils/formatters";

const loading = ref(true);
const transactions = ref([]);
const customers = ref([]);

const totalOrders = computed(() => transactions.value.length);
const totalRevenue = computed(() => 
  transactions.value.reduce((sum, trx) => sum + parseFloat(trx.total_harga || 0), 0)
);
const totalCustomers = computed(() => customers.value.length);
const pendingOrders = computed(() => 
  transactions.value.filter(trx => 
    trx.status.toLowerCase() === 'proses' || 
    trx.status.toLowerCase() === 'menunggu'
  ).length
);
const recentOrders = computed(() => {
  const sorted = [...transactions.value].sort((a, b) => 
    new Date(b.tanggal_masuk) - new Date(a.tanggal_masuk)
  );
  return sorted.slice(0, 3).map(trx => {
    const services = trx.detail_layanan || [];
    const serviceNames = services.map(s => s.nama_layanan).join(", ");
    const totalBerat = services.reduce((sum, s) => sum + parseFloat(s.berat || 0), 0);
    
    return {
      id: trx.transaksi_id,
      customerName: trx.nama_pelanggan,
      services: serviceNames || "-",
      berat: totalBerat,
      totalPrice: parseFloat(trx.total_harga),
      status: trx.status.toLowerCase()
    };
  });
});

const fetchDashboardData = async () => {
  loading.value = true;
  try {
    const [transactionsRes, customersRes] = await Promise.all([
      api.get("/transaksi"),
      api.get("/pelanggan")
    ]);
    
    transactions.value = transactionsRes.data?.data || transactionsRes.data || transactionsRes;
    customers.value = customersRes || [];
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDashboardData);

const formatWeight = (weight) => {
  return weight > 0 ? `${weight} Kg` : "-";
};

const getStatusLabel = (status) => {
  const labels = {
    'proses': 'Proses',
    'selesai': 'Selesai',
    'menunggu': 'Menunggu',
    'diambil': 'Diambil'
  };
  return labels[status] || status;
};

const getStatusBadgeClass = (status) => {
  const classes = {
    'proses': 'bg-yellow-100 text-yellow-700',
    'selesai': 'bg-green-100 text-green-700',
    'menunggu': 'bg-orange-100 text-orange-700',
    'diambil': 'bg-blue-100 text-blue-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
};
</script>
