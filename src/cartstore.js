import { defineStore } from 'pinia'
import{ ref, reactive } from 'vue'
export const useCartStore = defineStore('cart', () => {
    const cartData = ref([])
    const count = ref(0)
    const name = ref(['Eduardo','bujang'])
    function increment() {
        count.value++;
    }
    const product = reactive({})
    function addProduct (){
        cartData.value.push(product.value)
        
    }
  
    return { count, name, increment, addProduct, cartData, product}
  })