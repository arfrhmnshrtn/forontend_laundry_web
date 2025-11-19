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
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                Detail Layanan
              </h3>
              <button
                type="button"
                @click="addNewService"
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
                Tambah Layanan Baru
              </button>
            </div>
            <div class="space-y-3">
              <div
                v-for="detail in formData.detailLayanan"
                :key="detail.id"
                class="border border-gray-300 rounded-lg p-4 bg-gray-50 relative"
              >
                <button
                  v-if="formData.detailLayanan.length > 1 || newServices.length > 0"
                  type="button"
                  @click="removeExistingService(detail.id)"
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

              <div
                v-for="(item, index) in newServices"
                :key="'new-' + index"
                class="border border-blue-300 rounded-lg p-4 bg-blue-50 relative"
              >
                <button
                  type="button"
                  @click="removeNewService(index)"
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
                      @change="onNewServiceChange(index)"
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
                          ({{
                            service.durasi > 24
                              ? Math.floor(service.durasi / 24) + " hari"
                              : service.durasi + " jam"
                          }})
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
                          ({{ service.durasi }} hari)
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
                      @input="calculateNewServiceTotal(index)"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      :placeholder="
                        item.service?.tipe_layanan?.toLowerCase() === 'kiloan'
                          ? '0.0'
                          : '0'
                      "
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Subtotal
                    </label>
                    <input
                      :value="`Rp ${formatPrice(item.subtotal)}`"
                      type="text"
                      readonly
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-100 cursor-not-allowed font-semibold text-blue-900"
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
                :value="`Rp ${formatPrice(totalPrice)}`"
                type="text"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed font-bold text-lg"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Metode Pembayaran
              </label>
              <input
                :value="formData.paymentMethod"
                type="text"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
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
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Catatan
            </label>
            <textarea
              v-model="formData.notes"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Catatan tambahan (opsional)"
            ></textarea>
          </div>

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
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AdminLayout from "../components/AdminLayout.vue";
import api from "../services/api";
import { useServices } from "../composables/useServices";

const route = useRoute();
const router = useRouter();
const transactionId = route.params.id;

const {
  kiloServices,
  pieceServices,
  getServiceById,
  loading: loadingServices,
  fetchServices,
} = useServices();

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

const newServices = ref([]);
const deletedServiceIds = ref([]);

const totalPrice = computed(() => {
  const existingTotal = formData.value.detailLayanan.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );
  const newTotal = newServices.value.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );
  return existingTotal + newTotal;
});

const fetchTransactionDetail = async () => {
  loading.value = true;
  try {
    const response = await api.get(`/transaksi/${transactionId}`);
    const trx = response.data?.data || response.data || response;

    const services = trx.detail_layanan || [];
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
  } catch (err) {
    alert("Gagal memuat data transaksi: " + err.message);
    router.back();
  } finally {
    loading.value = false;
  }
};

const addNewService = () => {
  newServices.value.push({
    serviceId: "",
    service: null,
    quantity: 0,
    subtotal: 0,
  });
};

const removeNewService = (index) => {
  newServices.value.splice(index, 1);
};

const removeExistingService = (detailId) => {
  if (formData.value.detailLayanan.length === 1 && newServices.value.length === 0) {
    alert("Transaksi harus memiliki minimal 1 layanan");
    return;
  }

  if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
    return;
  }

  const index = formData.value.detailLayanan.findIndex(
    (item) => item.id === detailId
  );
  
  if (index !== -1) {
    deletedServiceIds.value.push(detailId);
    formData.value.detailLayanan.splice(index, 1);
  }
};

const onNewServiceChange = (index) => {
  const item = newServices.value[index];
  if (item.serviceId) {
    item.service = getServiceById(Number(item.serviceId));
    calculateNewServiceTotal(index);
  } else {
    item.service = null;
    item.subtotal = 0;
  }
};

const calculateNewServiceTotal = (index) => {
  const item = newServices.value[index];
  if (item.service && item.quantity > 0) {
    item.subtotal = item.quantity * parseFloat(item.service.harga);
  } else {
    item.subtotal = 0;
  }
};

const updateTransaction = async () => {
  if (formData.value.detailLayanan.length === 0 && newServices.value.length === 0) {
    alert("Transaksi harus memiliki minimal 1 layanan");
    return;
  }

  submitting.value = true;
  try {
    const updateData = {
      status: formData.value.status,
      catatan: formData.value.notes,
    };

    if (newServices.value.length > 0) {
      const newDetail = newServices.value
        .filter((item) => item.serviceId && item.quantity > 0)
        .map((item) => ({
          layanan_id: item.serviceId,
          berat: item.quantity,
        }));

      if (newDetail.length > 0) {
        updateData.detail_baru = newDetail;
      }
    }

    if (deletedServiceIds.value.length > 0) {
      updateData.detail_hapus = deletedServiceIds.value;
    }

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
  fetchServices();
});
</script>
