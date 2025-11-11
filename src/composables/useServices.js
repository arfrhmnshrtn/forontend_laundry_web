import { ref, computed } from 'vue';
import api from '../services/api';

const services = ref([]);
const loading = ref(false);
const error = ref(null);

export function useServices() {
  const fetchServices = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await api.get('/layanan');
      services.value = Array.isArray(data) ? data : [];
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching services:', err);
    } finally {
      loading.value = false;
    }
  };

  const activeServices = computed(() => {
    return services.value;
  });

  const kiloServices = computed(() => {
    return services.value.filter(service => service.tipe_layanan?.toLowerCase() === 'kiloan');
  });

  const pieceServices = computed(() => {
    return services.value.filter(service => service.tipe_layanan?.toLowerCase() === 'satuan');
  });

  const addService = (service) => {
    const newService = {
      ...service,
      id: services.value.length + 1,
    };
    services.value.push(newService);
    return newService;
  };

  const updateService = (id, updatedData) => {
    const index = services.value.findIndex(s => s.id === id);
    if (index !== -1) {
      services.value[index] = { ...services.value[index], ...updatedData };
      return services.value[index];
    }
    return null;
  };

  const deleteService = (id) => {
    const index = services.value.findIndex(s => s.id === id);
    if (index !== -1) {
      services.value.splice(index, 1);
      return true;
    }
    return false;
  };

  const getServiceById = (id) => {
    return services.value.find(s => s.id === id);
  };

  const getServiceByName = (name) => {
    return services.value.find(s => s.name === name);
  };

  return {
    services,
    loading,
    error,
    activeServices,
    kiloServices,
    pieceServices,
    fetchServices,
    addService,
    updateService,
    deleteService,
    getServiceById,
    getServiceByName,
  };
}
