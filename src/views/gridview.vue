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
  }, 3000);
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
    <ul class="grid grid-cols-3 gap-4 w-fit mx-auto">
      <li
        v-for="product in data"
        :key="product.id"
        class="relative flex w-full max-w-xs flex-col overflow-hidden bg-white rounded-lg border border-gray-200 shadow-md"
      >
        <RouterLink
          :to="{ name: 'productinfo', params: { id: product.id } }"
          class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
          href="#"
        >
          <img class="object-cover bg-red-400 mx-auto" :src="product.image" />
          <span
            class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"
            >50% OFF</span
          >
        </RouterLink>
        <div class="mt-4 px-5 pb-5">
          <h5 class="tracking-tight text-slate-900 h-12 overflow-hidden">
            {{ product.title }}
          </h5>
          <div class="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900"
                >${{ product.price }}</span
              >
              <span class="text-sm text-slate-900 line-through"
                >${{ product.price * 2 }}</span
              >
            </p>
            <div class="grid">
              <div class="flex items-center">
                <svg
                  aria-hidden="true"
                  class="h-6 w-6 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <span class="w-1 h-1 mx-1.5 bg-gray-700 rounded-full"></span>
                <span
                  class="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold"
                  >{{ product.rating.rate }}</span
                >
              </div>
              <p
                class="font-medium text-xs text-gray-900 underline hover:no-underline text-center"
              >
                Reviews
                {{ product.rating.count }}
              </p>
            </div>
          </div>
          <button
            @click="addCart(product)"
            class="w-full flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style></style>
