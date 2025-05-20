import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('../views/ProductView.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: () => import('../views/ConfirmationPage.vue'),
  },

  // (other routes will come later)
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
