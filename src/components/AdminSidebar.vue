<template>
  <aside
    :class="[
      'bg-gray-900 text-white fixed left-0 top-16 bottom-0 overflow-y-auto overflow-x-hidden transition-all duration-300',
      isOpen ? 'w-64 z-30' : 'w-20 lg:w-20 max-lg:hidden z-20',
    ]"
  >
    <nav class="p-4">
      <ul class="space-y-2">
        <li class="relative group">
          <router-link
            to="/"
            :class="[
              'flex items-center rounded-lg hover:bg-gray-800 transition-colors',
              isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-4 py-3',
            ]"
            active-class="bg-blue-600 hover:bg-blue-700"
            @click="handleMenuClick"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span v-if="isOpen" class="font-medium">Dashboard</span>
          </router-link>
          <div
            v-if="!isOpen"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2"
          >
            Dashboard
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"
            ></div>
          </div>
        </li>

        <li class="relative group">
          <router-link
            to="/customers"
            :class="[
              'flex items-center rounded-lg hover:bg-gray-800 transition-colors',
              isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-4 py-3',
            ]"
            active-class="bg-blue-600 hover:bg-blue-700"
            @click="handleMenuClick"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
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
            <span v-if="isOpen" class="font-medium">Data Pelanggan</span>
          </router-link>
          <div
            v-if="!isOpen"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2"
          >
            Data Pelanggan
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"
            ></div>
          </div>
        </li>

        <li class="relative group">
          <router-link
            to="/transactions"
            :class="[
              'flex items-center rounded-lg hover:bg-gray-800 transition-colors',
              isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-4 py-3',
            ]"
            active-class="bg-blue-600 hover:bg-blue-700"
            @click="handleMenuClick"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
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
            <span v-if="isOpen" class="font-medium">Data Transaksi</span>
          </router-link>
          <div
            v-if="!isOpen"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2"
          >
            Data Transaksi
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"
            ></div>
          </div>
        </li>

        <li class="relative group">
          <router-link
            to="/kelola-layanan"
            :class="[
              'flex items-center rounded-lg hover:bg-gray-800 transition-colors',
              isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-4 py-3',
            ]"
            active-class="bg-blue-600 hover:bg-blue-700"
            @click="handleMenuClick"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2a2 2 0 00-2 2v3a2 2 0 002 2h2m-4 0h-4m4 0h4m-4 0h-4m4 0h4"
              />
            </svg>
            <span v-if="isOpen" class="font-medium">Kelola Layanan</span>
          </router-link>
          <div
            v-if="!isOpen"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2"
          >
            Kelola Layanan
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"
            ></div>
          </div>
        </li>

        <li class="relative group">
          <router-link
            to="/reports"
            :class="[
              'flex items-center rounded-lg hover:bg-gray-800 transition-colors',
              isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-4 py-3',
            ]"
            active-class="bg-blue-600 hover:bg-blue-700"
            @click="handleMenuClick"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span v-if="isOpen" class="font-medium">Data Laporan</span>
          </router-link>
          <div
            v-if="!isOpen"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2"
          >
            Data Laporan
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"
            ></div>
          </div>
        </li>

        <li class="pt-4 mt-4 border-t border-gray-700 relative group">
          <router-link
            to="/settings"
            :class="[
              'flex items-center rounded-lg hover:bg-gray-800 transition-colors',
              isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-4 py-3',
            ]"
            active-class="bg-blue-600 hover:bg-blue-700"
            @click="handleMenuClick"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span v-if="isOpen" class="font-medium">Settings</span>
          </router-link>
          <div
            v-if="!isOpen"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2"
          >
            Settings
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"
            ></div>
          </div>
        </li>

        <li class="relative group">
          <button
            @click="handleLogout"
            :class="[
              'w-full flex items-center rounded-lg hover:bg-gray-800 transition-colors text-red-400 hover:text-red-300',
              isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-4 py-3',
            ]"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span v-if="isOpen" class="font-medium">Logout</span>
          </button>
          <div
            v-if="!isOpen"
            class="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2"
          >
            Logout
            <div
              class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"
            ></div>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["open-sidebar"]);

const handleMenuClick = () => {
  if (!props.isOpen) {
    emit("open-sidebar");
  }
};

const handleLogout = () => {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    router.push("/");
  }
};
</script>
