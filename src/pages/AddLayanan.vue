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
          <h2 class="text-2xl font-bold text-gray-800">Tambah Layanan Baru</h2>
          <p class="text-gray-600 mt-1">Isi form untuk menambahkan layanan</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSave" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Nama Layanan *</label
            >
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Cuci Kering Kiloan"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Deskripsi</label
            >
            <textarea
              v-model="formData.description"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Deskripsi singkat layanan"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tipe Layanan *</label
              >
              <select
                v-model="formData.type"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Tipe</option>
                <option value="kiloan">Kiloan (per kg)</option>
                <option value="satuan">Satuan (per pcs)</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Harga *</label
              >
              <input
                v-model.number="formData.price"
                type="number"
                required
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Durasi Pengerjaan (Jam) *</label
            >
            <input
              v-model.number="formData.duration"
              type="number"
              required
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="modal.closeModal"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {{ editingService ? "Simpan Perubahan" : "Tambah Layanan" }}
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
const { addLayanan } = useCustomers();
const { showAlert, alertMessage, alertType, displayAlert } = useAlert();

const loading = ref(false);
const formData = ref({
  nama: "",
  no_telp: "",
});

const handleAdd = () => {
  editingService.value = null;
  formData.value = {
    name: "",
    description: "",
    type: "",
    price: 0,
    duration: 3,
  };
  modal.openModal();
};

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
