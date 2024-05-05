<script setup>
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import useCartStore from "@/stores/cart";
import useAuthStore from "@/stores/auth";
import { computed } from "vue";
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const totalQuantity = computed(() => cartStore.totalQuantity);
function logout() {
  authStore.logout();
  router.push({ path: "/" });
}
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-32">
    <div class="flex flex-col">
      <div class="fixed inset-x-0 top-0 z-50 h-0.5 mt-0.5"></div>
      <nav
        class="flex justify-around py-2 bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">
        <h1 class="text-4xl font-extrabold grad mt-3 hidden lg:block" style="font-family: Lucida Handwriting">
          E-PEKEN
        </h1>
        <nav class="flex my-auto space-x-8">
          <router-link activeClass="text-indigo-700" to="/"
            class="text-gray-600 font-semibold text-xl rounded-xl hover:text-blue-500 cursor-pointer transition-colors duration-300">
            Home
          </router-link>
          <router-link activeClass="text-indigo-700" to="/product"
            class="text-gray-600 font-semibold text-xl rounded-xl hover:text-blue-500 cursor-pointer transition-colors duration-300">
            Product
          </router-link>
          <router-link activeClass="text-indigo-700" to="/productv2"
            class="text-gray-600 font-semibold text-xl rounded-xl hover:text-blue-500 cursor-pointer transition-colors duration-300">
            ProductV2
          </router-link>
          <router-link activeClass="text-indigo-700" to="/about"
            class="text-gray-600 font-semibold text-xl rounded-xl hover:text-blue-500 cursor-pointer transition-colors duration-300">
            About
          </router-link>
        </nav>
        <div class="flex items-center space-x-5">
          <router-link to="/cart" class="flex justify-center items-center">
            <div class="relative py-2">
              <div class="top-4 absolute left-3">
                <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                  {{ totalQuantity }}
                </p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                class="file: mt-4 h-6 w-6 stroke-gray-700 stroke-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
          </router-link>
          <button @click="logout"
            class="flex text-gray-600 cursor-pointer transition-colors duration-300 font-semibold">
            <svg class="fill-current h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
            </svg>
            Log Out
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>
<style scoped></style>
