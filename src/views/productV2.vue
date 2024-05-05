<script setup>
import gridview from "./gridview.vue";
import listview from "./listview.vue";
import sidebar from "../components/sidebar.vue";
import { ref, computed, onMounted, watch } from "vue";
import useProductStore from "@/stores/product.js";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProducts();
  if (window.innerWidth < 640) {
    gridList(false);
  }
});

const keyword = ref("");

watch(keyword, (value) => productStore.search(value));

const products = computed(() => productStore.paginatedData);

function previousPage() {
  if (productStore.currentPage > 1) {
    productStore.currentPage--;
  }
}

function nextPage() {
  if (productStore.currentPage < productStore.totalPages) {
    productStore.currentPage++;
  }
}
function toPage(id) {
  productStore.currentPage = id
}
function gridList(lean) {
  productStore.pageSize = lean ? 6 : 10;
  viewType.value = lean;
}
const viewType = ref(true);
</script>

<template>
  <div class="flex w-full">
    <sidebar @add="(bool) => gridList(bool)" />
    <div class="grid w-auto mx-auto">
      <form class="justify-center mx-auto mb-5">
        <input v-model="keyword" type="text" placeholder="Cari Sesuatu"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-80" />
      </form>
      <div>
        <gridview v-if="viewType" :data="products" />
        <listview class="" v-else :data="products" />
      </div>
      <nav class="w-auto mx-auto mt-5">
        <ul class="inline-flex -space-x-px text-base h-10">
          <li>
            <button @click="previousPage()"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-teal-300 border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
          </li>
          <li v-for="page in productStore.pageRange">
            <button @click="toPage(page)" :class="{ 'bg-teal-300 text-neutral-100': productStore.currentPage === page }"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{
      page }}</button>
          </li>
          <li>
            <button @click="nextPage()"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-teal-300  border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
