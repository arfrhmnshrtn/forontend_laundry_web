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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Pelanggan *
              </label>
              <input
                v-model="formData.customerName"
                @focus="showCustomerDropdown = true"
                @blur="setTimeout(() => (showCustomerDropdown = false), 200)"
                @input="onCustomerNameChange"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ketik atau pilih nama pelanggan"
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
                      {{ customer.name.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">
                      {{ customer.name }}
                    </p>
                    <p class="text-xs text-gray-500">{{ customer.phone }}</p>
                  </div>
                </button>
              </div>
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

          <div
            v-if="!isExistingCustomer"
            class="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
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

            <!-- <div v-if="saveAsNewCustomer" class="mt-4 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  v-model="formData.customerEmail"
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Alamat *
                </label>
                <textarea
                  v-model="formData.customerAddress"
                  rows="2"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan alamat lengkap"
                ></textarea>
              </div>
            </div> -->
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
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih layanan</option>
                      <optgroup label="Layanan Kiloan">
                        <option
                          v-for="service in kiloServices"
                          :key="service.id"
                          :value="service.id"
                        >
                          {{ service.name }} - Rp {{ formatPrice(service.price) }}/kg ({{ service.duration }} hari)
                        </option>
                      </optgroup>
                      <optgroup label="Layanan Satuan">
                        <option
                          v-for="service in pieceServices"
                          :key="service.id"
                          :value="service.id"
                        >
                          {{ service.name }} - Rp {{ formatPrice(service.price) }}/pcs ({{ service.duration }} hari)
                        </option>
                      </optgroup>
                    </select>
                    <p v-if="item.service" class="text-xs text-gray-500 mt-1">
                      {{ item.service.description }}
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ item.service?.type === 'kiloan' ? 'Berat (kg)' : 'Jumlah (pcs)' }} *
                    </label>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      required
                      min="0"
                      :step="item.service?.type === 'kiloan' ? '0.1' : '1'"
                      @input="calculateServiceItemTotal(index)"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      :placeholder="item.service?.type === 'kiloan' ? '0.0' : '0'"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Harga per {{ item.service?.type === 'kiloan' ? 'kg' : 'pcs' }}
                    </label>
                    <input
                      :value="item.service ? `Rp ${formatPrice(item.service.price)}` : ''"
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

              <div v-if="selectedServices.length === 0" class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
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
                      <span class="block text-xs text-gray-500 font-normal">Pelanggan membayar saat menyerahkan cucian</span>
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
                      <span class="block text-xs text-gray-500 font-normal">Pelanggan membayar saat mengambil cucian</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div v-if="formData.paymentMethod === 'prepaid'" class="mt-4 pt-4 border-t border-blue-300">
              <div class="flex items-center gap-2 text-sm">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-green-800 font-medium">Pembayaran sudah diterima: {{ calculateTotal }}</span>
              </div>
            </div>

            <div v-if="formData.paymentMethod === 'postpaid'" class="mt-4 pt-4 border-t border-blue-300">
              <div class="flex items-center gap-2 text-sm">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-orange-800 font-medium">Belum dibayar - akan dibayar saat pengambilan</span>
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
                <span v-if="getMaxDuration() > 0" class="text-xs text-gray-500 font-normal">
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
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import AdminLayout from "../components/AdminLayout.vue";
import { useServices } from "../composables/useServices";

const router = useRouter();
const { activeServices, kiloServices, pieceServices, getServiceById } = useServices();

const selectedServices = ref([
  {
    serviceId: "",
    service: null,
    quantity: 0,
    subtotal: 0,
  }
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

const saveAsNewCustomer = ref(false);
const isExistingCustomer = ref(false);

const customers = ref([
  {
    id: 1,
    name: "Ahmad Pratama",
    phone: "081234567890",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    phone: "081234567891",
  },
  {
    id: 3,
    name: "Budi Santoso",
    phone: "081234567892",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    phone: "081234567893",
  },
  {
    id: 5,
    name: "Eko Wijaya",
    phone: "081234567894",
  },
]);

const showCustomerDropdown = ref(false);

const filteredCustomerList = computed(() => {
  if (!formData.value.customerName) return customers.value;
  return customers.value.filter((customer) =>
    customer.name
      .toLowerCase()
      .includes(formData.value.customerName.toLowerCase())
  );
});

const selectCustomer = (customer) => {
  formData.value.customerName = customer.name;
  formData.value.customerPhone = customer.phone;
  showCustomerDropdown.value = false;
  isExistingCustomer.value = true;
  saveAsNewCustomer.value = false;
};

const onCustomerNameChange = () => {
  const existingCustomer = customers.value.find(
    (c) => c.name.toLowerCase() === formData.value.customerName.toLowerCase()
  );
  isExistingCustomer.value = !!existingCustomer;
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
    item.subtotal = item.quantity * item.service.price;
  } else {
    item.subtotal = 0;
  }
};

const calculateTotal = computed(() => {
  const total = selectedServices.value.reduce((sum, item) => sum + item.subtotal, 0);
  return `Rp ${total.toLocaleString("id-ID")}`;
});

const getMaxDuration = () => {
  const durations = selectedServices.value
    .filter(item => item.service)
    .map(item => item.service.duration);
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

const saveTransaction = () => {
  const hasValidService = selectedServices.value.some(item => item.serviceId && item.quantity > 0);
  
  if (!hasValidService) {
    alert("Harap pilih minimal satu layanan dengan quantity yang valid");
    return;
  }

  const totalPrice = selectedServices.value.reduce((sum, item) => sum + item.subtotal, 0);

  if (saveAsNewCustomer.value && !isExistingCustomer.value) {
    const existingCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    );

    const newCustomer = {
      id: existingCustomers.length + 1,
      name: formData.value.customerName,
      phone: formData.value.customerPhone,
      email: formData.value.customerEmail || "",
      address: formData.value.customerAddress,
      totalOrders: 1,
      status: "active",
    };

    existingCustomers.push(newCustomer);
    localStorage.setItem("customers", JSON.stringify(existingCustomers));
  }

  const existingTransactions = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  const servicesDetail = selectedServices.value
    .filter(item => item.serviceId && item.quantity > 0)
    .map(item => ({
      serviceName: item.service.name,
      serviceType: item.service.type,
      quantity: item.quantity,
      price: item.service.price,
      subtotal: item.subtotal,
      duration: item.service.duration,
    }));

  const newTransaction = {
    id: existingTransactions.length + 1,
    customerName: formData.value.customerName,
    customerPhone: formData.value.customerPhone,
    services: servicesDetail,
    dateIn: formData.value.dateIn,
    dateOut: formData.value.dateOut,
    status: formData.value.status,
    paymentMethod: formData.value.paymentMethod,
    paymentStatus: formData.value.paymentMethod === 'prepaid' ? 'paid' : 'unpaid',
    notes: formData.value.notes,
    totalPrice,
  };

  existingTransactions.push(newTransaction);
  localStorage.setItem("transactions", JSON.stringify(existingTransactions));

  router.push("/transactions");
};
</script>
