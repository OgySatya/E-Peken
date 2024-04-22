import { createWebHistory, createRouter } from 'vue-router'

import home from './views/home.vue'
import product from './views/product.vue'
import productinfo from './views/productinfo.vue'
import cart from './views/cart.vue'

const routes = [
  { path: '/', component: home },
  { path: '/product', component: product },
  { path: '/cart', component: cart },
  { path: '/productinfo/:id',name: 'productinfo', component: productinfo },
  

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router