<template>
  <header
    class="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 right-0 left-0 z-10"
  >
    <div class="h-full px-6 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="$emit('toggleSidebar')"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <svg
            class="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 class="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg
            class="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-sm font-medium">A</span>
          </div>
          <div class="hidden md:block">
            <p class="text-sm font-medium text-gray-800">Admin</p>
            <!-- <p class="text-xs text-gray-500">admin@laundry.com</p> -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup></script>
