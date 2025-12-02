<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="print-only hidden text-center mb-6">
        <h1 class="text-3xl font-bold">LAPORAN TRANSAKSI LAUNDRY</h1>
        <p class="text-gray-600 mt-1">Sistem Laundry Management</p>
        <p class="text-sm text-gray-500 mt-2">
          Periode: {{ formatDate(dateFrom) }} - {{ formatDate(dateTo) }}
        </p>
        <p class="text-sm text-gray-500">
          Dicetak pada: {{ new Date().toLocaleDateString("id-ID") }}
        </p>
      </div>

      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Data Laporan</h2>
          <p class="text-gray-600 mt-1">Laporan transaksi dan pendapatan</p>
        </div>
        <div class="flex gap-2 no-print">
          <button
            @click="handleExportReport"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export Excel
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Transaksi</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">
                {{ summaryStats.totalTransactions }}
              </p>
            </div>
            <div class="bg-blue-100 p-3 rounded-lg">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Pendapatan</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">
                {{ formatCurrency(summaryStats.totalRevenue) }}
              </p>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Transaksi Selesai</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">
                {{ summaryStats.completedTransactions }}
              </p>
            </div>
            <div class="bg-purple-100 p-3 rounded-lg">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Pelanggan Aktif</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">
                {{ summaryStats.activeCustomers }}
              </p>
            </div>
            <div class="bg-orange-100 p-3 rounded-lg">
              <svg
                class="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200 no-print">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tanggal Mulai</label
              >
              <input
                v-model="dateFrom"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tanggal Akhir</label
              >
              <input
                v-model="dateTo"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="flex items-end">
              <button
                @click="applyFilter"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pelanggan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Layanan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Berat (kg)
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="report in filteredReports"
                :key="report.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(report.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ report.customerName }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ report.customerPhone }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ report.serviceType }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ report.weight }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ formatCurrency(report.total) }}
                </td>
              </tr>
            </tbody>
            <tfoot class="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td
                  colspan="4"
                  class="px-6 py-4 text-right text-sm font-bold text-gray-900"
                >
                  Total Pendapatan:
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                >
                  {{ formatCurrency(totalFiltered) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div
          v-if="filteredReports.length === 0"
          class="text-center py-12 text-gray-500"
        >
          <svg
            class="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p class="text-lg">Tidak ada data laporan</p>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminLayout from "../components/AdminLayout.vue";
import { useTransactions } from "../composables/useTransactions";
import { useCustomers } from "../composables/useCustomers";
import { useExportReport } from "../composables/exportExel";

const dateFrom = ref("");
const dateTo = ref("");
const statusFilter = ref("");

const { transactions, loading, fetchTransactions } = useTransactions();
const { customers, fetchCustomers } = useCustomers();
const { exportReport } = useExportReport();

const reports = computed(() => {
  return transactions.value
    .filter((trx) => trx.status === "selesai")
    .map((trx) => ({
      id: trx.id,
      date: trx.dateIn,
      transactionId: trx.id,
      customerName: trx.customerName,
      customerPhone: trx.customerPhone,
      serviceType: trx.services,
      weight: trx.berat,
      status: trx.status,
      total: trx.totalPrice,
    }));
});

const summaryStats = computed(() => {
  const filtered = filteredReports.value;
  const activeTransactions = transactions.value.filter(
    (trx) => trx.status !== "done" && trx.status !== "delivered"
  );

  return {
    totalTransactions: filtered.length,
    totalRevenue: filtered.reduce((sum, item) => sum + item.total, 0),
    completedTransactions: filtered.length,
    activeCustomers: new Set(activeTransactions.map((trx) => trx.customerName))
      .size,
  };
});

const filteredReports = computed(() => {
  let filtered = reports.value;

  if (dateFrom.value) {
    filtered = filtered.filter((item) => item.date >= dateFrom.value);
  }

  if (dateTo.value) {
    filtered = filtered.filter((item) => item.date <= dateTo.value);
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
});

const totalFiltered = computed(() => {
  return filteredReports.value.reduce((sum, item) => sum + item.total, 0);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// const formatDateTime = (dateString) => {
//   if (!dateString) return "-";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("id-ID", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

const getStatusClass = (status) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    process: "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
    delivered: "bg-purple-100 text-purple-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status) => {
  const texts = {
    pending: "Pending",
    process: "Proses",
    done: "Selesai",
    delivered: "Terkirim",
  };
  return texts[status] || status;
};

const applyFilter = () => {
  console.log("Filter applied:", {
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
    status: statusFilter.value,
  });
};

// console.log("Filtered Reports:", filteredReports.value);

const handleExportReport = () => {
  console.log(transactions.value);
  exportReport(transactions.value, dateFrom.value, dateTo.value);
};

const printReport = () => {
  window.print();
};

onMounted(async () => {
  await fetchTransactions();
  await fetchCustomers();

  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  dateFrom.value = firstDay.toISOString().split("T")[0];
  dateTo.value = today.toISOString().split("T")[0];
});
</script>

<style>
@media print {
  /* Hide elements that shouldn't be printed */
  .no-print {
    display: none !important;
  }

  /* Show elements only for print */
  .print-only {
    display: block !important;
  }

  /* General print styles */
  body {
    background: white !important;
    color: black !important;
  }

  /* Ensure the table takes full width and looks good in print */
  .overflow-x-auto {
    overflow: visible !important;
  }

  table {
    width: 100% !important;
    border-collapse: collapse !important;
  }

  th,
  td {
    border: 1px solid #ddd !important;
    padding: 8px !important;
    text-align: left !important;
  }

  thead {
    background-color: #f5f5f5 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  tfoot {
    background-color: #f9f9f9 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Ensure stat cards are visible in print */
  .grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1rem !important;
    margin-bottom: 2rem !important;
  }

  .bg-white {
    background: white !important;
    border: 1px solid #ddd !important;
  }

  /* Page break management */
  .space-y-6 > * {
    page-break-inside: avoid;
  }

  table {
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  thead {
    display: table-header-group;
  }

  tfoot {
    display: table-footer-group;
  }
}
</style>
