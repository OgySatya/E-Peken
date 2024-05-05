import { createWebHistory, createRouter } from 'vue-router'

import home from './views/home.vue'
import product from './views/product.vue'
import productv2 from './views/productV2.vue'
import productinfo from './views/productinfo.vue'
import cart from './views/cart.vue'
import about from './views/about.vue'
import login from './views/auth/login.vue'
import register from './views/auth/register.vue'
import useAuthStore from './stores/auth'

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/product', component: product ,meta: { requiresAuth: true } },
  { path: '/productv2', component: productv2 ,meta: { requiresAuth: true } },
  { path: '/cart', component: cart },
  { path: '/about', component: about },
  { path: '/productinfo/:id',name: 'productinfo', component: productinfo ,meta: { requiresAuth: true } },
  

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn){
    next({path : '/login',})
  }
  if(to.path === "/login" && authStore.isLoggedIn ){
    next({path : '/'});
  } 
  else next();
})


export default router
