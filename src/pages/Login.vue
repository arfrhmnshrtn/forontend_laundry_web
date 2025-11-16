<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white shadow-md rounded-xl p-8 w-full max-w-sm">
      <h2 class="text-center text-gray-700 text-lg font-semibold mb-6">
        Masuk Akun
      </h2>

      <div
        v-if="errorMessage"
        class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="login">
        <div class="mb-4">
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div class="mb-4 relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <svg
              v-if="!showPassword"
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

        <button
          type="submit"
          :disabled="loading"
          class="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:bg-blue-400"
        >
          {{ loading ? "Loading..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login as authLogin } from "../services/auth";

const router = useRouter();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");

const login = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await authLogin(username.value, password.value);

    if (response.token) {
      router.push("/dashboard");
    }

    console.log(response);
  } catch (error) {
    errorMessage.value = error.message || "Login gagal. Silakan coba lagi.";
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
