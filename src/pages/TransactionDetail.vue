<template>
  <AdminLayout>
    <div class="space-y-8">
      <!-- Header -->
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Detail Transaksi</h2>
          <p class="text-gray-500">Informasi lengkap transaksi</p>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div
          class="animate-spin h-10 w-10 mx-auto rounded-full border-2 border-gray-300 border-t-blue-500"
        ></div>
        <p class="mt-4 text-gray-600">Memuat detail transaksi...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <svg
          class="w-14 h-14 mx-auto text-red-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-lg font-semibold text-red-500">Gagal memuat data</p>
        <p class="text-gray-500 mt-1">{{ error }}</p>
      </div>

      <!-- Main Content -->
      <div
        v-else-if="transaction"
        class="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <!-- Left Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Pelanggan -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Informasi Pelanggan
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Nama Pelanggan</p>
                <p class="font-semibold text-gray-900">
                  {{ transaction.nama_pelanggan }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">No. Telepon</p>
                <p class="font-semibold text-gray-900">
                  {{ transaction.no_telepon }}
                </p>
              </div>
            </div>
          </div>

          <!-- Detail Layanan -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-gray-800">
                Detail Layanan
              </h3>

              <span
                class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {{ transaction.details?.length || 0 }} Layanan
              </span>
            </div>

            <div class="space-y-4">
              <div
                v-for="(item, index) in transaction.details"
                :key="index"
                class="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow-md transition-all"
              >
                <div class="flex justify-between">
                  <div class="space-y-1">
                    <p class="font-semibold text-gray-900">
                      {{ item.nama_layanan }}
                    </p>

                    <div class="text-sm text-gray-600 space-y-0.5">
                      <p>
                        Berat:
                        <span class="font-medium"
                          >{{ item.berat }} {{ item.satuan_harga }}</span
                        >
                      </p>
                      <p>
                        Harga:
                        <span class="font-medium"
                          >{{ formatPriceWithCurrency(item.harga) }}/{{
                            item.satuan_harga
                          }}</span
                        >
                      </p>
                    </div>
                  </div>

                  <div class="text-right">
                    <p class="text-xs text-gray-500">Subtotal</p>
                    <p class="text-lg font-bold text-blue-600">
                      {{ formatPriceWithCurrency(item.subtotal) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Catatan -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Catatan</h3>
            <p class="text-gray-700" v-if="transaction.notes">
              {{ transaction.notes }}
            </p>
            <p class="text-gray-400 text-sm italic" v-else>
              Tidak ada catatan.
            </p>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-8">
          <!-- Ringkasan -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Ringkasan Transaksi
            </h3>

            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">ID Transaksi</span>
                <span class="font-semibold">#{{ transaction.id }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Status</span>
                <StatusBadge :status="transaction.status" />
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Tanggal Masuk</span>
                <span class="font-medium">{{
                  formatDate(transaction.tanggal_masuk)
                }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Tanggal Selesai</span>
                <span class="font-medium">{{
                  formatDate(transaction.tanggal_selesai)
                }}</span>
              </div>

              <hr />

              <div class="flex justify-between items-center">
                <span class="text-gray-600">Total Harga</span>
                <span class="text-2xl font-bold text-gray-900">
                  {{ formatPriceWithCurrency(transaction.total_harga) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Informasi Pembayaran -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Informasi Pembayaran
            </h3>

            <div class="flex justify-between">
              <span class="text-gray-600">Status Pembayaran</span>
              <!-- <span class="font-semibold">{{
                transaction.pembayaran_status
              }}</span> -->
              <span
                :class="
                  transaction.pembayaran_status === 'Lunas'
                    ? 'text-green-500'
                    : 'text-red-500'
                "
              >
                {{
                  transaction.pembayaran_status === "Lunas"
                    ? "Lunas"
                    : transaction.pembayaran_status
                }}
              </span>
            </div>
          </div>

          <!-- Aksi -->
          <div class="space-y-2">
            <button
              @click="printReceipt(transaction.value)"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m10 0v1a3 3 0 01-3 3H8a3 3 0 01-3-3v-1m10 0H7"
                />
              </svg>
              Print Struk
            </button>
            
            <div class="flex gap-2">
              <button
                @click="$router.push(`/transactions/edit/${transaction.id}`)"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Edit
              </button>

              <button
                @click="handleDelete"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AdminLayout from "../components/AdminLayout.vue";
import StatusBadge from "../components/ui/StatusBadge.vue";
import api from "../services/api";
import { usePrintReceipt } from "../composables/usePrintReceipt";
import { formatDate, formatPriceWithCurrency } from "../utils/formatters";

const route = useRoute();
const router = useRouter();
const transaction = ref(null);
const loading = ref(false);
const error = ref(null);
const { printReceipt } = usePrintReceipt();

const fetchTransactionDetail = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(
      `http://localhost:5000/api/transaksi/${route.params.id}`
    );
    const trx = await response.json();

    console.log(trx.data.details);
    transaction.value = trx.data;
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching transaction detail:", err);
  } finally {
    loading.value = false;
  }
};

const calculateTotalPrice = () => {
  if (!transaction.value?.details) return 0;
  return transaction.value.details.reduce((total, item) => {
    return total + parseFloat(item.subtotal || 0);
  }, 0);
};

const handleDelete = async () => {
  if (
    !confirm(
      `Apakah Anda yakin ingin menghapus transaksi #${transaction.value.id}?`
    )
  ) {
    return;
  }

  try {
    await api.delete(`/transaksi/${transaction.value.id}`);
    alert("Transaksi berhasil dihapus");
    router.push("/transactions");
  } catch (err) {
    alert("Gagal menghapus transaksi: " + err.message);
  }
};

onMounted(fetchTransactionDetail);
</script>
