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
function addCart(product, index) {
  selectedProduct.value = product;
  cartStore.add(product);
  console.log(props.data)
  props.data[index].added = true
  setTimeout(() => {
    props.data[index].added = false
  }, 1500)

  // showModal.value = !showModal.value;
  // setTimeout(() => {
  //   showModal.value = !showModal.value;
  //   selectedProduct.value = null;
  // }, 1500);
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
  <section class="">
    <ul class="grid grid-cols-1 gap-4 mx-auto lg:grid-cols-3">
      <li v-for="(product, index) in data" :key="product.id"
        class=" flex w-full flex-col overflow-hidden bg-white rounded-lg border-2 border-gray-500 shadow-md hover:bg-slate-100 dark:bg-slate-400">
        <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }"
          class="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img class="object-cover bg-red-400 mx-auto rounded-xl" :src="product.image" />
          <span
            class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">50%
            OFF</span>
        </RouterLink>
        <div class="mt-4 p-5">
          <h5 class="tracking-tight text-slate-900 h-12 overflow-hidden text-center px-5 dark:text-gray-200">
            {{ product.title }}
          </h5>
          <div class="mt-2 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900 dark:text-gray-200">${{ product.price }}</span>
              <span class="text-sm text-slate-900 line-through dark:text-white">${{ product.price * 2 }}</span>
            </p>
            <div class="grid">
              <div class="flex justify-end">
                <div class="w-24 mx-2">
                  <p class="text-2xl bg-yellow-500 overflow-hidden bg-clip-text text-transparent "
                    :style="{ width: `${product.rating.rate * 20}%` }">
                    ✮✮✮✮✮</p>
                </div>
                <span class="mr-2 rounded bg-yellow-500 px-2.5 py-1 font-semibold dark:text-gray-100">{{
          product.rating.rate
        }}</span>
              </div>
              <p class="font-medium text-gray-900 underline hover:no-underline text-right mr-2 dark:text-gray-200">
                Reviews
                {{ product.rating.count }}
              </p>
            </div>
          </div>
          <span class="my-4">
            <p v-show="product.added" class=" absolute text-center font-semibold text-xl text-green-500">Item
              Added</p>
          </span>
          <button @click="addCart(product, index)"
            class="w-full mt-8 flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
