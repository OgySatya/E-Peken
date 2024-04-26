<script setup>
import { RouterLink } from 'vue-router';
import { useCartStore } from '../cartstore.js'
import { ref, computed } from 'vue'

const store = useCartStore()
const alamat = ref(0)
const voucher = ref(0)
const deleteItem = (index) => {
   store.cartData.splice(index, 1);
}
const totalPrice = computed(() => {
   let sum = 0
   store.cartData.forEach(item => {
      sum += (item.price * item.count);
   });
   return sum.toFixed(2)
});
const diskon = computed(() => {
   if (typeof voucher.value === 'number') {
      return (totalPrice.value * voucher.value / 100).toFixed(2)
   }
   else {
      return Number(alamat.value)
   }

}) || 0;
const totalPay = computed(() => {
   return (Number(alamat.value) + Number(totalPrice.value) - Number(diskon.value)).toFixed(2)
}) || 0;
</script>
<template>
   <section
      class=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
         <div class="grid grid-cols-12">
            <div class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
               <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                  <h2 class="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                  <h2 class="font-manrope font-bold text-xl leading-8 text-gray-600">{{ store.totalCart }} Items</h2>
               </div>
               <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                  <div class="col-span-12 md:col-span-7">
                     <p class="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                  </div>
                  <div class="col-span-12 md:col-span-5">
                     <div class="grid grid-cols-5">
                        <div class="col-span-3">
                           <p class="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                        </div>
                        <div class="col-span-2">
                           <p class="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div v-for="(list, index ) in store.cartData"
                  class="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                  <div class="w-full md:max-w-[126px]">
                     <img :src="list.image" class="mx-auto">
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-4 w-full">
                     <div class="md:col-span-2">
                        <div class="flex flex-col max-[500px]:items-center gap-3">
                           <h6 class="font-semibold text-base leading-7 text-black">{{ list.title }}</h6>
                           <h6 class="font-normal text-base leading-7 text-gray-500">{{ list.category }}</h6>
                           <h6
                              class="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                              ${{ list.price }}</h6>
                        </div>
                     </div>
                     <div class="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                        <div class="flex items-center h-full">
                           <button @click="--store.cartData[index].count"
                              class="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                              <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                 xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                 fill="none">
                                 <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                                 <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                                 <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                              </svg>
                           </button>
                           <span
                              class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] py-[15px]  text-center bg-transparent">{{
                     list.count }}</span>
                           <button @click="++store.cartData[index].count"
                              class="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                              <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                 xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                 fill="none">
                                 <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                    stroke-linecap="round" />
                                 <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                                 <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                              </svg>
                           </button>
                        </div>
                     </div>
                     <div class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-6 h-full">
                        <p
                           class="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                           ${{ (list.count * list.price).toFixed(2) }}</p>

                     </div>
                     <div class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-6 h-full">
                        <button @click="deleteItem(index)" type="button"
                           class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                     </div>
                  </div>
               </div>
               <div class="flex items-center mt-8">
                  <button
                     class="flex justify-start items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:text-indigo-700">
                     <svg class="transition-all duration-500 group-hover:translate-x-2 rotate-180"
                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path
                           d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                           stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" />
                     </svg>
                     <RouterLink to="/product">Back to Shopping</RouterLink>
                  </button>
               </div>
            </div>
            <div
               class=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
               <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                  Order Summary</h2>
               <div class="mt-8">

                  <div class="flex items-center justify-between pb-6">
                     <p class="font-normal text-lg leading-8 text-black">{{ store.totalCart }} Items</p>
                     <p class="font-medium text-lg leading-8 text-black">${{ totalPrice }}</p>
                  </div>
                  <div>

                     <div class="max-w-sm mx-auto grid items-center border-b border-gray-200 my-2">
                        <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Alamat</label>
                        <select v-model="alamat"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                           <option :value=10>Bali</option>
                           <option :value=20>Jawa</option>
                           <option :value=30>Sumatra</option>
                           <option :value=40>Kalimantan</option>
                           <option :value=50>Sulawesi</option>
                           <option :value=60>Papua</option>
                        </select>
                     </div>
                     <div class="max-w-sm mx-auto grid items-center border-b border-gray-200 my-2">
                        <label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Use Voucher</label>
                        <select type="number" v-model="voucher"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                           <option value='false'>Gratis Ongkos Kirim</option>
                           <option :value=10>Diskon 10 %</option>
                           <option :value=15>Diskon 15 %</option>
                           <option :value=20>Diskon 20 %</option>
                        </select>
                     </div>
                     <div v-if="alamat" class="ml-3 flex items-center justify-between py-2">
                        <p class="font-medium text-xl leading-8 text-black">Ongkos Kirim</p>
                        <p class="font-semibold text-xl leading-8 text-red-400"> +${{ alamat }}</p>
                     </div>
                     <div v-if="voucher" class="ml-3 flex items-center justify-between py-2">
                        <p class="font-medium text-xl leading-8 text-black">Diskon</p>
                        <p class="font-semibold text-xl leading-8 text-green-600">-${{ diskon }}</p>
                     </div>
                     <div class="flex items-center justify-between py-8">
                        <p class="font-semibold text-2xl leading-8 text-amber-700">Cost : </p>
                        <p class="font-bold text-2xl leading-8 text-indigo-600">$ {{ totalPay || 0 }}</p>
                     </div>
                     <button
                        class="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">Checkout</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>

</template>