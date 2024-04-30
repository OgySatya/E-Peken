<script setup>
import gridview from './gridview.vue'
import listview from './listview.vue'
import sidebar from '../components/sidebar.vue'
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '../cartstore.js'

const store = useCartStore()

onMounted(() => {
    getProduct()
    if (window.innerWidth < 640) {
        gridList(false)
    }
})
async function getProduct() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    store.allProduct = data;
}

const currentPage = ref(1);
const page = ref(6)

const totalPages = computed(() => {
    return Math.ceil(store.filteredName.length / page.value);
});

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * page.value;
    const endIndex = startIndex + page.value;
    return store.filteredName.slice(startIndex, endIndex);
});

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}
function gridList(lean) {
    page.value = lean ? 6 : 10;
    viewType.value = lean
}
const viewType = ref(true)
</script>
<template>
    <div class="flex mx-auto w-max">
        <sidebar @add="(bool) => gridList(bool)" />
        <div>
            <form class="flex justify-center mx-auto mb-5" @submit.prevent="newSearch">
                <input v-model="store.cari" type="text" placeholder="Cari Sesuatu"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5" />
                <button type="submit"
                    class="p-2.5 ms-2 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </form>
            <div>
                <gridview v-if="viewType" :data="paginatedData" />
                <listview v-else :data="paginatedData" />
            </div>
            <nav class="w-3/4 mt-5 mx-auto">
                <ul class="flex justify-between text-lg font-bold">
                    <li>
                        <button @click="previousPage()"
                            class="relative block rounded bg-transparent px-3 py-1.5 text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none focus:ring-0 active:bg-neutral-100 active:text-primary-700">Previous</button>
                    </li>
                    <div class="flex">
                        <!-- <li>
                    <button
                        class="relative block rounded bg-transparent px-3 py-1.5 text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700">1</button>
                </li> -->
                        <li>
                            <button
                                class="relative block rounded bg-transparent px-3 py-1.5 text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700">{{
            currentPage }}</button>
                        </li>
                        <!-- <li>
                    <button @click=""
                        class="relative block rounded bg-transparent px-3 py-1.5 text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700">{{
                        totalPages }}</button>
                </li> -->
                    </div>
                    <li>
                        <button @click="nextPage()"
                            class="relative block rounded bg-transparent px-3 py-1.5 text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>