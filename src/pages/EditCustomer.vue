<template>
  <AdminLayout>
    <AlertNotification
      :show="showAlert"
      :message="alertMessage"
      :type="alertType"
    />

    <div class="flex items-center gap-4 mb-5">
      <button
        @click="$router.push('/customers')"
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
        <h2 class="text-2xl font-bold text-gray-800">Edit Pelanggan</h2>
        <p class="text-gray-600 mt-1">Ubah informasi pelanggan</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      ></div>
      <p class="text-gray-600 mt-4">Memuat data...</p>
    </div>

    <div v-else class="bg-white shadow rounded-lg p-6 space-y-6">
      <form @submit.prevent="handleSave" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Nama *</label
          >
          <input
            v-model="formData.nama"
            type="text"
            required
            placeholder="Masukkan nama pelanggan"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >No. Telepon *</label
          >
          <input
            v-model="formData.no_telp"
            type="tel"
            required
            placeholder="08xxxxxxxxxx"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$router.push('/customers')"
            class="flex-1 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AdminLayout from "../components/AdminLayout.vue";
import AlertNotification from "../components/ui/AlertNotification.vue";
import { useCustomers } from "../composables/useCustomers";
import { useAlert } from "../composables/useAlert";

const route = useRoute();
const router = useRouter();
const { getCustomerById, updateCustomer, loading } = useCustomers();
const { showAlert, alertMessage, alertType, displayAlert } = useAlert();

const formData = ref({
  nama: "",
  no_telp: "",
});

const fetchCustomerData = async () => {
  try {
    const customerId = route.params.id;
    const customer = await getCustomerById(customerId);
    
    formData.value = {
      nama: customer.nama,
      no_telp: customer.no_telp,
    };
  } catch (error) {
    displayAlert("Gagal memuat data pelanggan", "error");
    router.push("/customers");
  }
};

const handleSave = async () => {
  try {
    const customerId = route.params.id;
    await updateCustomer(customerId, formData.value);
    displayAlert("Pelanggan berhasil diperbarui!");
    setTimeout(() => {
      router.push("/customers");
    }, 800);
  } catch (error) {
    displayAlert("Terjadi kesalahan", "error");
  }
};

onMounted(fetchCustomerData);
</script>