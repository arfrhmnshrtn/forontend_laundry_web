<template>
  <div class="min-h-screen bg-gray-100">
    <AdminHeader @toggleSidebar="toggleSidebar" />
    <AdminSidebar :isOpen="isSidebarOpen" @open-sidebar="openSidebar" />

    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-opacity-50 z-20 lg:hidden mt-16"
    ></div>

    <main
      :class="[
        'mt-16 p-6 transition-all duration-300',
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20 max-lg:ml-0',
      ]"
    >
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AdminHeader from "./AdminHeader.vue";
import AdminSidebar from "./AdminSidebar.vue";

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const openSidebar = () => {
  isSidebarOpen.value = true;
};
</script>
