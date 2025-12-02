<template>
  <div class="min-h-screen bg-gray-100">
    <AdminHeader @toggleSidebar="toggleSidebar" />
    <AdminSidebar
      :isOpen="isSidebarOpen"
      @open-sidebar="openSidebar"
      @close-sidebar="closeSidebar"
    />

    <div
      v-show="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
    ></div>

    <main
      :class="[
        'mt-16 p-6 transition-all duration-300',
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20',
      ]"
    >
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AdminHeader from "./AdminHeader.vue";
import AdminSidebar from "./AdminSidebar.vue";

const isSidebarOpen = ref(localStorage.getItem("sidebarOpen") !== "false");

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("sidebarOpen", isSidebarOpen.value);
};

const openSidebar = () => {
  isSidebarOpen.value = true;
  localStorage.setItem("sidebarOpen", "true");
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
  localStorage.setItem("sidebarOpen", "false");
};

onMounted(() => {
  // Set initial state from localStorage or default
  const savedState = localStorage.getItem("sidebarOpen");
  if (savedState !== null) {
    isSidebarOpen.value = savedState === "true";
  } else {
    // Default: open on desktop, closed on mobile
    isSidebarOpen.value = window.innerWidth >= 1024;
  }
});
</script>
