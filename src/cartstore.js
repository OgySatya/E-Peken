import { defineStore } from 'pinia'
import{ ref, reactive, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
  const allProduct = ref([])
    const cartData = ref([])
    const product = reactive({})
    const cari = ref('')
    function addProduct (){
    cartData.value.push(product.value)
    }
    const totalCart = computed(() => {
      return cartData.value.reduce((acc, data) => acc += data.count, 0);
   });
   const filteredName = computed(() => {
    return allProduct.value.filter(name => name.title ?
        name.title.toLowerCase().includes(cari.value.toLowerCase()) : ''
    )
})
    return { addProduct, cartData, product, totalCart,allProduct,filteredName,cari}
  })