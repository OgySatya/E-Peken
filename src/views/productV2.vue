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

const currentPage = ref(1);
const page = ref(6);
const keyword = ref("");

watch(keyword, (value) => productStore.search(value));

const products = computed(() => productStore.filteredProducts);

// const totalPages = computed(() => {
//   return Math.ceil(store.filteredName.length / page.value);
// });

// const paginatedData = computed(() => {
//   const startIndex = (currentPage.value - 1) * page.value;
//   const endIndex = startIndex + page.value;
//   return store.filteredName.slice(startIndex, endIndex);
// });

// function previousPage() {
//   if (currentPage.value > 1) {
//     currentPage.value--;
//   }
// }

// function nextPage() {
//   if (currentPage.value < totalPages.value) {
//     currentPage.value++;
//   }
// }
function gridList(lean) {
  page.value = lean ? 6 : 10;
  viewType.value = lean;
}
const viewType = ref(true);
</script>

<template>
  <div class="flex w-full">
    <sidebar @add="(bool) => gridList(bool)" />
    <div class="grid w-auto mx-auto">
      <form
        class="justify-center mx-auto mb-5"
      >
        <input
          v-model="keyword"
          type="text"
          placeholder="Cari Sesuatu"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-80"
        />
      </form>
      <div>
        <gridview v-if="viewType" :data="products" />
        <listview class="" v-else :data="products" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
