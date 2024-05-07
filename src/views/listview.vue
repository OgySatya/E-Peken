<script setup>
import { ref } from "vue";
import useCartStore from "@/stores/cart";
import useProductStore from "@/stores/product";

const productStore = useProductStore();
const cartStore = useCartStore();

const props = defineProps({
  data: Array,
});
function addCart(product) {
  cartStore.add(product);
}
let ascName = ref(true);
function sortName() {
  ascName.value = !ascName.value;
  productStore.sortByname(ascName.value)
}
let ascPrice = ref(true);
function sortPrice() {
  ascPrice.value = !ascPrice.value;
  productStore.sortByprice(ascPrice.value)
}
let ascRating = ref(true);
function sortRating() {
  ascRating.value = !ascRating.value;
  productStore.sortByrating(ascRating.value)
}
</script>

<template>
  <table class="w-fit text-left mx-auto">
    <thead class="text-gray-100 uppercase bg-gray-600 border-4">
      <tr>
        <th scope="col" class="px-16 py-3">
          <span class="sr-only">Image</span>
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            Product Name
            <button @click="sortName()" class="ml-3">
              <svg class="w-5 h-5 text-gray-100 dark:text-white transition-all duration-500"
                :class="{ 'rotate-180': !ascName }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
              </svg>
            </button>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            Rating
            <button @click="sortRating()" class="ml-3">
              <svg class="w-5 h-5 text-gray-100 dark:text-white transition-all duration-500"
                :class="{ 'rotate-180': !ascRating }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
              </svg>
            </button>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex items-center">
            Price
            <button @click="sortPrice()" class="ml-3">
              <svg class="w-5 h-5 text-gray-100 dark:text-white transition-all duration-500"
                :class="{ 'rotate-180': !ascPrice }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
              </svg>
            </button>
          </div>
        </th>
        <th scope="col" class="sr-only">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in data" :key="product.id" class="border-b hover:bg-gray-100">
        <td class="p-2 w-24 h-16 overflow-hidden">
          <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }">
            <img :src="product.image" class="h-20 mx-auto" />
          </RouterLink>
        </td>
        <td class="px-2 py-2 w-64">
          <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }"
            class="text-wrap font-semibold text-gray-900 overflow-hidden">
            {{ product.title }}
          </RouterLink>
        </td>
        <td class="px-2 py-4">
          <div class="flex items-center text-center">
            <svg class="w-5 h-5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>

            <p class="ms-2 font-bold text-gray-900">
              {{ product.rating.rate }}
            </p>
          </div>
        </td>
        <td class="px-2 py-4 font-semibold text-gray-900 dark:text-white">
          ${{ product.price }}
        </td>
        <td class="px-2 py-4">
          <button @click="addCart(product)"
            class="text-gray-100 text-xs bg-gray-600 rounded-lg p-1 px-3 text-center hover:scale-110 transition-transform fill-gray-200">
            Add
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style></style>
