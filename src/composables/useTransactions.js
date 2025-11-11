import { ref, computed } from "vue";
import api from "../services/api";

export function useTransactions() {
  const transactions = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const searchQuery = ref("");
  const statusFilter = ref("");

  const fetchTransactions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get("/transaksi");
      const result = response.data?.data || response.data || response;

      transactions.value = result.map((trx) => {
        const services = trx.detail_layanan || [];
        const serviceNames = services.map((s) => s.nama_layanan).join(", ");
        const serviceTypes = services.map((s) => s.tipe_layanan).join(", ");
        const totalBerat = services.reduce(
          (sum, s) => sum + parseFloat(s.berat || 0),
          0
        );

        return {
          id: trx.transaksi_id,
          customerName: trx.nama_pelanggan,
          customerPhone: trx.no_telepon || "-",
          services: serviceNames || "-",
          type: serviceTypes ? ` (${serviceTypes})` : "",
          berat: totalBerat,
          totalPrice: parseFloat(trx.total_harga),
          dateIn: trx.tanggal_masuk,
          dateOut: trx.tanggal_selesai,
          status: trx.status.toLowerCase(),
          paymentMethod:
            trx.pembayaran_status === "Bayar Awal" ? "prepaid" : "postpaid",
          paymentStatus:
            parseFloat(trx.pembayaran_awal) > 0 ? "paid" : "unpaid",
          paymentInitial: parseFloat(trx.pembayaran_awal),
          detailLayanan: services.map((s) => ({
            id: s.detail_id,
            namaLayanan: s.nama_layanan,
            tipeLayanan: s.tipe_layanan,
            durasi: s.durasi,
            berat: parseFloat(s.berat),
            subtotal: parseFloat(s.subtotal),
          })),
          notes: trx.catatan || "",
        };
      });
      console.log("Fetched transactions:", transactions.value);
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching transactions:", err);
    } finally {
      loading.value = false;
    }
  };

  const filteredTransactions = computed(() => {
    return transactions.value.filter((transaction) => {
      const matchesSearch =
        !searchQuery.value ||
        transaction.id.toString().includes(searchQuery.value) ||
        transaction.customerName
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());

      const matchesStatus =
        !statusFilter.value || transaction.status === statusFilter.value;

      return matchesSearch && matchesStatus;
    });
  });

  return {
    transactions,
    loading,
    error,
    searchQuery,
    statusFilter,
    filteredTransactions,
    fetchTransactions,
  };
}
