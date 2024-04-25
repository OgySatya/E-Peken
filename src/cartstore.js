import { defineStore } from 'pinia'
import{ ref, reactive, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
    const cartData = ref([])
    const count = ref(0)
    const name = ref(['Eduardo','bujang'])
    
    const product = reactive({})
    function addProduct (){
    cartData.value.push(product.value)
    }
    const totalCart = computed(() => {
      return cartData.value.reduce((acc, data) => acc += data.count, 0);
   });
   
    return { count, name, addProduct, cartData, product, totalCart}
  })