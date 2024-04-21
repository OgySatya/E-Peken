<script setup>
import { ref, computed, onMounted } from 'vue';

const allProduct = ref()
const cariSesuatu = ref()
onMounted(() => {
    getProduct()
})
async function getProduct() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    allProduct.value = data
}
const currentPage = ref(1);

const totalPages = computed(() => {
    return Math.ceil(allProduct.value.length / 6);
});

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * 6;
    const endIndex = startIndex + 6;
    return allProduct.value.slice(startIndex, endIndex);
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
    return allProduct.value.filter(n => n.title ? n.title.toLowerCase().includes(cariSesuatu.value.toLowerCase()) : ""
    )
})

</script>
<template>
    <form class="flex w-1/3 items-center mx-auto mt-5" @submit.prevent="newSearch">
        <input v-model="cariSesuatu" type="text" placeholder="Cari Sesuatu"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <button type="submit"
            class="p-2.5 ms-2 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
        </button>
    </form>
    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button type="button"
            class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">All
            categories</button>
        <button type="button"
            class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Shoes</button>
        <button type="button"
            class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Bags</button>
        <button type="button"
            class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Electronics</button>
        <button type="button"
            class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Gaming</button>
    </div>
    <v-list class="grid grid-cols-3 gap-4 w-3/4 mx-auto">
        <v-list-item v-for="product in filteredName" :key="product.id"
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
                <a
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center">Add
                    to cart</a>
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