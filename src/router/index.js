import { createRouter, createWebHistory } from "vue-router";
import authService from "../services/auth";
import AdminDashboard from "../pages/AdminDashboard.vue";
import CustomerData from "../pages/CustomerData.vue";
import AddCustomer from "../pages/AddCustomer.vue";
import TransactionData from "../pages/TransactionData.vue";
import AddTransaction from "../pages/AddTransaction.vue";
import ReportData from "../pages/ReportData.vue";
import KelolaLayanan from "../pages/KelolaLayanan.vue";
import Settings from "../pages/Settings.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/customers",
    name: "Customers",
    component: CustomerData,
    meta: { requiresAuth: true },
  },
  {
    path: "/customers/add",
    name: "AddCustomer",
    component: AddCustomer,
    meta: { requiresAuth: true },
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: TransactionData,
    meta: { requiresAuth: true },
  },
  {
    path: "/transactions/add",
    name: "AddTransaction",
    component: AddTransaction,
    meta: { requiresAuth: true },
  },
  {
    path: "/reports",
    name: "Reports",
    component: ReportData,
    meta: { requiresAuth: true },
  },
  {
    path: "/kelola-layanan",
    name: "KelolaLayanan",
    component: KelolaLayanan,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
