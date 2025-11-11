<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <button
          @click="$router.push('/transactions')"
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
          <h2 class="text-2xl font-bold text-gray-800">
            Tambah Transaksi Baru
          </h2>
          <p class="text-gray-600 mt-1">Isi form untuk menambahkan transaksi</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="saveTransaction" class="space-y-6">
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Mode Input Pelanggan *
            </label>
            <div class="flex gap-4">
              <label class="flex items-center cursor-pointer flex-1">
                <input
                  v-model="customerInputMode"
                  type="radio"
                  value="existing"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  @change="onCustomerModeChange"
                />
                <span class="ml-3 text-sm font-medium text-gray-900">
                  Pilih Pelanggan Existing
                  <span class="block text-xs text-gray-500 font-normal"
                    >Pilih dari daftar pelanggan yang sudah ada</span
                  >
                </span>
              </label>
              <label class="flex items-center cursor-pointer flex-1">
                <input
                  v-model="customerInputMode"
                  type="radio"
                  value="manual"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  @change="onCustomerModeChange"
                />
                <span class="ml-3 text-sm font-medium text-gray-900">
                  Input Manual
                  <span class="block text-xs text-gray-500 font-normal"
                    >Masukkan data pelanggan baru</span
                  >
                </span>
              </label>
            </div>
          </div>

          <div
            v-if="customerInputMode === 'existing'"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div class="relative md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Pilih Pelanggan *
              </label>
              <input
                v-model="formData.customerName"
                @focus="showCustomerDropdown = true"
                @blur="setTimeout(() => (showCustomerDropdown = false), 200)"
                @input="onCustomerNameChange"
                type="text"
                required
                :disabled="loadingCustomers"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                :placeholder="
                  loadingCustomers
                    ? 'Memuat data pelanggan...'
                    : 'Ketik atau pilih nama pelanggan'
                "
                autocomplete="off"
              />
              <div
                v-if="showCustomerDropdown && filteredCustomerList.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                <button
                  v-for="customer in filteredCustomerList"
                  :key="customer.id"
                  type="button"
                  @click="selectCustomer(customer)"
                  class="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-3"
                >
                  <div
                    class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0"
                  >
                    <span class="text-purple-600 font-semibold text-xs">
                      {{ customer.nama.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">
                      {{ customer.nama }}
                    </p>
                    <p class="text-xs text-gray-500">{{ customer.no_telp }}</p>
                  </div>
                </button>
              </div>
            </div>

            <div v-if="selectedCustomerId">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Pelanggan
              </label>
              <input
                :value="formData.customerName"
                type="text"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>

            <div v-if="selectedCustomerId">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                No. Telepon
              </label>
              <input
                :value="formData.customerPhone"
                type="tel"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div v-if="customerInputMode === 'manual'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pelanggan *
                </label>
                <input
                  v-model="formData.customerName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan nama pelanggan"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  No. Telepon *
                </label>
                <input
                  v-model="formData.customerPhone"
                  type="tel"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <input
                  v-model="saveAsNewCustomer"
                  type="checkbox"
                  id="saveCustomer"
                  class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div class="flex-1">
                  <label
                    for="saveCustomer"
                    class="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Simpan sebagai pelanggan baru
                  </label>
                  <p class="text-xs text-gray-600 mt-1">
                    Data pelanggan ini akan disimpan ke database pelanggan untuk
                    kemudahan transaksi selanjutnya
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700">
                Jenis Layanan *
              </label>
              <button
                type="button"
                @click="addServiceItem"
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
                v-for="(item, index) in selectedServices"
                :key="index"
                class="border border-gray-300 rounded-lg p-4 relative"
              >
                <button
                  v-if="selectedServices.length > 1"
                  type="button"
                  @click="removeServiceItem(index)"
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
                      @change="onServiceItemChange(index)"
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
                          {{ formatPrice(service.harga) }}/{{ service.satuan_harga }} ({{
                            service.durasi
                          }}
                          hari)
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
                          {{ formatPrice(service.harga) }}/{{ service.satuan_harga }} ({{
                            service.durasi
                          }}
                          hari)
                        </option>
                      </optgroup>
                    </select>
                    <p v-if="item.service" class="text-xs text-gray-500 mt-1">
                      {{ item.service.deskripsi }}
                    </p>
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
                      :step="item.service?.tipe_layanan?.toLowerCase() === 'kiloan' ? '0.1' : '1'"
                      @input="calculateServiceItemTotal(index)"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      :placeholder="
                        item.service?.tipe_layanan?.toLowerCase() === 'kiloan' ? '0.0' : '0'
                      "
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Harga per
                      {{ item.service?.satuan_harga || "unit" }}
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
                      placeholder="Pilih layanan dulu"
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

              <div
                v-if="selectedServices.length === 0"
                class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
              >
                <p class="text-gray-500">Belum ada layanan dipilih</p>
                <button
                  type="button"
                  @click="addServiceItem"
                  class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Tambah Layanan Pertama
                </button>
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
                  :value="calculateTotal"
                  type="text"
                  readonly
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed font-bold text-lg text-blue-900"
                  placeholder="Rp 0"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  Metode Pembayaran *
                </label>
                <div class="space-y-3">
                  <label class="flex items-center cursor-pointer">
                    <input
                      v-model="formData.paymentMethod"
                      type="radio"
                      value="prepaid"
                      required
                      class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span class="ml-3 text-sm font-medium text-gray-900">
                      Bayar di Awal
                      <span class="block text-xs text-gray-500 font-normal"
                        >Pelanggan membayar saat menyerahkan cucian</span
                      >
                    </span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input
                      v-model="formData.paymentMethod"
                      type="radio"
                      value="postpaid"
                      required
                      class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span class="ml-3 text-sm font-medium text-gray-900">
                      Bayar di Akhir
                      <span class="block text-xs text-gray-500 font-normal"
                        >Pelanggan membayar saat mengambil cucian</span
                      >
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div
              v-if="formData.paymentMethod === 'prepaid'"
              class="mt-4 pt-4 border-t border-blue-300"
            >
              <div class="flex items-center gap-2 text-sm">
                <svg
                  class="w-5 h-5 text-green-600"
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
                <span class="text-green-800 font-medium"
                  >Pembayaran sudah diterima: {{ calculateTotal }}</span
                >
              </div>
            </div>

            <div
              v-if="formData.paymentMethod === 'postpaid'"
              class="mt-4 pt-4 border-t border-blue-300"
            >
              <div class="flex items-center gap-2 text-sm">
                <svg
                  class="w-5 h-5 text-orange-600"
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
                <span class="text-orange-800 font-medium"
                  >Belum dibayar - akan dibayar saat pengambilan</span
                >
              </div>
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
                Tanggal Masuk *
              </label>
              <input
                v-model="formData.dateIn"
                type="date"
                required
                @change="calculateDateOut"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Selesai
                <span
                  v-if="getMaxDuration() > 0"
                  class="text-xs text-gray-500 font-normal"
                >
                  ({{ getMaxDuration() }} hari dari tanggal masuk)
                </span>
              </label>
              <input
                v-model="formData.dateOut"
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
              v-model="formData.notes"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Catatan tambahan (opsional)"
            ></textarea>
          </div>

          <div class="flex gap-3 pt-4 border-t">
            <button
              type="button"
              @click="$router.push('/transactions')"
              class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminLayout from "../components/AdminLayout.vue";
import { useServices } from "../composables/useServices";
import { useCustomers } from "../composables/useCustomers";
import api from "../services/api";

const router = useRouter();
const {
  activeServices,
  kiloServices,
  pieceServices,
  getServiceById,
  loading: loadingServices,
  fetchServices,
} = useServices();
const { customers, loading: loadingCustomers, fetchCustomers } = useCustomers();

const selectedServices = ref([
  {
    serviceId: "",
    service: null,
    quantity: 0,
    subtotal: 0,
  },
]);

const formData = ref({
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  customerAddress: "",
  dateIn: new Date().toISOString().split("T")[0],
  dateOut: "",
  status: "pending",
  paymentMethod: "",
  notes: "",
});

const customerInputMode = ref("existing");
const saveAsNewCustomer = ref(false);
const isExistingCustomer = ref(false);
const selectedCustomerId = ref(null);
const showCustomerDropdown = ref(false);

const filteredCustomerList = computed(() => {
  if (!formData.value.customerName) return customers.value;
  return customers.value.filter((customer) =>
    customer.nama
      .toLowerCase()
      .includes(formData.value.customerName.toLowerCase())
  );
});

const selectCustomer = (customer) => {
  formData.value.customerName = customer.nama;
  formData.value.customerPhone = customer.no_telp;
  selectedCustomerId.value = customer.id;
  showCustomerDropdown.value = false;
  isExistingCustomer.value = true;
  saveAsNewCustomer.value = false;
};

const onCustomerNameChange = () => {
  const existingCustomer = customers.value.find(
    (c) => c.nama.toLowerCase() === formData.value.customerName.toLowerCase()
  );

  if (existingCustomer) {
    selectedCustomerId.value = existingCustomer.id;
    isExistingCustomer.value = true;
  } else {
    selectedCustomerId.value = null;
    isExistingCustomer.value = false;
  }
};

const onCustomerModeChange = () => {
  formData.value.customerName = "";
  formData.value.customerPhone = "";
  selectedCustomerId.value = null;
  isExistingCustomer.value = false;
  saveAsNewCustomer.value = false;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

const addServiceItem = () => {
  selectedServices.value.push({
    serviceId: "",
    service: null,
    quantity: 0,
    subtotal: 0,
  });
};

console.log(selectedServices.value);

const removeServiceItem = (index) => {
  if (selectedServices.value.length > 1) {
    selectedServices.value.splice(index, 1);
  }
};

const onServiceItemChange = (index) => {
  const item = selectedServices.value[index];
  if (item.serviceId) {
    item.service = getServiceById(Number(item.serviceId));
    calculateServiceItemTotal(index);
    calculateDateOut();
  } else {
    item.service = null;
    item.subtotal = 0;
  }
};

const calculateServiceItemTotal = (index) => {
  const item = selectedServices.value[index];
  if (item.service && item.quantity > 0) {
    item.subtotal = item.quantity * parseFloat(item.service.harga);
  } else {
    item.subtotal = 0;
  }
};

const calculateTotal = computed(() => {
  const total = selectedServices.value.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );
  return `Rp ${total.toLocaleString("id-ID")}`;
});

const getMaxDuration = () => {
  const durations = selectedServices.value
    .filter((item) => item.service)
    .map((item) => parseInt(item.service.durasi) || 0);
  return durations.length > 0 ? Math.max(...durations) : 2;
};

const calculateDateOut = () => {
  if (formData.value.dateIn) {
    const maxDuration = getMaxDuration();
    const dateIn = new Date(formData.value.dateIn);
    const dateOut = new Date(dateIn);
    dateOut.setDate(dateIn.getDate() + maxDuration);
    formData.value.dateOut = dateOut.toISOString().split("T")[0];
  }
};
// console.log(fetchServices());

onMounted(() => {
  fetchCustomers();
  fetchServices();
});

const saveTransaction = async () => {
  const hasValidService = selectedServices.value.some(
    (item) => item.serviceId && item.quantity > 0
  );

  if (!hasValidService) {
    alert("Harap pilih minimal satu layanan dengan quantity yang valid");
    return;
  }

  if (customerInputMode.value === "existing" && !selectedCustomerId.value) {
    alert("Harap pilih pelanggan dari daftar");
    return;
  }

  try {
    // Build detail array untuk layanan
    const detail = selectedServices.value
      .filter((item) => item.serviceId && item.quantity > 0)
      .map((item) => ({
        layanan_id: item.serviceId,
        berat: item.quantity,
      }));

    // Mapping status pembayaran
    const paymentStatusMap = {
      prepaid: "Bayar Awal",
      postpaid: "Belum Bayar",
    };

    let transactionData;

    if (customerInputMode.value === "existing") {
      // Mode pelanggan existing - kirim pelanggan_id
      transactionData = {
        pelanggan_id: selectedCustomerId.value,
        tanggal_masuk: formData.value.dateIn,
        tanggal_selesai: formData.value.dateOut,
        pembayaran_status: paymentStatusMap[formData.value.paymentMethod] || "Belum Bayar",
        status: formData.value.status,
        catatan: formData.value.notes || "",
        detail: detail,
      };
    } else {
      // Mode manual - kirim nama dan no_telp
      transactionData = {
        nama_pelanggan: formData.value.customerName,
        no_telp_pelanggan: formData.value.customerPhone,
        simpan_pelanggan: saveAsNewCustomer.value,
        tanggal_masuk: formData.value.dateIn,
        tanggal_selesai: formData.value.dateOut,
        pembayaran_status: paymentStatusMap[formData.value.paymentMethod] || "Belum Bayar",
        status: formData.value.status,
        catatan: formData.value.notes || "",
        detail: detail,
      };
    }

    // Kirim ke API
    await api.post("/transaksi", transactionData);
    
    alert("Transaksi berhasil disimpan!");
    router.push("/transactions");
  } catch (error) {
    console.error("Error saving transaction:", error);
    alert("Gagal menyimpan transaksi: " + (error.message || "Terjadi kesalahan"));
  }
};
</script>
