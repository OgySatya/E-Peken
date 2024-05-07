<script setup>
import { ref } from "vue";
import useCartStore from "@/stores/cart";
import modal from "./modal/addmodal.vue";
const cartStore = useCartStore();

const props = defineProps({
  data: Array,
});
const selectedProduct = ref(null);
const showModal = ref(false);
function addCart(product) {
  selectedProduct.value = product;
  cartStore.add(product);
  showModal.value = !showModal.value;
  setTimeout(() => {
    showModal.value = !showModal.value;
    selectedProduct.value = null;
  }, 1500);
}
</script>

<template>
  <section>
    <Teleport to="body">
      <Transition>
        <modal v-if="showModal" :data="selectedProduct" />
      </Transition>
    </Teleport>
  </section>
  <section>
    <ul class="grid grid-cols-3 gap-4 w-full">
      <li v-for="product in data" :key="product.id"
        class="relative flex w-full flex-col overflow-hidden bg-white rounded-lg border-2 border-gray-500 shadow-md">
        <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }"
          class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img class="object-cover bg-red-400 mx-auto" :src="product.image" />
          <span
            class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">50%
            OFF</span>
        </RouterLink>
        <div class="mt-4 p-5">
          <h5 class="tracking-tight text-slate-900 h-12 overflow-hidden text-center px-5">
            {{ product.title }}
          </h5>
          <div class="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900">${{ product.price }}</span>
              <span class="text-sm text-slate-900 line-through">${{ product.price * 2 }}</span>
            </p>
            <div class="grid">
              <div class="flex items-center">
                <p
                class="text-2xl bg-yellow-600 overflow-hidden text-transparent bg-clip-text":style="{width: `${product.rating.rate*12}%`}">
                ✮✮✮✮✮
              </p>
              <!-- <div class="bg-slate-600 text-xs rounded-lg pl-2 text-white reverse max-w-60" :style="{width: `${stat.base_stat}%`}">{{ stat.base_stat }}</div> -->
                <span class="w-1.5 h-1.5 mx-1.5 bg-gray-700 rounded-full"></span>
                <span class="mr-2 rounded bg-yellow-200 px-2.5 py-1 font-semibold">{{ product.rating.rate
                  }}</span>
              </div>
              <p class="font-medium text-gray-900 underline hover:no-underline text-right mr-2">
                Reviews
                {{ product.rating.count }}
              </p>
            </div>
          </div>
          <button @click="addCart(product)"
            class="w-full flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style></style>
