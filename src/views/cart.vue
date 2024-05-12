<script setup>
import { RouterLink } from "vue-router";
import useCartStore from "@/stores/cart";
import { ref, computed } from "vue";
import payment from "./modal/paymentmodal.vue";

const cartStore = useCartStore();
const alamat = ref(0);
const voucher = ref(0);

const products = computed(() => cartStore.products);
const totalPrice = computed(() => cartStore.totalPrice);
const totalQuantity = computed(() => cartStore.totalQuantity);

function addQuantity(product) {
  cartStore.add(product);
}
function subtractQuantity(product) {
  cartStore.subtract(product);
}
function removeProduct(productId) {
  cartStore.remove(productId);
}

const diskon =
  computed(() => {
    if (typeof voucher.value === "number") {
      return ((totalPrice.value * voucher.value) / 100).toFixed(2);
    } else {
      return Number(alamat.value);
    }
  }) || 0;
const totalPay =
  computed(() => {
    return (
      Number(alamat.value) +
      Number(totalPrice.value) -
      Number(diskon.value)
    ).toFixed(2);
  }) || 0;
const showModal = ref(false);
function checkout() {
  showModal.value = !showModal.value;
}
</script>
<template>
  <div>
    <Teleport to="body">
      <Transition>
        <payment v-if="showModal" :data="cartStore" :total="totalPay" :save="diskon" @back="() => checkout()" />
      </Transition>
    </Teleport>
  </div>
  <section class="w-max mx-auto">
    <div class="w-full px-4 md:px-5 mx-auto flex z-10">
      <div class="grid grid-cols-12 mx-auto">
        <div class="col-span-12 xl:col-span-8 lg:pr-8 pt-10 pb-8 w-full max-xl:max-w-3xl max-xl:mx-auto">
          <div class="grid items-center pb-2 border-gray-300">
            <h2 class="font-manrope font-bold text-3xl leading-10 text-black dark:text-gray-200">
              Shopping Cart
            </h2>
            <div class="overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table class="w-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-lg text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-2">
                      <span class="sr-only">Image</span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="list in products"
                    class="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="p-4">
                      <img :src="list.image" class="w-16 md:w-32 mx-auto rounded-lg">
                    </td>
                    <td class="p-2 font-semibold text-gray-900 dark:text-white">
                      <h6
                        class="font-semibold text-base leading-7 text-black text-wrap max-w-28 lg:max-w-80 dark:text-gray-400">
                        {{ list.title }}
                      </h6>
                      <h6 class="font-normal text-base leading-7 text-gray-500">
                        {{ list.category }}
                      </h6>
                      <h6
                        class="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600 dark:text-gray-100">
                        ${{ list.price }}
                      </h6>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <button @click="subtractQuantity(list)">
                          <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </button>
                        <div>
                          <span
                            class="text-gray-900 text-lg font-semibold py-0.5 px-2 rounded-lg text-center bg-transparent dark:text-gray-200">{{
          list.quantity }}</span>
                        </div>
                        <button @click="addQuantity(list)" type="button">
                          <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>

                        </button>
                      </div>
                      <button @click="removeProduct(list.id)" type="button"
                        class="font-medium text-red-600 hover:text-indigo-500 mt-3 mx-auto">
                        Remove
                      </button>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <p
                        class="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600 dark:text-gray-100">
                        ${{ (list.quantity * list.price).toFixed(2) }}
                      </p>
                    </td>

                  </tr>

                </tbody>
              </table>
            </div>
            <div class="flex items-center mt-8">
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

        <div class="col-span-12 xl:col-span-4 bg-gray-100 w-full mx-auto  p-10 dark:bg-gray-800">
          <h2
            class="font-manrope text-center font-bold text-3xl leading-10 text-black pb-8 border-b-2 border-gray-300 dark:text-gray-200">
            Order Summary
          </h2>
          <div class="mt-3">
            <div class="flex items-center justify-between p-6 dark:text-gray-200">
              <p class="font-normal text-lg leading-8 text-black dark:text-gray-200">
                {{ totalQuantity }} Items
              </p>
              <p class="font-medium text-lg leading-8 text-black dark:text-gray-200">
                ${{ totalPrice }}
              </p>
            </div>
            <div>
              <div class="max-w-sm mx-auto grid items-center border-b border-gray-200 my-2">
                <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Alamat</label>
                <select v-model="alamat"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option :value="10">Bali</option>
                  <option :value="20">Jawa</option>
                  <option :value="30">Sumatra</option>
                  <option :value="40">Kalimantan</option>
                  <option :value="50">Sulawesi</option>
                  <option :value="60">Papua</option>
                </select>
              </div>
              <div class="max-w-sm mx-auto grid items-center border-b border-gray-200 my-2">
                <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Use Voucher</label>
                <select type="number" v-model="voucher"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="false">Gratis Ongkos Kirim</option>
                  <option :value="10">Diskon 10 %</option>
                  <option :value="15">Diskon 15 %</option>
                  <option :value="20">Diskon 20 %</option>
                </select>
              </div>
              <div v-if="alamat" class="ml-3 flex items-center justify-between py-2">
                <p class="font-medium text-xl leading-8 text-black">
                  Ongkos Kirim
                </p>
                <p class="font-semibold text-xl leading-8 text-red-400">
                  +${{ alamat }}
                </p>
              </div>
              <div v-if="voucher" class="ml-3 flex items-center justify-between py-2">
                <p class="font-medium text-xl leading-8 text-black">Diskon</p>
                <p class="font-semibold text-xl leading-8 text-green-600">
                  -${{ diskon }}
                </p>
              </div>
              <div class="flex items-center justify-between border-t-2 px-6 py-6 mt-8 border-gray-300">
                <p class="font-semibold text-2xl leading-8 text-amber-700">
                  Cost :
                </p>
                <p class="font-bold text-2xl leading-8 text-indigo-600">
                  $ {{ totalPay || 0 }}
                </p>
              </div>
              <button @click="checkout()"
                class="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
