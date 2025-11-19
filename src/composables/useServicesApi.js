import { ref, computed } from 'vue';
import api from '../services/api';

export function useServicesApi() {
  const services = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchQuery = ref('');
  const typeFilter = ref('');

  const fetchServices = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await api.get('/layanan');
      services.value = Array.isArray(data) ? data : data.data || [];
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching services:', err);
      services.value = [];
    } finally {
      loading.value = false;
    }
  };

  const getServiceById = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await api.get(`/layanan/${id}`);
      return data;
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching service:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addService = async (serviceData) => {
    const payload = {
      nama_layanan: serviceData.name,
      deskripsi: serviceData.description,
      tipe_layanan: serviceData.type,
      harga: serviceData.price,
      satuan_harga: serviceData.type === 'kiloan' ? 'kg' : 'pcs',
      durasi: serviceData.duration
    };
    await api.post('/layanan', payload);
    await fetchServices();
  };

  const updateService = async (id, serviceData) => {
    const payload = {
      nama_layanan: serviceData.name,
      deskripsi: serviceData.description,
      tipe_layanan: serviceData.type,
      harga: serviceData.price,
      satuan_harga: serviceData.type === 'kiloan' ? 'kg' : 'pcs',
      durasi: serviceData.duration
    };
    await api.put(`/layanan/${id}`, payload);
    await fetchServices();
  };

  const deleteService = async (id) => {
    await api.delete(`/layanan/${id}`);
    await fetchServices();
  };

  const filteredServices = computed(() => {
    return services.value.filter(service => {
      const matchesSearch = !searchQuery.value ||
        service.nama_layanan.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (service.deskripsi && service.deskripsi.toLowerCase().includes(searchQuery.value.toLowerCase()));

      const matchesType = !typeFilter.value || service.tipe_layanan === typeFilter.value;

      return matchesSearch && matchesType;
    });
  });

  return {
    services,
    loading,
    error,
    searchQuery,
    typeFilter,
    filteredServices,
    fetchServices,
    getServiceById,
    addService,
    updateService,
    deleteService
  };
}
