<template>
  <div class="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div
          class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14"
        >
          <div
            class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-5 rounded-full"
          ></div>
          <div
            class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white opacity-5 rounded-full"
          ></div>

          <div class="relative text-center">
            <!-- <div
              class="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl mb-4 sm:mb-6 shadow-xl transform hover:scale-105 transition-transform"
            >
              <svg
                class="w-10 h-10 sm:w-12 sm:h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div> -->
            <h1
              class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight"
            >
              Laundry Management
            </h1>
            <!-- <p class="text-blue-100 text-sm sm:text-base opacity-90">
              Sistem Manajemen Laundry Profesional
            </p> -->
          </div>
        </div>

        <div class="px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <form @submit.prevent="handleLogin" class="space-y-5 sm:space-y-6">
            <div>
              <label
                class="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
              >
                Username atau Email
              </label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  v-model="loginData.username"
                  class="w-full pl-12 pr-4 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm sm:text-base"
                  placeholder="Masukkan username atau email"
                  required
                />
              </div>
            </div>

            <div>
              <label
                class="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="loginData.password"
                  class="w-full pl-12 pr-12 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm sm:text-base"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg
                    v-if="showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="loginData.rememberMe"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span
                  class="ml-2 text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors"
                  >Ingat saya</span
                >
              </label>
              <a
                href="#"
                class="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all"
              >
                Lupa password?
              </a>
            </div>

            <div
              v-if="errorMessage"
              class="p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-shake"
            >
              <div class="flex items-start gap-3 text-red-800">
                <svg
                  class="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="flex-1">
                  <p class="text-sm sm:text-base font-semibold">
                    {{ errorMessage }}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
            >
              <span
                v-if="!isLoading"
                class="flex items-center justify-center gap-2"
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Masuk ke Dashboard
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </span>
            </button>
          </form>
        </div>

        <div
          class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 sm:px-8 sm:py-6 border-t border-gray-200"
        >
          <div class="text-center space-y-3">
            <div
              class="inline-flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2"
            >
              <!-- <svg
                class="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg> -->
              <!-- <p class="text-xs sm:text-sm text-blue-800 font-medium">
                Demo: <span class="font-bold">admin</span> /
                <span class="font-bold">admin123</span>
              </p> -->
            </div>
            <p class="text-xs text-gray-500">
              &copy; 2024 Laundry Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const loginData = ref({
  username: "",
  password: "",
  rememberMe: false,
});

const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      loginData.value.username === "admin" &&
      loginData.value.password === "admin123"
    ) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: loginData.value.username,
          fullName: "Admin Laundry",
        })
      );

      router.push("/");
    } else {
      errorMessage.value = "Username atau password salah. Silakan coba lagi.";
    }
  } catch (error) {
    errorMessage.value = "Terjadi kesalahan. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};
</script>
