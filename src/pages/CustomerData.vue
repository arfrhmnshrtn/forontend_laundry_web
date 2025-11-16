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
          <h2 class="text-2xl font-bold text-gray-800">Data Pelanggan</h2>
          <p class="text-gray-600 mt-1">Kelola informasi pelanggan laundry</p>
        </div>
        <button
          @click="$router.push('/customers/add')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
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
          Tambah Pelanggan
        </button>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <SearchInput
            v-model="searchQuery"
            placeholder="Cari nama atau nomor telepon..."
          />
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
                  ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Nama
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  No. Telepon
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
                v-for="customer in filteredCustomers"
                :key="customer.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{{ customer.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <span class="text-blue-600 font-semibold text-sm">
                        {{ getInitials(customer.nama) }}
                      </span>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">
                        {{ customer.nama }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ customer.no_telp }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-2">
                    <button
                      @click="handleEdit(customer)"
                      class="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
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
                      @click="handleDelete(customer)"
                      class="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
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
            v-if="filteredCustomers.length === 0"
            title="Tidak ada data pelanggan"
            :description="
              searchQuery
                ? 'Coba kata kunci pencarian lain'
                : 'Mulai dengan menambahkan pelanggan baru'
            "
          />
        </div>
      </div>
    </div>

    <BaseModal
      :show="modal.isOpen.value"
      :title="editingCustomer ? 'Edit Pelanggan' : 'Tambah Pelanggan'"
      @close="modal.closeModal"
    >
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
            @click="modal.closeModal"
            class="flex-1 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            {{ editingCustomer ? "Simpan Perubahan" : "Tambah" }}
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
import { useCustomers } from "../composables/useCustomers";
import { useAlert } from "../composables/useAlert";
import { useModal } from "../composables/useModal";
import { getInitials } from "../utils/formatters";

const {
  filteredCustomers,
  searchQuery,
  loading,
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = useCustomers();

const { showAlert, alertMessage, alertType, displayAlert } = useAlert();
const modal = useModal();

const editingCustomer = ref(null);
const formData = ref({
  nama: "",
  no_telp: "",
});

onMounted(fetchCustomers);

const handleAdd = () => {
  editingCustomer.value = null;
  formData.value = { nama: "", no_telp: "" };
  modal.openModal();
};

const handleEdit = (customer) => {
  editingCustomer.value = customer;
  formData.value = { ...customer };
  modal.openModal();
};

const handleSave = async () => {
  try {
    if (editingCustomer.value) {
      await updateCustomer(editingCustomer.value.id, formData.value);
      displayAlert("Pelanggan berhasil diperbarui!");
    } else {
      await addCustomer(formData.value);
      displayAlert("Pelanggan berhasil ditambahkan!");
    }
    modal.closeModal();
  } catch (error) {
    displayAlert("Terjadi kesalahan", "error");
  }
};

const handleDelete = async (customer) => {
  if (!confirm(`Hapus pelanggan ${customer.nama}?`)) return;

  try {
    await deleteCustomer(customer.id);
    displayAlert("Pelanggan berhasil dihapus!");
  } catch (error) {
    displayAlert("Terjadi kesalahan", "error");
  }
};
</script>
