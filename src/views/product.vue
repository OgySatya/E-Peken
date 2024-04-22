<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '../cartstore.js'

const store = useCartStore()

const allProduct = ref([])
const cari = ref('')
const categories = ref([
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
])
const selected = ref('')
onMounted(() => {
    getProduct()
})
async function getProduct() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    allProduct.value = data
}
async function getProductCategory(param) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${param}`);
    const data = await response.json();
    allProduct.value = data
}
const currentPage = ref(1);

const totalPages = computed(() => {
    return Math.ceil(filteredName.value.length / 6);
});

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * 6;
    const endIndex = startIndex + 6;
    return filteredName.value.slice(startIndex, endIndex);
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

const filteredName = computed(() => {
    return allProduct.value.filter(name => name.title ?
        name.title.toLowerCase().includes(cari.value.toLowerCase()) : ''
    )
})

</script>
<template>
    <form class="flex w-1/3 items-center mx-auto mt-5" @submit.prevent="newSearch">
        <input v-model="cari" type="text" placeholder="Cari Sesuatu"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <button type="submit"
            class="p-2.5 ms-2 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
        </button>
    </form>

    <ul
        class="items-center w-3/4 mx-auto my-3 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center ps-3">
                <input type="radio" v-model="selected" value="" @change="getProduct()"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                <label class="w-full py-1 ms-2 mx-auto my-1 font-medium text-gray-900 dark:text-gray-300">All Categories
                </label>
            </div>
        </li>
        <li v-for="category in categories"
            class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center ps-3">
                <input type="radio" v-model="selected" :value=category @change="getProductCategory(selected)"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                <label class="w-full capitalize py-1 ms-2 mx-auto my-1 font-medium text-gray-900 dark:text-gray-300">{{
        category }}
                </label>
            </div>
        </li>
    </ul>
    <v-list class="grid grid-cols-3 gap-4 container mx-auto">
        <v-list-item v-for="product in paginatedData" :key="product.id"
            class="border-gray-400 border-4 rounded-lg p-5 hover:border-yellow-700">
            <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }">
                <div class="h-64 overflow-hidden content-center">
                    <img class="mx-auto w-48" :src=product.image />
                </div>
                <h5 class="text-xl font-semibold text-wrap text-gray-900">{{ product.title }}
                </h5>
            </RouterLink>
            <div class="flex items-center justify-between place-self-end ">
                <span class="text-3xl font-bold text-gray-900 ">$ {{ product.price }}</span>
                <button @click="store.increment()"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center">Add
                    to cart</button>
            </div>
        </v-list-item>
    </v-list>
    <nav class="w-3/4 mt-5 mx-auto">
        <ul class="flex justify-between">
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
</template>
