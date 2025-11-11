import { ref, computed } from 'vue';
import api from '../services/api';

export function useCustomers() {
  const customers = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchQuery = ref('');

  const fetchCustomers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await api.get('/pelanggan');
      customers.value = Array.isArray(data) ? data : [];
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching customers:', err);
    } finally {
      loading.value = false;
    }
  };

  const addCustomer = async (customerData) => {
    await api.post('/pelanggan', customerData);
    await fetchCustomers();
  };

  const updateCustomer = async (id, customerData) => {
    await api.put(`/pelanggan/${id}`, customerData);
    await fetchCustomers();
  };

  const deleteCustomer = async (id) => {
    await api.delete(`/pelanggan/${id}`);
    await fetchCustomers();
  };

  const filteredCustomers = computed(() => {
    if (!searchQuery.value) return customers.value;
    
    const query = searchQuery.value.toLowerCase();
    return customers.value.filter(customer =>
      customer.nama.toLowerCase().includes(query) ||
      customer.no_telp.toLowerCase().includes(query)
    );
  });

  return {
    customers,
    loading,
    error,
    searchQuery,
    filteredCustomers,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
  };
}
