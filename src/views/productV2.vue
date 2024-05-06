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
const open = ref(false)
function toggel() {
  open.value = !open.value
}
</script>

<template>
  <div class="flex w-full">
    <div class="grid">
      <section>
        <div class="flex justify-between px-2 -mb-16 mt-16">
          <button @click.prevent="toggel()"
            class="p-1 h-fit rounded bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300">
            <svg class="w-[40px] h-[40px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
          <Transition>
            <button @click="viewType = true" :class="[open ? '' : 'hidden']"
              class=" p-1 h-fit rounded bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-all duration-1000">
              <svg class="w-[40px] h-[40px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
              </svg>
            </button>
          </Transition>
          <button @click="viewType = false" :class="[open ? '' : 'hidden']"
            class="p-1 h-fit rounded bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300">
            <svg class="w-[40px] h-[40px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
            </svg>
          </button>
        </div>
      </section>
      <sidebar :side="open" />
    </div>
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
