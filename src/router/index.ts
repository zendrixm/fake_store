import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('../views/ProductView.vue'),
  },
  // (other routes will come later)
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
