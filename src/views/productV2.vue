<script setup>
import gridview from "./gridview.vue";
import listview from "./listview.vue";
import sidebar from "../components/sidebar.vue";
import { ref, computed, onMounted, watch } from "vue";
import useProductStore from "@/stores/product.js";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProducts();
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
const viewType = ref(true);
function gridList(lean) {
  productStore.pageSize = lean ? 6 : 10;
  viewType.value = lean;
}
const open = ref(false)
function toggel() {
  open.value = !open.value
}
</script>

<template>
  <div class="flex w-full">
    <div class="grid">

      <sidebar :side="open" />
    </div>
    <div class="grid mx-auto w-fit">
      <div class="flex my-5 px-5 w-full">
        <button @click.prevent="toggel()" class="">
          <svg :class="{ 'rotate-180': open }" class="transition-all duration-500 dark:stroke-white"
            xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 16 16" fill="none">
            <g fill="#000000">
              <path
                d="M7.774 5.263a.7.7 0 11.952-1.026l3.5 3.25a.7.7 0 010 1.026l-3.5 3.25a.7.7 0 01-.952-1.026L10.72 8 7.774 5.263z" />
              <path fill-rule="evenodd"
                d="M1 3.25A2.25 2.25 0 013.25 1h9.5A2.25 2.25 0 0115 3.25v9.5A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-9.5zm2.25-.75a.75.75 0 00-.75.75v9.5c0 .414.336.75.75.75h1.3v-11h-1.3zm9.5 11h-6.8v-11h6.8a.75.75 0 01.75.75v9.5a.75.75 0 01-.75.75z"
                clip-rule="evenodd" />
            </g>
          </svg>
        </button>
        <form class="flex w-full mx-auto">
          <input v-model="keyword" type="text" placeholder="Cari Sesuatu"
            class="w-max lg:w-1/3 mx-auto bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" />
        </form>
        <div class="hidden lg:flex gap-5">
          <button @click=" gridList(true)" class=" ">
            <svg class="w-[40px] h-[40px]" :class="{ ' bg-slate-400 text-white rounded-md': viewType }"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
            </svg>
          </button>
          <button @click="gridList(false)" class=" ">
            <svg class="w-[40px] h-[40px]" :class="{ ' bg-slate-400 text-white rounded-md': !viewType }"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <gridview class="w-full" v-if="viewType" :data="products" />
        <listview class="w-full" v-else :data="products" />
      </div>
      <nav class="w-auto mx-auto mt-5">
        <ul class="inline-flex -space-x-px text-base h-10">
          <li>
            <button @click="previousPage()"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-teal-300 border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
          </li>
          <li v-for="page in productStore.pageRange">
            <button @click="toPage(page)"
              :class="{ 'bg-teal-300 text-neutral-100 dark:bg-slate-300 dark:text-black': productStore.currentPage === page }"
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
