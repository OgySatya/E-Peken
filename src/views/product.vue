<script setup>
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
  <div class="flex w-11/12 mx-auto">
    <div v-if="sideOpen"
      class="hidden lg:block transition-all duration-700 relative h-[calc(100vh-2rem)] w-fit max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-2 text-gray-700">
      <div class="p-4 mb-2 mx-auto">
        <svg class="mx-auto fill-gray-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1" id="_x32_" width="70px" height="70px" viewBox="0 0 512 512" xml:space="preserve">
          <g>
            <path class="st0"
              d="M449.085,464.424c0,0-5.672-45.109-8.797-51.563c-2.813-5.75-92.75-50.375-112.063-61.563l-0.578,0.203   v-25.609c7.203-7.656,13.859-17.016,19.281-28.563c1.141-2.438,1.938-5.047,2.703-7.906c1.141-4.266,2.094-8.922,2.781-12.578   c0.016-0.063,0.016-0.109,0.031-0.172c3.094-0.75,5.906-2.172,8.313-3.891c5.375-3.922,9.281-9.328,12.453-14.984   c3.141-5.672,5.484-11.656,7.031-16.953c1.172-4.047,1.75-7.688,1.766-11.078c0-3.641-0.719-7.063-2.219-9.969   c-1.125-2.188-2.672-4.031-4.344-5.438c-0.203-0.156-0.406-0.266-0.594-0.422l-0.781-31.438   c7.531-6.422,10.313-14.719,10.313-20.484c0-7.453,0-18.078,0-29.781c0-15.938-11.25-21.281-20.984-23.359   c1,2.609,1.5,5.359,1.5,8.078c0,3.203-0.688,6.422-2.047,9.422c-7.266-14.047-49.781-96.188-57.719-110.359   c-10.188-18.219-41.734-23.531-56.609-1.922c-15.844,23.016-33.953,53.688-36.234,61.375l12.172-48.344   c-13.078-6.203-30.5-1.922-34.813,9.016c-3.25,8.297-33.891,79.75-39.391,92.563c-0.031-0.031-0.063-0.063-0.078-0.109   c-1.703-3.297-2.578-6.891-2.578-10.5c0-2.75,0.516-5.5,1.516-8.141v-0.016c0,0,0.172-0.391,0.453-1.141   c-9.828,2-21.359,7.281-21.359,23.438c0,11.703,0,22.328,0,29.781c0,5.781,2.797,14.094,10.344,20.516l-0.781,31.422   c-1.625,1.25-3.156,2.813-4.328,4.781c-1.891,3.125-2.844,6.938-2.828,11.031c0,3.391,0.609,7.031,1.781,11.078   c2.078,7.078,5.484,15.344,10.469,22.484c2.5,3.547,5.406,6.844,9.016,9.453c2.391,1.719,5.203,3.141,8.313,3.891   c0.234,1.266,0.5,2.656,0.813,4.109c0.563,2.781,1.234,5.797,2,8.641c0.781,2.859,1.563,5.469,2.703,7.906   c5.25,11.188,11.688,20.313,18.641,27.844v26.328l-0.578-0.203c-19.313,11.188-109.25,55.813-112.047,61.563   c-3.141,6.453-8.813,51.563-8.813,51.563c-1.484,7.422,0.25,15.141,4.766,21.203c4.531,6.078,11.406,9.953,18.953,10.656   c0,0,42.672,15.719,169.375,15.719c126.688,0,169.359-15.719,169.359-15.719c7.547-0.703,14.438-4.578,18.953-10.656   C448.851,479.564,450.569,471.846,449.085,464.424z M98.866,425.955l-6.75-12.531l59.078-30.829l7.703,12.844L98.866,425.955z    M256.007,485.33c-5.75,0-10.422-4.656-10.422-10.406s4.672-10.406,10.422-10.406s10.406,4.656,10.406,10.406   S261.757,485.33,256.007,485.33z M256.007,421.768c-5.75,0-10.422-4.656-10.422-10.422c0-5.75,4.672-10.407,10.422-10.407   s10.406,4.656,10.406,10.407C266.413,417.111,261.757,421.768,256.007,421.768z M278.866,338.361   c-10.453,3.266-19.188,3.844-22.547,3.844c-2.234,0-6.891-0.25-12.813-1.391c-8.906-1.719-20.672-5.422-32.219-13.063   c-11.547-7.656-22.906-19.172-31.375-37.109c-0.406-0.813-1.109-2.906-1.75-5.281c-0.953-3.609-1.875-8-2.5-11.438   c-0.344-1.703-0.594-3.188-0.781-4.25c-0.078-0.516-0.156-0.922-0.203-1.219l-0.063-0.406l-1.219-7.688l-7.688,1.156l-0.703,0.047   c-1.078,0-2.281-0.344-3.969-1.547c-2.484-1.734-5.469-5.438-7.891-9.844c-2.453-4.406-4.453-9.484-5.672-13.719   c-0.859-2.953-1.141-5.188-1.141-6.688c0-1.641,0.297-2.406,0.469-2.781l0.438-0.547c0.266-0.219,0.781-0.5,1.625-0.719   c0.813-0.203,1.875-0.313,2.813-0.313c0.75,0,1.406,0.063,1.844,0.109l0.469,0.063l8.688,1.734   c0.172,0.328,0.344,0.609,0.516,0.953c0.016-0.266,0.063-0.547,0.094-0.828l0.094,0.016v-0.891c0.859-8.047,2.391-21.031,3.703-32   c28.766,8.641,74.672,20.5,74.672,20.5c9.469,2.844,19.625,2.844,29.078,0c0,0,45.953-11.859,74.719-20.516   c1.313,10.984,2.828,23.969,3.703,32.016v0.891l0.109-0.016c0.016,0.281,0.047,0.563,0.063,0.828   c0.188-0.328,0.359-0.625,0.516-0.938l8.719-1.75l0,0c0.234-0.031,1.188-0.172,2.281-0.172c0.844,0,1.766,0.078,2.531,0.25   c0.578,0.125,1.063,0.297,1.391,0.469c0.531,0.266,0.672,0.422,0.875,0.734c0.188,0.328,0.547,1.047,0.563,2.906   c0,1.5-0.281,3.734-1.141,6.688c-1.625,5.656-4.656,12.766-8.25,17.844c-1.781,2.547-3.688,4.547-5.328,5.719   c-1.688,1.203-2.891,1.547-3.953,1.547l-0.703-0.047l-7.703-1.156l-1.219,7.688l-0.031,0.172   c-0.141,0.953-0.875,5.453-1.922,10.375c-0.531,2.453-1.109,5.016-1.719,7.219c-0.578,2.172-1.25,4.078-1.609,4.828   c-5.656,11.969-12.594,21.047-20.016,28.063C301.616,329.22,289.366,335.095,278.866,338.361z M370.929,466.658h-13.984h-5.344   v5.344v13.984l-7-6.578l-7,6.578v-13.984v-5.344h-5.344h-13.969l6.578-7l-6.578-6.984h13.969h5.344v-5.359v-13.969l7,6.563l7-6.563   v13.969v5.359h5.344h13.984l-6.578,6.984L370.929,466.658z M413.147,425.955l-60.031-30.516l7.703-12.844l59.078,30.829   L413.147,425.955z" />
          </g>
        </svg>
        <h5
          class="block font-sans text-xl antialiased font-extrabold leading-snug tracking-normal text-blue-gray-900 text-center">
          {{ user.fullName }}
        </h5>
      </div>
      <nav class="flex min-w-[200px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <div class="relative block w-fit">
          <div role="button"
            class="flex items-center w-fit p-0 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start text-blue-gray-700 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <button @click="category()"
              class="flex items-center justify-between w-fit font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900">
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
                <svg :class="{ 'rotate-180': listCategory }" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                  class="w-4 h-4 mx-auto transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                </svg>
              </span>
            </button>
          </div>
          <div class="overflow-hidden">
            <div class="block w-fit py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
              <nav v-if="listCategory"
                class="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                <div v-for="category in categories"
                  class="flex items-center w-fit p-1 pl-5 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <div class="">
                    <input type="radio" v-model="selected" :value=category @change="getProductCategory(selected)"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                    <label class="capitalize py-1 ms-2 mx-auto my-1 text-gray-900 hover:text-teal-400">{{
      category }}
                    </label>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div class="relative block w-fit">
          <div role="button"
            class="flex items-center w-fit p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <button @click="sort()"
              class="flex items-center justify-between w-fit font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
              <div class="grid mr-4 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                  class="w-6 h-6">
                  <path fill-rule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <p class="block mr-auto font-sans font-bold text-xl antialiased leading-relaxed text-blue-gray-900">
                Sort By
              </p>
              <span class="ml-4">
                <svg :class="{ 'rotate-180': sortNav }" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                  class="w-4 h-4 mx-auto transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                </svg>
              </span>
            </button>
          </div>
          <div class="overflow-hidden">
            <div class="block w-fit py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
              <nav v-if="sortNav"
                class="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                <div role="button" @click="sortName()"
                  class="flex items-center w-fit p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <span class="mr-2 hover:text-teal-400">Name</span>
                  <svg :class="{ 'rotate-180': !ascName }" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                    class="w-4 h-4 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </div>
                <div role="button" @click="sortPrice()"
                  class="flex items-center w-fit p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <span class="mr-2 hover:text-teal-400">Price</span>
                  <svg :class="{ 'rotate-180': !ascPrice }" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                    class="w-4 h-4 transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </div>
                <div role="button" @click="sortRating()"
                  class="flex items-center w-fit p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <span class="mr-2 hover:text-teal-400">Rating</span>
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
        <router-link to="/cart"
          class="font-bold text-xl flex items-center w-fit leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
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
              class="relative grid items-center px-2 py-1 font-sans font-bold uppercase rounded-fit select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
              <span class="ml-5">{{ store.totalCart }}</span>
            </div>
          </div>
        </router-link>
        <div role="button" @click="logout()"
          class="font-bold text-xl flex mt-2 items-center w-fit leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
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
    <div class="w-full">
      <form class="flex justify-center mx-auto m-5" @submit.prevent="newSearch">
        <input v-model="cari" type="text" placeholder="Cari Sesuatu"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5" />
        <button type="submit"
          class="p-2.5 ms-2 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </button>
      </form>
      <div class="w-full">
        <div class="flex justify-between">
          <div class="hidden lg:block">
            <button class="mr-2" @click="sidebar()">
              <svg class=" transition-all duration-1000" :class="{ 'rotate-180': sideOpen }"
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.46448 7.75739L7.05026 9.1716L9.87869 12L7.05029 14.8284L8.46451 16.2426L12.7071 12L8.46448 7.75739Z"
                  fill="#000000" />
                <path
                  d="M11.2929 9.1716L12.7071 7.75739L16.9498 12L12.7071 16.2426L11.2929 14.8284L14.1213 12L11.2929 9.1716Z"
                  fill="#000000" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M23 5C23 2.79086 21.2091 1 19 1H5C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  fill="#000000" />
              </svg>
            </button>
          </div>
          <div class="hidden lg:block">
            <button class="mr-4" @click="grid()">
              <svg class="w-10 h-10 text-gray-800 rounded" :class="{ 'fill-gray-300 ring': view }" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
              </svg>
            </button>
            <button @click="list()">
              <svg class="w-10 h-10 text-gray-800 rounded" :class="{ 'fill-gray-300 ring': !view }" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <section class="w-full flex">
        <ul v-if="view" class="grid grid-cols-3 gap-4 mx-auto">
          <li v-for="product in paginatedData" :key="product.id"
            class=" p-3 border-transparent border rounded-xl hover:border-cyan-300">
            <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }">
              <div class="h-64 overflow-hidden content-center">
                <img class="mx-auto w-48" :src=product.image />
              </div>
              <h5 class="h-12 text-md font-semibold text-wrap text-gray-900 overflow-hidden text-ellipsis">
                {{ product.title }}
              </h5>
            </RouterLink>
            <div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor" viewBox="0 0 22 20">
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>

                <p class="ms-2 font-bold text-gray-900">{{ product.rating.rate }}</p>
                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-fit dark:bg-gray-400"></span>
                <p class=" font-medium text-gray-900 underline hover:no-underline">{{ product.rating.count }} reviews
                </p>
              </div>
              <span class="text-2xl font-bold text-gray-900 ">$ {{ product.price }}</span>
            </div>
            <div class="flex justify-end">
              <button @click="addCart(product)"
                class="text-white bg-blue-700 rounded-lg p-2 px-5 -mt-10 text-center">Add
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" />
                </svg>
              </button>
            </div>
          </li>
        </ul>


        <div v-else class="relative overflow-x-auto mx-auto">
          <table class="text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 mx-auto">
            <thead class=" text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-16 py-3">
                  <span class="sr-only">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Product Name
                    <button @click="sortName()" class="ml-3">
                      <svg class="w-5 h-5 text-gray-700 dark:text-white transition-all duration-500"
                        :class="{ 'rotate-180': !ascName }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Rating
                    <button @click="sortRating()" class="ml-3">
                      <svg class="w-5 h-5 text-gray-700 dark:text-white transition-all duration-500"
                        :class="{ 'rotate-180': !ascRating }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Price
                    <button @click="sortPrice()" class="ml-3">
                      <svg class="w-5 h-5 text-gray-700 dark:text-white transition-all duration-500"
                        :class="{ 'rotate-180': !ascPrice }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in paginatedData" :key="product.id" class="border-b hover:bg-gray-100 ">
                <td class="p-2 w-24 h-16 overflow-hidden ">
                  <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }">
                    <img :src="product.image" class="h-14 mx-auto">
                  </RouterLink>
                </td>
                <td class="px-4 py-2 w-96 ">
                  <RouterLink :to="{ name: 'productinfo', params: { id: product.id } }"
                    class="text-wrap font-semibold text-gray-900 overflow-hidden">
                    {{ product.title }}
                  </RouterLink>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 22 20">
                      <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>

                    <p class="ms-2 font-bold text-gray-900">{{ product.rating.rate }}</p>
                  </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  ${{ product.price }}
                </td>
                <td class="px-6 py-4">
                  <button @click="addCart(product)"
                    class="text-gray-900 text-xs bg-gray-100 rounded-lg p-1 px-3 -mt-10 text-center">Add
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path
                        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
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
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>