<script setup>
import gridview from './gridview.vue'
import listview from './listview.vue'
import sidebarr from '../components/sidebar.vue'
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '../cartstore.js'
import { useUserStore } from '/src/userstore.js'
import { useRouter } from 'vue-router';

const user = useUserStore()
const router = useRouter()
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
    if (window.innerWidth < 1024) {
        list()
    }
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

}
let ascPrice = ref(true)
function sortPrice() {
    ascPrice.value = !ascPrice.value
    if (ascPrice.value === true) {
        allProduct.value = filteredName.value.slice().sort((a, b) => a.price - b.price);
    } else if (ascPrice.value === false) {
        allProduct.value = filteredName.value.slice().sort((a, b) => b.price - a.price);
    }

}

let ascRating = ref(true)
function sortRating() {
    ascRating.value = !ascRating.value
    if (ascRating.value === true) {
        allProduct.value = filteredName.value.slice().sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (ascRating.value === false) {
        allProduct.value = filteredName.value.slice().sort((a, b) => b.rating.rate - a.rating.rate);
    }

}

const currentPage = ref(1);
const page = ref(6)
const totalPages = computed(() => {
    return Math.ceil(filteredName.value.length / page.value);
});

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * page.value;
    const endIndex = startIndex + page.value;
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
const view = ref(true)
function grid() {
    view.value = true
    page.value = 6;
}
function list() {
    view.value = false
    page.value = 10;
}
const sortNav = ref(false)
function sort() {
    sortNav.value = !sortNav.value
}
const listCategory = ref(false)
function category() {
    listCategory.value = !listCategory.value
}
const sideOpen = ref(true)
function sidebar() {
    sideOpen.value = !sideOpen.value
}
function logout() {
    localStorage.setItem("auth", false);
    user.fullName = ''
    router.push({ path: '/' });

}
</script>

<template>
    <div class="flex mx-auto w-max">
        <sidebarr @response="(msg) => getProductCategory(msg)" />
        <div>
            <form class="flex justify-center mx-auto mb-5" @submit.prevent="newSearch">
                <input v-model="cari" type="text" placeholder="Cari Sesuatu"
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
            <gridview :data="paginatedData">
            </gridview>
            <listview :data="paginatedData">
            </listview>
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