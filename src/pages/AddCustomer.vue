<template>
  <AdminLayout>
    <AlertNotification
      :show="showAlert"
      :message="alertMessage"
      :type="alertType"
    />

    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <button
          @click="$router.push('/customers')"
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
            Tambah Pelanggan Baru
          </h2>
          <p class="text-gray-600 mt-1">Isi form untuk menambahkan pelanggan</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Pelanggan *
              </label>
              <input
                v-model="formData.nama"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                No. Telepon *
              </label>
              <input
                v-model="formData.no_telp"
                type="tel"
                required
                pattern="[0-9]{10,13}"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="08xxxxxxxxxx"
              />
              <p class="mt-1 text-xs text-gray-500">
                Format: 10-13 digit angka
              </p>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="$router.push('/customers')"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span
                v-if="loading"
                class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"
              ></span>
              {{ loading ? "Menyimpan..." : "Simpan Pelanggan" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminLayout from "../components/AdminLayout.vue";
import AlertNotification from "../components/ui/AlertNotification.vue";
import { useCustomers } from "../composables/useCustomers";
import { useAlert } from "../composables/useAlert";

const router = useRouter();
const { addCustomer } = useCustomers();
const { showAlert, alertMessage, alertType, displayAlert } = useAlert();

const loading = ref(false);
const formData = ref({
  nama: "",
  no_telp: "",
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await addCustomer(formData.value);
    displayAlert("Pelanggan berhasil ditambahkan!", "success");
    setTimeout(() => {
      router.push("/customers");
    }, 1500);
  } catch (error) {
    displayAlert(error.message || "Gagal menambahkan pelanggan", "error");
  } finally {
    loading.value = false;
  }
};
</script>
