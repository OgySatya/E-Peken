<script setup>
import { ref, computed } from "vue";
import useCartStore from "@/stores/cart";

const cartStore = useCartStore();
const props = defineProps({
  data: Array,
  total: Number,
  save: Number,
});
const emit = defineEmits(["back"]);
const tax =
  computed(() => {
    return (props.total *5/100).toFixed(2)
  });
const totalAll =
  computed(() => {
    return  (Number(props.total) + Number(tax.value)).toFixed(2)
  });
function payment(){
    cartStore.products = []
    emit('back')
}
</script>
<template>
     <div class="inset-0 fixed left-0 top-0 bg-gray-500 bg-opacity-50">
      <div class="w-max mx-auto mt-40 bg-white p-10 rounded-2xl bg-opacity-50">
            <div class="flex bg-gray-100 px-6 py-8 rounded-t-md w-full">
              <div class="w-full">
                <div class="flex items-center w-full ">
                  <div class="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                    <span class="text-base text-white font-bold">1</span>
                  </div>
                  <div class="w-full h-[3px] mx-4 rounded-lg bg-[#333]"></div>
                </div>
                <div class="mt-2 mr-4">
                  <h6 class="text-base font-bold text-[#333]">Shipping</h6>
                </div>
              </div>
              <div class="w-full">
                <div class="flex items-center w-full">
                  <div class="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                    <span class="text-base text-white font-bold">2</span>
                  </div>
                  <div class="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
                </div>
                <div class="mt-2 mr-4">
                  <h6 class="text-base font-bold text-[#333]">Billing</h6>
                </div>
              </div>
              <div>
                <div class="">
                  <div class="w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full">
                    <span class="text-base text-white font-bold">3</span>
                  </div>
                </div>
                <div class="mt-2">
                  <h6 class="text-base font-bold text-gray-400">Confirm</h6>
                </div>
              </div>
            </div>
            <div class="bg-gray-100 px-6 rounded-b-md w-full">
                <div class="text-center">
                <h2 class="text-2xl font-extrabold text-[#333]">Payment</h2>
                <h2 class="text-5xl font-extrabold text-[#333]">${{totalAll}}</h2>
            </div>
                <ul class="mt-10 space-y-6 pb-4 dark:text-gray-600">
                    <li class="flex flex-wrap gap-4 text-base">Original price <span class="ml-auto font-bold">${{ data.totalPrice }}</span></li>
                    <li class="flex flex-wrap gap-4 text-base">Savings <span class="ml-auto font-bold text-emerald-500">${{save}}</span></li>
                    <li class="flex flex-wrap gap-4 text-base">Cost <span class="ml-auto font-bold text-emerald-500">${{total }}</span></li>
                    <li class="flex flex-wrap gap-4 text-base">Tax 5%<span class="ml-auto font-bold text-red-500">${{ tax }}</span></li>
                    <li class="flex flex-wrap gap-4 text-base font-bold border-t-2 pt-4">Total <span class="ml-auto">${{ totalAll }}</span></li>
                </ul>
            </div>
            <div class="flex flex-wrap gap-4 mt-8 justify-between">
                <button @click.prevent="$emit('back')"  type="button" class="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200">Back</button>
                <button @click="payment()" type="button" class="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]">Confirm payment ${{totalAll}}</button>
              </div>
        </div>
</div>
</template>
