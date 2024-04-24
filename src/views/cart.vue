<script setup>
import { useCartStore } from '../cartstore.js'
import { computed } from 'vue'

const store = useCartStore()
console.log(store.cartData)
</script>
<template>
    <div class="container mx-auto">
    <h1>My Cart</h1>
    
    <ul class="max-w-md divide-y-2 divide-gray-300">
   <li v-for="(list, index ) in store.cartData" class="py-2">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
         <div class="flex-shrink-0">
            <img class="w-16 h-16 rounded-3xl" :src="list.image">
         </div>
         <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
               {{ list.title }}
            </p>
            <div class="flex justify-between mx-14">
               <p class="text-sm text-gray-500 truncate">
               ${{ list.price }}                  
            </p>*
               <p class="text-sm text-gray-500 truncate">
               {{ list.count }}
            </p>
            <button @click="++store.cartData[index].count">+</button>
         </div>
            
         </div>
         <div class="inline-flex items-center text-lg font-semibold text-gray-900">
            ${{ list.count*list.price }}
         </div>
      </div>
   </li>
   
</ul>
</div>

</template>