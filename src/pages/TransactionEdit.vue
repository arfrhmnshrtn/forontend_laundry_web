<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="text-gray-600 hover:text-gray-800 transition-colors"
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
          <h2 class="text-2xl font-bold text-gray-800">Edit Transaksi</h2>
          <p class="text-gray-600 mt-1">
            Edit data transaksi #{{ transactionId }}
          </p>
        </div>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <p class="text-gray-600 mt-4">Memuat data transaksi...</p>
      </div>

      <div v-else class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="updateTransaction" class="space-y-6">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Informasi Pelanggan
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pelanggan
                </label>
                <input
                  :value="formData.customerName"
                  type="text"
                  readonly
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  No. Telepon
                </label>
                <input
                  :value="formData.customerPhone"
                  type="tel"
                  readonly
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Detail Layanan
            </h3>
            <div class="space-y-3">
              <div
                v-for="detail in formData.detailLayanan"
                :key="detail.id"
                class="border border-gray-300 rounded-lg p-4 bg-gray-50"
              >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Layanan
                    </label>
                    <input
                      :value="detail.namaLayanan"
                      type="text"
                      readonly
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{
                        detail.tipeLayanan === "Kiloan"
                          ? "Berat (kg)"
                          : "Jumlah (pcs)"
                      }}
                    </label>
                    <input
                      :value="detail.berat"
                      type="text"
                      readonly
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Subtotal
                    </label>
                    <input
                      :value="`Rp ${formatPrice(detail.subtotal)}`"
                      type="text"
                      readonly
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Total Harga
              </label>
              <input
                :value="`Rp ${formatPrice(formData.totalPrice)}`"
                type="text"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed font-bold text-lg"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                v-model="formData.status"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Antrian</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Status Pembayaran *
              </label>
              <select
                v-model="formData.paymentMethod"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Belum Bayar">Belum Bayar</option>
                <!-- <option value="Bayar Awal">Bayar Awal</option> -->
                <option value="Lunas">Lunas</option>
              </select>
            </div>
          </div>

          <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Masuk
              </label>
              <input
                :value="formData.dateIn"
                type="date"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Selesai
              </label>
              <input
                :value="formData.dateOut"
                type="date"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div> -->

          <!-- <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Catatan
            </label>
            <textarea
              v-model="formData.notes"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Catatan tambahan (opsional)"
            ></textarea>
          </div> -->

          <div class="flex gap-3 pt-4 border-t">
            <button
              type="button"
              @click="$router.back()"
              class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ submitting ? "Menyimpan..." : "Simpan Perubahan" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AdminLayout from "../components/AdminLayout.vue";
import api from "../services/api";

const route = useRoute();
const router = useRouter();
const transactionId = route.params.id;

const detailLayanan = ref([]);

const loading = ref(false);
const submitting = ref(false);
const formData = ref({
  customerName: "",
  customerPhone: "",
  detailLayanan: [],
  totalPrice: 0,
  paymentMethod: "",
  status: "pending",
  dateIn: "",
  dateOut: "",
  notes: "",
});

const fetchTransactionDetail = async () => {
  loading.value = true;
  try {
    const response = await api.get(`/transaksi/${transactionId}`);
    const trx = response.data?.data || response.data || response;

    const services = trx.details || [];
    console.log(services);
    formData.value = {
      customerName: trx.nama_pelanggan,
      customerPhone: trx.no_telepon || "-",
      totalPrice: parseFloat(trx.total_harga),
      dateIn: trx.tanggal_masuk,
      dateOut: trx.tanggal_selesai,
      status: trx.status.toLowerCase(),
      paymentMethod: trx.pembayaran_status,
      detailLayanan: services.map((s) => ({
        id: s.detail_id,
        namaLayanan: s.nama_layanan,
        tipeLayanan: s.tipe_layanan,
        durasi: s.durasi,
        berat: parseFloat(s.berat),
        subtotal: parseFloat(s.subtotal),
      })),
      notes: trx.catatan || "",
    };
    // console.log(formData.value.detailLayanan.details);
  } catch (err) {
    alert("Gagal memuat data transaksi: " + err.message);
    router.back();
  } finally {
    loading.value = false;
  }
};

const updateTransaction = async () => {
  submitting.value = true;
  try {
    const updateData = {
      status: formData.value.status,
      pembayaran_status: formData.value.paymentMethod,
    };

    await api.put(`/transaksi/${transactionId}`, updateData);

    alert("Transaksi berhasil diupdate");
    router.push("/transactions");
  } catch (err) {
    alert("Gagal mengupdate transaksi: " + err.message);
  } finally {
    submitting.value = false;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

onMounted(() => {
  fetchTransactionDetail();
});
</script>
