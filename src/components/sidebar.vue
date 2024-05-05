<script setup>
import { ref, onMounted, computed } from "vue";
import useProductStore from "@/stores/product";
import useAuthStore from "@/stores/auth";
import useUserStore from "@/stores/user";
import useCartStore from "@/stores/cart";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const productStore = useProductStore();
const userStore = useUserStore();
const cartStore = useCartStore();
const router = useRouter();
const emit = defineEmits(["add"]);
const radio = ref()

onMounted(async () => {
  await productStore.getCategories();
});

const open = ref(false);

const categories = computed(() => productStore.categories);

async function getProductCategory(param) {
  await productStore.getProducts(param);
}

let ascName = ref(true);
function sortName() {
  ascName.value = !ascName.value;
  productStore.sortByname(ascName.value)
}
let ascPrice = ref(true);
function sortPrice() {
  ascPrice.value = !ascPrice.value;
  productStore.sortByprice(ascPrice.value)
}
let ascRating = ref(true);
function sortRating() {
  ascRating.value = !ascRating.value;
  productStore.sortByrating(ascRating.value)
}
function toggle() {
  open.value = !open.value;
}
const sortNav = ref(false);
function sort() {
  sortNav.value = !sortNav.value;
}
const listCategory = ref(false);
function category() {
  listCategory.value = !listCategory.value;
}
function logout() {
  authStore.logout();
  router.push({ path: "/" });
}
</script>
<template>
  <div class="flex h-max mx-2 ">
    <div class="left-0 flex-row-reverse hidden md:block">
      <transition>
        <div class="transition-transform duration-1000 mb-2 flex justify-between">
          <button @click.prevent="toggle()"
            class="p-1 my-auto rounded bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300">
            <svg class="w-[40px] h-[40px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
          <button @click.prevent="$emit('add', true)" :class="[open ? '' : 'hidden']"
            class=" p-1 my-auto rounded bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300">
            <svg class="w-[40px] h-[40px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
            </svg>
          </button>
          <button @click.prevent="$emit('add', false)" :class="[open ? '' : 'hidden']"
            class="p-1 my-auto rounded bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300">
            <svg class="w-[40px] h-[40px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
            </svg>
          </button>
        </div>
      </transition>

      <div class="transition-all duration-700 bg-neutral-200 overflow-hidden flex justify-center rounded-lg"
        :class="[open ? 'max-w-lg' : 'max-w-0']">
        <div class="w-60 grid p-5">
          <div
            class="hidden md:block transition-all duration-700 relative h-[calc(100vh-2rem)] max-w-[20rem] flex-col rounded-xl bg-clip-border text-gray-700">
            <div class="mb-2 mx-auto">
              <svg class="fill-gray-700 mx-auto" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="_x32_" width="70px" height="70px"
                viewBox="0 0 512 512" xml:space="preserve">
                <g>
                  <path class="st0"
                    d="M449.085,464.424c0,0-5.672-45.109-8.797-51.563c-2.813-5.75-92.75-50.375-112.063-61.563l-0.578,0.203   v-25.609c7.203-7.656,13.859-17.016,19.281-28.563c1.141-2.438,1.938-5.047,2.703-7.906c1.141-4.266,2.094-8.922,2.781-12.578   c0.016-0.063,0.016-0.109,0.031-0.172c3.094-0.75,5.906-2.172,8.313-3.891c5.375-3.922,9.281-9.328,12.453-14.984   c3.141-5.672,5.484-11.656,7.031-16.953c1.172-4.047,1.75-7.688,1.766-11.078c0-3.641-0.719-7.063-2.219-9.969   c-1.125-2.188-2.672-4.031-4.344-5.438c-0.203-0.156-0.406-0.266-0.594-0.422l-0.781-31.438   c7.531-6.422,10.313-14.719,10.313-20.484c0-7.453,0-18.078,0-29.781c0-15.938-11.25-21.281-20.984-23.359   c1,2.609,1.5,5.359,1.5,8.078c0,3.203-0.688,6.422-2.047,9.422c-7.266-14.047-49.781-96.188-57.719-110.359   c-10.188-18.219-41.734-23.531-56.609-1.922c-15.844,23.016-33.953,53.688-36.234,61.375l12.172-48.344   c-13.078-6.203-30.5-1.922-34.813,9.016c-3.25,8.297-33.891,79.75-39.391,92.563c-0.031-0.031-0.063-0.063-0.078-0.109   c-1.703-3.297-2.578-6.891-2.578-10.5c0-2.75,0.516-5.5,1.516-8.141v-0.016c0,0,0.172-0.391,0.453-1.141   c-9.828,2-21.359,7.281-21.359,23.438c0,11.703,0,22.328,0,29.781c0,5.781,2.797,14.094,10.344,20.516l-0.781,31.422   c-1.625,1.25-3.156,2.813-4.328,4.781c-1.891,3.125-2.844,6.938-2.828,11.031c0,3.391,0.609,7.031,1.781,11.078   c2.078,7.078,5.484,15.344,10.469,22.484c2.5,3.547,5.406,6.844,9.016,9.453c2.391,1.719,5.203,3.141,8.313,3.891   c0.234,1.266,0.5,2.656,0.813,4.109c0.563,2.781,1.234,5.797,2,8.641c0.781,2.859,1.563,5.469,2.703,7.906   c5.25,11.188,11.688,20.313,18.641,27.844v26.328l-0.578-0.203c-19.313,11.188-109.25,55.813-112.047,61.563   c-3.141,6.453-8.813,51.563-8.813,51.563c-1.484,7.422,0.25,15.141,4.766,21.203c4.531,6.078,11.406,9.953,18.953,10.656   c0,0,42.672,15.719,169.375,15.719c126.688,0,169.359-15.719,169.359-15.719c7.547-0.703,14.438-4.578,18.953-10.656   C448.851,479.564,450.569,471.846,449.085,464.424z M98.866,425.955l-6.75-12.531l59.078-30.829l7.703,12.844L98.866,425.955z    M256.007,485.33c-5.75,0-10.422-4.656-10.422-10.406s4.672-10.406,10.422-10.406s10.406,4.656,10.406,10.406   S261.757,485.33,256.007,485.33z M256.007,421.768c-5.75,0-10.422-4.656-10.422-10.422c0-5.75,4.672-10.407,10.422-10.407   s10.406,4.656,10.406,10.407C266.413,417.111,261.757,421.768,256.007,421.768z M278.866,338.361   c-10.453,3.266-19.188,3.844-22.547,3.844c-2.234,0-6.891-0.25-12.813-1.391c-8.906-1.719-20.672-5.422-32.219-13.063   c-11.547-7.656-22.906-19.172-31.375-37.109c-0.406-0.813-1.109-2.906-1.75-5.281c-0.953-3.609-1.875-8-2.5-11.438   c-0.344-1.703-0.594-3.188-0.781-4.25c-0.078-0.516-0.156-0.922-0.203-1.219l-0.063-0.406l-1.219-7.688l-7.688,1.156l-0.703,0.047   c-1.078,0-2.281-0.344-3.969-1.547c-2.484-1.734-5.469-5.438-7.891-9.844c-2.453-4.406-4.453-9.484-5.672-13.719   c-0.859-2.953-1.141-5.188-1.141-6.688c0-1.641,0.297-2.406,0.469-2.781l0.438-0.547c0.266-0.219,0.781-0.5,1.625-0.719   c0.813-0.203,1.875-0.313,2.813-0.313c0.75,0,1.406,0.063,1.844,0.109l0.469,0.063l8.688,1.734   c0.172,0.328,0.344,0.609,0.516,0.953c0.016-0.266,0.063-0.547,0.094-0.828l0.094,0.016v-0.891c0.859-8.047,2.391-21.031,3.703-32   c28.766,8.641,74.672,20.5,74.672,20.5c9.469,2.844,19.625,2.844,29.078,0c0,0,45.953-11.859,74.719-20.516   c1.313,10.984,2.828,23.969,3.703,32.016v0.891l0.109-0.016c0.016,0.281,0.047,0.563,0.063,0.828   c0.188-0.328,0.359-0.625,0.516-0.938l8.719-1.75l0,0c0.234-0.031,1.188-0.172,2.281-0.172c0.844,0,1.766,0.078,2.531,0.25   c0.578,0.125,1.063,0.297,1.391,0.469c0.531,0.266,0.672,0.422,0.875,0.734c0.188,0.328,0.547,1.047,0.563,2.906   c0,1.5-0.281,3.734-1.141,6.688c-1.625,5.656-4.656,12.766-8.25,17.844c-1.781,2.547-3.688,4.547-5.328,5.719   c-1.688,1.203-2.891,1.547-3.953,1.547l-0.703-0.047l-7.703-1.156l-1.219,7.688l-0.031,0.172   c-0.141,0.953-0.875,5.453-1.922,10.375c-0.531,2.453-1.109,5.016-1.719,7.219c-0.578,2.172-1.25,4.078-1.609,4.828   c-5.656,11.969-12.594,21.047-20.016,28.063C301.616,329.22,289.366,335.095,278.866,338.361z M370.929,466.658h-13.984h-5.344   v5.344v13.984l-7-6.578l-7,6.578v-13.984v-5.344h-5.344h-13.969l6.578-7l-6.578-6.984h13.969h5.344v-5.359v-13.969l7,6.563l7-6.563   v13.969v5.359h5.344h13.984l-6.578,6.984L370.929,466.658z M413.147,425.955l-60.031-30.516l7.703-12.844l59.078,30.829   L413.147,425.955z" />
                </g>
              </svg>
              <h5 class="font-sans text-xl text-center antialiased font-extrabold tracking-normal text-blue-gray-900">
                {{ authStore.userId.firstName }} {{ authStore.userId.lastName }}
              </h5>
            </div>
            <nav class="flex min-w-[200px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
              <div class="relative block w-max">
                <div role="button"
                  class="flex items-center w-max p-0 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start text-blue-gray-700 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <button @click="category()"
                    class="flex items-center justify-between w-max font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900">
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
                        class="w-4 h-4 transition-transform">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <div class="overflow-hidden">
                  <div class="block w-max py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                    <nav v-if="listCategory"
                      class="flex flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                      <div v-for="category in categories"
                        class="flex items-center p-1 pl-5 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <div class="">
                          <input type="radio" v-model="radio" :value="category" @change="getProductCategory(category)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                          <label class="capitalize py-1 ms-2 my-1 text-gray-900 hover:text-teal-400">{{ category }}
                          </label>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div class="relative block w-max">
                <div role="button"
                  class="flex items-center w-max p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <button @click="sort()"
                    class="flex items-center justify-between w-max font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
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
                        class="w-4 h-4 transition-transform">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <div class="overflow-hidden">
                  <div class="block *:py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                    <nav v-if="sortNav"
                      class="flex flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                      <div role="button" @click="sortName()"
                        class="flex items-center w-max p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <span class="mr-2 hover:text-teal-400">Name</span>
                        <svg :class="{ 'rotate-180': !ascName }" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                          class="w-4 h-4 transition-transform">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                        </svg>
                      </div>
                      <div role="button" @click="sortPrice()"
                        class="flex items-center w-max p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <span class="mr-2 hover:text-teal-400">Price</span>
                        <svg :class="{ 'rotate-180': !ascPrice }" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true"
                          class="w-4 h-4 transition-transform">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                        </svg>
                      </div>
                      <div role="button" @click="sortRating()"
                        class="flex items-center w-max p-1 ml-9 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
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
                class="font-bold text-xl flex items-center w-max leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <div class="grid mr-4 place-items-center">
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1" id="Capa_1" viewBox="0 0 133.865 133.865" xml:space="preserve">
                    <g>
                      <path style="fill: #ff8898"
                        d="M66.939,10.593c20.481,0,37.97,13.05,44.595,31.271h4.85C109.568,21.067,89.985,6,66.939,6   c-23.047,0-42.63,15.067-49.446,35.865h4.85C28.968,23.643,46.457,10.593,66.939,10.593z" />
                      <path style="fill: #ffeb97"
                        d="M120.479,47.865H13.385c-3.834,0-6.953,3.119-6.953,6.953c0,3.928,3.119,7.047,6.953,7.047h107.094   c3.834,0,6.953-3.119,6.953-6.953C127.432,50.984,124.313,47.865,120.479,47.865z" />
                      <path style="fill: #586065"
                        d="M122.718,42.072C115.767,17.812,93.402,0,66.939,0c-26.462,0-48.829,17.812-55.78,42.07   C5.076,43.131,0.432,48.446,0.432,54.912c0,5.848,3.897,10.797,9.229,12.402c0.532,3.29,1.347,6.484,2.408,9.566l7.508,56.985   h95.31l7.94-60.262c0.573-2.056,1.043-4.153,1.388-6.293c5.326-1.611,9.216-6.572,9.216-12.492   C133.432,48.44,128.796,43.138,122.718,42.072z M66.939,6c23.046,0,42.628,15.067,49.445,35.865h-4.85   c-6.625-18.221-24.113-31.271-44.595-31.271c-20.482,0-37.971,13.05-44.596,31.271h-4.85C24.309,21.067,43.892,6,66.939,6z    M105.089,41.865H28.788c6.311-14.839,21.035-25.271,38.151-25.271C84.054,16.593,98.778,27.025,105.089,41.865z M45.432,127.865   H24.84l-2.24-17h22.833V127.865z M45.432,104.865H21.809l-1.977-15h25.6V104.865z M45.432,83.865h-26.39l-2.108-16h28.498V83.865z    M83.432,127.865h-32v-17h32V127.865z M83.432,104.865h-32v-15h32V104.865z M83.432,83.865h-32v-16h32V83.865z M109.626,127.865   H89.432v-17h22.434L109.626,127.865z M112.656,104.865H89.432v-15h25.2L112.656,104.865z M115.424,83.865H89.432v-16h28.099   L115.424,83.865z M120.479,61.865H13.385c-3.834,0-6.953-3.119-6.953-7.047c0-3.834,3.119-6.953,6.953-6.953h107.094   c3.834,0,6.953,3.119,6.953,7.047C127.432,58.746,124.313,61.865,120.479,61.865z" />
                    </g>
                  </svg>
                </div>
                Cart
                <div class="grid ml-auto place-items-center justify-self-end">
                  <div
                    class="relative grid items-center px-2 py-1 font-sans font-bold uppercase rounded-max select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                    <span class="ml-5">{{ cartStore.totalQuantity }}</span>
                  </div>
                </div>
              </router-link>
              <div role="button" @click="logout"
                class="font-bold text-xl flex mt-2 items-center w-max leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
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
        </div>
      </div>
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
