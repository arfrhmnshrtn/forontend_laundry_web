<template>
  <AdminLayout>
    <AlertNotification
      :show="showAlert"
      :message="alertMessage"
      :type="alertType"
    />

    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Kelola Layanan</h2>
          <p class="text-gray-600 mt-1">
            Kelola layanan laundry kiloan dan satuan
          </p>
        </div>
        <button
          @click="$router.push('/kelola-layanan/add')"
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
          Tambah Layanan
        </button>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <SearchInput
                v-model="searchQuery"
                placeholder="Cari nama layanan..."
              />
            </div>
            <div class="w-full md:w-48">
              <select
                v-model="typeFilter"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Tipe</option>
                <option value="Kiloan">Kiloan</option>
                <option value="Satuan">Satuan</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
          ></div>
          <p class="text-gray-600 mt-4">Memuat data...</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Nama Layanan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Tipe
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Harga
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Durasi
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
                v-for="service in filteredServices"
                :key="service.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div
                      :class="[
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        service.tipe_layanan === 'Kiloan'
                          ? 'bg-blue-100'
                          : 'bg-green-100',
                      ]"
                    >
                      <svg
                        v-if="service.tipe_layanan === 'Kiloan'"
                        class="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">
                        {{ service.nama_layanan }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ service.deskripsi || "-" }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      service.tipe_layanan === 'Kiloan'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600',
                    ]"
                  >
                    {{
                      service.tipe_layanan === "Kiloan" ? "Kiloan" : "Satuan"
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  Rp {{ formatPrice(service.harga)
                  }}{{ service.tipe_layanan === "Kiloan" ? "/kg" : "/pcs" }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{
                    service.durasi % 24 === 0
                      ? service.durasi / 24 + " Hari"
                      : service.durasi + " Jam"
                  }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-2">
                    <button
                      @click="$router.push(`/kelola-layanan/edit/${service.id}`)"
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
                      @click="handleDelete(service)"
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
            v-if="filteredServices.length === 0"
            title="Tidak ada data layanan"
            :description="
              searchQuery
                ? 'Coba kata kunci pencarian lain'
                : 'Mulai dengan menambahkan layanan baru'
            "
          />
        </div>
      </div>
    </div>

    <BaseModal
      :show="modal.isOpen.value"
      :title="editingService ? 'Edit Layanan' : 'Tambah Layanan Baru'"
      size="lg"
      @close="modal.closeModal"
    >
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
    </BaseModal>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "../components/AdminLayout.vue";
import AlertNotification from "../components/ui/AlertNotification.vue";
import BaseModal from "../components/ui/BaseModal.vue";
import SearchInput from "../components/ui/SearchInput.vue";
import EmptyState from "../components/ui/EmptyState.vue";
import { useServicesApi } from "../composables/useServicesApi";
import { useAlert } from "../composables/useAlert";
import { useModal } from "../composables/useModal";
import { formatPrice } from "../utils/formatters";

const {
  filteredServices,
  searchQuery,
  typeFilter,
  loading,
  fetchServices,
  addService,
  updateService,
  deleteService,
} = useServicesApi();

const { showAlert, alertMessage, alertType, displayAlert } = useAlert();
const modal = useModal();

const editingService = ref(null);
const formData = ref({
  name: "",
  description: "",
  type: "",
  price: 0,
  duration: 3,
});

onMounted(fetchServices);

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

const handleEdit = (service) => {
  $router.push(`/kelola-layanan/edit/${service.id}`);
};

const handleSave = async () => {
  try {
    if (editingService.value) {
      await updateService(editingService.value.id, formData.value);
      displayAlert("Layanan berhasil diperbarui!");
    } else {
      await addService(formData.value);
      displayAlert("Layanan berhasil ditambahkan!");
    }
    modal.closeModal();
  } catch (error) {
    displayAlert("Terjadi kesalahan", "error");
  }
};

const handleDelete = async (service) => {
  if (!confirm(`Hapus layanan ${service.nama_layanan}?`)) return;

  try {
    await deleteService(service.id);
    displayAlert("Layanan berhasil dihapus!");
  } catch (error) {
    displayAlert("Terjadi kesalahan", "error");
  }
};
</script>
