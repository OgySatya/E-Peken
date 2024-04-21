<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const detailProduct = ref({})

onMounted(() => {
    dataProduct(route.params.id)
})
async function dataProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    detailProduct.value = data
    console.log(data)
}


</script>
<template>
    <section class="text-gray-700 body-font overflow-hidden">
        <div class="container p-5 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <img alt="ecommerce" class="lg:w-1/2 w-fit object-cover object-center rounded border border-gray-200"
                    :src="detailProduct.image">
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 class="text-sm title-font text-gray-500 tracking-widest">PRODUCT NAME</h2>
                    <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ detailProduct.title }}</h1>
                    <h3
                        class="text-white text-xl title-font font-medium mb-1 bg-stone-700 capitalize w-fit px-2 rounded">
                        {{
                        detailProduct.category }}
                    </h3>
                    <p class="leading-relaxed my-5">{{ detailProduct.description }}</p>
                    <div class="flex items-center pb-5 border-b-2 border-gray-200 mb-5">
                        <div class="flex">
                            <span class="mr-3">Color</span>
                            <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                            <button
                                class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                            <button
                                class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                        </div>
                        <div class="flex ml-6 items-center">
                            <span class="mr-3">Size</span>
                            <div class="relative">
                                <select
                                    class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                    <option>SM</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                </select>
                                <span
                                    class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                        <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <span class="title-font font-medium text-2xl text-gray-900">${{ detailProduct.price }}</span>
                        <button
                            class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add
                            to Cart</button>
                    </div>
                    <div class="mt-10">
                        <RouterLink
                            class="text-blue-700 text-center text-xl font-semibold p-2 px-4 border-2 border-gray-700 rounded-full"
                            to="/product">
                            Kembali
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>