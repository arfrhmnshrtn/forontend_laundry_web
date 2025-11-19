<template>
  <AdminLayout>
    <AlertNotification
      :show="showAlert"
      :message="alertMessage"
      :type="alertType"
    />

    <div class="flex items-center gap-4 mb-5">
      <button
        @click="$router.push('/kelola-layanan')"
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
        <h2 class="text-2xl font-bold text-gray-800">Edit Layanan</h2>
        <p class="text-gray-600 mt-1">Ubah informasi layanan</p>
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
              <option value="Kiloan">Kiloan (per kg)</option>
              <option value="Satuan">Satuan (per pcs)</option>
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
            @click="$router.push('/kelola-layanan')"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
import { useServicesApi } from "../composables/useServicesApi";
import { useAlert } from "../composables/useAlert";

const route = useRoute();
const router = useRouter();
const { getServiceById, updateService, loading } = useServicesApi();
const { showAlert, alertMessage, alertType, displayAlert } = useAlert();

const formData = ref({
  name: "",
  description: "",
  type: "",
  price: 0,
  duration: 3,
});

const fetchServiceData = async () => {
  try {
    const serviceId = route.params.id;
    const service = await getServiceById(serviceId);
    
    formData.value = {
      name: service.nama_layanan,
      description: service.deskripsi || "",
      type: service.tipe_layanan,
      price: service.harga,
      duration: service.durasi,
    };
  } catch (error) {
    displayAlert("Gagal memuat data layanan", "error");
    router.push("/kelola-layanan");
  }
};

const handleSave = async () => {
  try {
    const serviceId = route.params.id;
    await updateService(serviceId, formData.value);
    displayAlert("Layanan berhasil diperbarui!");
    setTimeout(() => {
      router.push("/kelola-layanan");
    }, 800);
  } catch (error) {
    displayAlert("Terjadi kesalahan", "error");
  }
};

onMounted(fetchServiceData);
</script>