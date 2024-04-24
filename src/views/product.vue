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
  allProduct.value = data;
}
async function getProductCategory(param) {
  const response = await fetch(`https://fakestoreapi.com/products/category/${param}`);
  const data = await response.json();
  allProduct.value = data;
}
let ascName = ref(true)
function sortName() {
  ascName.value = !ascName.value
  if (ascName.value === true) {
    allProduct.value = filteredName.value.slice().sort((a, b) => a.title.localeCompare(b.title));
  } else if (ascName.value === false) {
    allProduct.value = filteredName.value.slice().sort((a, b) => b.title.localeCompare(a.title));
  }
  console.log(filteredName.value)
  console.log(ascName.value)
}
let ascPrice = ref(true)
function sortPrice() {
  ascPrice.value = !ascPrice.value
  if (ascPrice.value === true) {
    allProduct.value = filteredName.value.slice().sort((a, b) => a.price - b.price);
  } else if (ascPrice.value === false) {
    allProduct.value = filteredName.value.slice().sort((a, b) => b.price - a.price);
  }
  console.log(filteredName.value)
  console.log(ascPrice.value)
}

let ascRating = ref(true)
function sortRating() {
  ascRating.value = !ascRating.value
  if (ascRating.value === true) {
    allProduct.value = filteredName.value.slice().sort((a, b) => a.rating.rate - b.rating.rate);
  } else if (ascRating.value === false) {
    allProduct.value = filteredName.value.slice().sort((a, b) => b.rating.rate - a.rating.rate);
  }
  console.log(allProduct.value)
  console.log(ascRating.value)
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
function addCart(product) {
  if (!store.cartData.some(item => item.title === product.title)) {
    product.count = 1;
    store.product.value = product
    store.addProduct()
  } else {
    const index = store.cartData.findIndex(item => item.title === product.title)
    ++store.cartData[index].count
  }
}

</script>
<template>
  <button class="border bg-slate-300">test</button>
  <div class="flex w-10/12 mx-auto">
    <div
      class="relative flex h-[calc(100vh-2rem)] w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div class="p-4 mb-2">
        <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Sidebar
        </h5>
      </div>
      <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <div class="relative block w-full">
          <div role="button"
            class="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start text-blue-gray-700 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <button type="button"
              class="flex items-center justify-between w-full font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900">
              <div class="grid mr-4 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                  class="w-6 h-6">
                  <path fill-rule="evenodd"
                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <p class="block mr-auto font-sans antialiased font-bold text-xl leading-relaxed text-blue-gray-900">
                Category
              </p>
              <span class="ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                  stroke="currentColor" aria-hidden="true" class="w-4 h-4 mx-auto transition-transform rotate-180">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                </svg>
              </span>
            </button>
          </div>
          <div class="overflow-hidden">
            <div class="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
              <nav class="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                <div v-for="category in categories"
                  class="flex items-center w-full p-1 pl-5 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <div class="">
                    <input type="radio" v-model="selected" :value=category @change="getProductCategory(selected)"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                    <label class="capitalize py-1 ms-2 mx-auto my-1 text-gray-900 dark:text-gray-300">{{
                  category }}
                    </label>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div class="relative block w-full">
          <div role="button"
            class="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <button type="button"
              class="flex items-center justify-between w-full font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
              <div class="grid mr-4 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                  class="w-6 h-6">
                  <path fill-rule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <p class="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                Sort By
              </p>
              <span class="ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                  stroke="currentColor" aria-hidden="true" class="w-4 h-4 mx-auto transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                </svg>
              </span>
            </button>
          </div>
          <div class="overflow-hidden">
            <div class="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
              <nav class="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                <div role="button" @click="sortName()"
                  class="flex items-center w-full p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <span class="mr-2">Name</span>
                  <svg :class="{ 'rotate-180': !ascName }" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                    class="w-4 h-4 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </div>
                <div role="button" @click="sortPrice()"
                  class="flex items-center w-full p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <span class="mr-2">Price</span>
                  <svg :class="{ 'rotate-180': !ascPrice }" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                    class="w-4 h-4 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </div>
                <div role="button" @click="sortRating()"
                  class="flex items-center w-full p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <span class="mr-2">Rating</span>
                  <svg :class="{ 'rotate-180': !ascRating }" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                    class="w-4 h-4 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div role="button"
          class="flex items-center w-full leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
          <div class="grid mr-4 place-items-center">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1" id="Capa_1" viewBox="0 0 133.865 133.865" xml:space="preserve">
              <g>
                <path style="fill:#FF8898;"
                  d="M66.939,10.593c20.481,0,37.97,13.05,44.595,31.271h4.85C109.568,21.067,89.985,6,66.939,6   c-23.047,0-42.63,15.067-49.446,35.865h4.85C28.968,23.643,46.457,10.593,66.939,10.593z" />
                <path style="fill:#FFEB97;"
                  d="M120.479,47.865H13.385c-3.834,0-6.953,3.119-6.953,6.953c0,3.928,3.119,7.047,6.953,7.047h107.094   c3.834,0,6.953-3.119,6.953-6.953C127.432,50.984,124.313,47.865,120.479,47.865z" />
                <path style="fill:#586065;"
                  d="M122.718,42.072C115.767,17.812,93.402,0,66.939,0c-26.462,0-48.829,17.812-55.78,42.07   C5.076,43.131,0.432,48.446,0.432,54.912c0,5.848,3.897,10.797,9.229,12.402c0.532,3.29,1.347,6.484,2.408,9.566l7.508,56.985   h95.31l7.94-60.262c0.573-2.056,1.043-4.153,1.388-6.293c5.326-1.611,9.216-6.572,9.216-12.492   C133.432,48.44,128.796,43.138,122.718,42.072z M66.939,6c23.046,0,42.628,15.067,49.445,35.865h-4.85   c-6.625-18.221-24.113-31.271-44.595-31.271c-20.482,0-37.971,13.05-44.596,31.271h-4.85C24.309,21.067,43.892,6,66.939,6z    M105.089,41.865H28.788c6.311-14.839,21.035-25.271,38.151-25.271C84.054,16.593,98.778,27.025,105.089,41.865z M45.432,127.865   H24.84l-2.24-17h22.833V127.865z M45.432,104.865H21.809l-1.977-15h25.6V104.865z M45.432,83.865h-26.39l-2.108-16h28.498V83.865z    M83.432,127.865h-32v-17h32V127.865z M83.432,104.865h-32v-15h32V104.865z M83.432,83.865h-32v-16h32V83.865z M109.626,127.865   H89.432v-17h22.434L109.626,127.865z M112.656,104.865H89.432v-15h25.2L112.656,104.865z M115.424,83.865H89.432v-16h28.099   L115.424,83.865z M120.479,61.865H13.385c-3.834,0-6.953-3.119-6.953-7.047c0-3.834,3.119-6.953,6.953-6.953h107.094   c3.834,0,6.953,3.119,6.953,7.047C127.432,58.746,124.313,61.865,120.479,61.865z" />
              </g>
            </svg>
          </div>
          Cart
          <div class="grid ml-auto place-items-center justify-self-end">
            <div
              class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
              <span class="">{{ store.cartData.length }}</span>
            </div>
          </div>
        </div>
        <div role="button"
          class="flex mt-2 items-center w-full leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
          <div class="grid mr-4 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
              class="w-6 h-6">
              <path fill-rule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          Log Out
        </div>
      </nav>

    </div>
    <div class="w-max">
      <form class="flex w-1/3 items-center mx-auto m-5" @submit.prevent="newSearch">
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
      <ul class="grid grid-cols-3 gap-4 container mx-auto">
        <li v-for="product in paginatedData" :key="product.id"
          class="border-gray-400 border-4 rounded-lg p-5 hover:border-yellow-700">
          <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }">
            <div class="h-64 overflow-hidden content-center">
              <img class="mx-auto w-48" :src=product.image />
            </div>
            <h5 class="text-xl font-semibold text-wrap text-gray-900">{{ product.title }}
            </h5>
          </RouterLink>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p class="ms-2  font-bold text-gray-900">{{ product.rating.rate }}</p>
            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <p class=" font-medium text-gray-900 underline hover:no-underline">{{ product.rating.count }} reviews</p>
          </div>
          <div class="flex justify-between place-self-end items-end">
            <span class="text-3xl font-bold text-gray-900 ">$ {{ product.price }}</span>
            <button @click="addCart(product)"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center">Add
              to cart</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
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
<style></style>