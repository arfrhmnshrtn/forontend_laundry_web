import { ref, computed } from 'vue';

const services = ref([
  {
    id: 1,
    name: "Cuci Kering Kiloan",
    description: "Layanan cuci dan kering tanpa setrika",
    type: "kiloan",
    price: 5000,
    duration: 2,
    status: "active",
  },
  {
    id: 2,
    name: "Cuci Setrika Kiloan",
    description: "Layanan cuci, kering, dan setrika rapi",
    type: "kiloan",
    price: 7000,
    duration: 3,
    status: "active",
  },
  {
    id: 3,
    name: "Cuci Setrika Express Kiloan",
    description: "Layanan cuci setrika dengan waktu 1 hari",
    type: "kiloan",
    price: 12000,
    duration: 1,
    status: "active",
  },
  {
    id: 4,
    name: "Cuci Jas/Blazer",
    description: "Layanan cuci khusus untuk jas dan blazer",
    type: "satuan",
    price: 25000,
    duration: 4,
    status: "active",
  },
  {
    id: 5,
    name: "Cuci Sepatu",
    description: "Layanan cuci sepatu dengan perawatan khusus",
    type: "satuan",
    price: 20000,
    duration: 3,
    status: "active",
  },
  {
    id: 6,
    name: "Cuci Boneka",
    description: "Layanan cuci boneka ukuran sedang",
    type: "satuan",
    price: 15000,
    duration: 2,
    status: "active",
  },
]);

export function useServices() {
  const activeServices = computed(() => {
    return services.value.filter(service => service.status === 'active');
  });

  const kiloServices = computed(() => {
    return services.value.filter(service => service.type === 'kiloan');
  });

  const pieceServices = computed(() => {
    return services.value.filter(service => service.type === 'satuan');
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
    activeServices,
    kiloServices,
    pieceServices,
    addService,
    updateService,
    deleteService,
    getServiceById,
    getServiceByName,
  };
}
