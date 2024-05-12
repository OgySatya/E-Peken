<script setup>
import { useRoute } from "vue-router";
import useCartStore from "@/stores/cart";
import useProductStore from "@/stores/product";
import { ref, onMounted, computed } from "vue";
import modal from "./modal/addmodal.vue";

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const detailProduct = computed(() => productStore.detail || {});

onMounted(async () => {
  await productStore.getProduct(route.params.id);
});
function addToCart() {
  cartStore.add(detailProduct.value);
  showModal.value = !showModal.value;
  setTimeout(() => {
    showModal.value = !showModal.value;
  }, 1500);
}
const showModal = ref(false);
</script>
<template>
  <section>
    <Teleport to="body">
      <Transition>
        <modal v-if="showModal" :data="detailProduct" />
      </Transition>
    </Teleport>
  </section>
  <section class="text-gray-700 body-font">
    <div class="container p-5 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap border-2 rounded-2xl p-4">
        <img class="lg:w-1/2 w-fit object-cover object-center mx-auto rounded-xl" :src="detailProduct.image" />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="title-font text-4xl text-gray-500 tracking-widest dark:text-gray-400">
            PRODUCT NAME
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1 dark:text-gray-200">
            {{ detailProduct.title }}
          </h1>
          <h3 class="text-white text-xl title-font font-medium mb-3 bg-stone-700 capitalize w-fit px-2 rounded">
            {{ detailProduct.category }}
          </h3>
          <hr>
          <p class="leading-relaxed my-3 text-lg dark:text-gray-200">{{ detailProduct.description }}</p>
          <hr>
          <div class="flex mt-3">
            <span class="title-font font-medium text-2xl text-gray-900 dark:text-gray-200">${{ detailProduct.price
              }}</span>
            <button @click="addToCart"
              class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
              Add to Cart
            </button>
          </div>
          <div class="mt-10">
            <button
              class="flex justify-start items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:text-indigo-700">
              <svg class="transition-all duration-500 group-hover:translate-x-2 rotate-180"
                xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                  stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" />
              </svg>
              <RouterLink to="/productv2">Back to Shopping</RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
