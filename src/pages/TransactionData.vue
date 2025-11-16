<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Data Transaksi</h2>
          <p class="text-gray-600 mt-1">Kelola transaksi laundry</p>
        </div>
        <button
          @click="$router.push('/transactions/add')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg
            class="w-5 h-5"
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
          Tambah Transaksi
        </button>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <SearchInput
                v-model="searchQuery"
                placeholder="Cari ID transaksi atau nama pelanggan..."
              />
            </div>
            <select
              v-model="statusFilter"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Semua Status</option>
              <option
                v-for="(label, key) in STATUS_LABELS"
                :key="key"
                :value="key"
              >
                {{ label }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
          ></div>
          <p class="text-gray-600 mt-4">Memuat data transaksi...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <svg
            class="w-16 h-16 mx-auto text-red-400 mb-4"
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
          <p class="text-lg font-medium text-red-600">Gagal memuat data</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
          <button
            @click="fetchTransactions"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Pelanggan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Layanan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Total Harga
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Tanggal
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="transaction in filteredTransactions"
                :key="transaction.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  #{{ transaction.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
                    >
                      <span class="text-purple-600 font-semibold text-sm">
                        {{ getInitials(transaction.customerName) }}
                      </span>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">
                        {{ transaction.customerName }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ transaction.customerPhone }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    v-if="
                      transaction.detailLayanan &&
                      transaction.detailLayanan.length > 0
                    "
                    class="space-y-1.5"
                  >
                    <div
                      v-for="detail in transaction.detailLayanan"
                      :key="detail.id"
                      class="flex items-center justify-between border-b border-gray-100 py-2 last:border-none"
                    >
                      <div class="flex flex-col">
                        <span class="font-semibold text-gray-900 text-sm">
                          {{ detail.namaLayanan }}
                        </span>
                        <div
                          class="flex items-center text-xs text-gray-500 mt-0.5 space-x-2"
                        >
                          <span>{{
                            formatWeight(detail.berat, detail.tipeLayanan)
                          }}</span>
                          <span class="text-gray-300">•</span>
                          <span>{{ formatDuration(detail.durasi) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-sm text-gray-500">-</p>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                >
                  {{ formatPriceWithCurrency(transaction.totalPrice) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="space-y-1">
                    <div class="flex items-center gap-1 text-xs">
                      <svg
                        class="w-3 h-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <span>{{ formatDate(transaction.dateIn) }}</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs">
                      <svg
                        class="w-3 h-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{{ formatDate(transaction.dateOut) }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <StatusBadge :status="transaction.status" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-2">
                    <button
                      @click="handleView(transaction)"
                      class="text-green-600 hover:text-green-800 transition-colors"
                      title="Lihat Detail"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="handleEdit(transaction)"
                      class="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="handleDelete(transaction)"
                      class="text-red-600 hover:text-red-800 transition-colors"
                      title="Hapus"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <EmptyState
            v-if="filteredTransactions.length === 0"
            title="Tidak ada data transaksi"
            :description="
              searchQuery
                ? 'Coba kata kunci pencarian lain'
                : 'Mulai dengan menambahkan transaksi baru'
            "
          />
        </div>
      </div>
    </div>

    <!-- Modal Edit Transaksi -->
    <BaseModal
      :show="showEditModal"
      title="Edit Transaksi"
      size="xl"
      @close="closeEditModal"
    >
      <form @submit.prevent="saveEditTransaction" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Pelanggan
            </label>
            <input
              v-model="editForm.customerName"
              type="text"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              No. Telepon
            </label>
            <input
              v-model="editForm.customerPhone"
              type="tel"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700">
              Jenis Layanan *
            </label>
            <button
              type="button"
              @click="addEditServiceItem"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Layanan
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="(item, index) in editForm.services"
              :key="index"
              class="border border-gray-300 rounded-lg p-4 relative"
            >
              <button
                v-if="editForm.services.length > 1"
                type="button"
                @click="removeEditServiceItem(index)"
                class="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="Hapus layanan"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Layanan *
                  </label>
                  <select
                    v-model="item.serviceId"
                    @change="onEditServiceItemChange(index)"
                    required
                    :disabled="loadingServices"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {{
                        loadingServices
                          ? "Memuat layanan..."
                          : "Pilih layanan"
                      }}
                    </option>
                    <optgroup
                      label="Layanan Kiloan"
                      v-if="kiloServices.length > 0"
                    >
                      <option
                        v-for="service in kiloServices"
                        :key="service.id"
                        :value="service.id"
                      >
                        {{ service.nama_layanan }} - Rp
                        {{ formatPrice(service.harga) }}/{{
                          service.satuan_harga
                        }}
                        ({{ formatDuration(service.durasi) }})
                      </option>
                    </optgroup>
                    <optgroup
                      label="Layanan Satuan"
                      v-if="pieceServices.length > 0"
                    >
                      <option
                        v-for="service in pieceServices"
                        :key="service.id"
                        :value="service.id"
                      >
                        {{ service.nama_layanan }} - Rp
                        {{ formatPrice(service.harga) }}/{{
                          service.satuan_harga
                        }}
                        ({{ formatDuration(service.durasi) }})
                      </option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{
                      item.service?.tipe_layanan?.toLowerCase() === "kiloan"
                        ? "Berat (kg)"
                        : "Jumlah (pcs)"
                    }}
                    *
                  </label>
                  <input
                    v-model.number="item.quantity"
                    type="number"
                    required
                    min="0"
                    :step="
                      item.service?.tipe_layanan?.toLowerCase() === 'kiloan'
                        ? '0.1'
                        : '1'
                    "
                    @input="calculateEditServiceItemTotal(index)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Harga per {{ item.service?.satuan_harga || "unit" }}
                  </label>
                  <input
                    :value="
                      item.service
                        ? `Rp ${formatPrice(item.service.harga)}`
                        : ''
                    "
                    type="text"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Subtotal
                  </label>
                  <input
                    :value="`Rp ${formatPrice(item.subtotal)}`"
                    type="text"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 cursor-not-allowed font-semibold text-blue-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Total Harga
              </label>
              <input
                :value="calculateEditTotal"
                type="text"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed font-bold text-lg text-blue-900"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Metode Pembayaran *
              </label>
              <div class="space-y-3">
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="editForm.paymentMethod"
                    type="radio"
                    value="prepaid"
                    required
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span class="ml-3 text-sm font-medium text-gray-900">
                    Bayar di Awal
                  </span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="editForm.paymentMethod"
                    type="radio"
                    value="postpaid"
                    required
                    class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span class="ml-3 text-sm font-medium text-gray-900">
                    Bayar di Akhir
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              v-model="editForm.status"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="process">Proses</option>
              <option value="done">Selesai</option>
              <option value="delivered">Terkirim</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Masuk *
            </label>
            <input
              v-model="editForm.dateIn"
              type="date"
              required
              @change="calculateEditDateOut"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Selesai
              <span
                v-if="getEditMaxDuration() > 0"
                class="text-xs text-gray-500 font-normal"
              >
                ({{ formatDuration(getEditMaxDuration()) }} dari tanggal masuk)
              </span>
            </label>
            <input
              v-model="editForm.dateOut"
              type="date"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Catatan
          </label>
          <textarea
            v-model="editForm.notes"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Catatan tambahan (opsional)"
          ></textarea>
        </div>

        <div class="flex gap-3 pt-4 border-t">
          <button
            type="button"
            @click="closeEditModal"
            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="savingEdit"
            class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {{ savingEdit ? "Menyimpan..." : "Simpan Perubahan" }}
          </button>
        </div>
      </form>
    </BaseModal>
  </AdminLayout>
</template>

<script setup>
import { onMounted } from "vue";
import AdminLayout from "../components/AdminLayout.vue";
import SearchInput from "../components/ui/SearchInput.vue";
import StatusBadge from "../components/ui/StatusBadge.vue";
import EmptyState from "../components/ui/EmptyState.vue";
import { useTransactions } from "../composables/useTransactions";
import {
  formatDate,
  formatPriceWithCurrency,
  getInitials,
} from "../utils/formatters";
import { STATUS_LABELS } from "../constants";

const {
  filteredTransactions,
  searchQuery,
  statusFilter,
  loading,
  error,
  fetchTransactions,
} = useTransactions();

onMounted(fetchTransactions);

const handleView = (transaction) => {
  alert("Fitur detail akan segera tersedia");
};

const handleDelete = (transaction) => {
  if (
    confirm(`Apakah Anda yakin ingin menghapus transaksi #${transaction.id}?`)
  ) {
    alert("Fitur hapus akan segera tersedia");
  }
};

const formatWeight = (weight, type) => {
  if (type.toLowerCase() === "kiloan") {
    return `${weight} Kg`;
  } else if (type.toLowerCase() === "satuan") {
    return `${weight} Pcs`;
  }
  return `${weight}`;
};

const formatDuration = (hours) => {
  if (hours < 24) {
    return `${hours} jam`;
  }
  const days = Math.floor(hours / 24);
  return `${days} hari`;
};
</script>
