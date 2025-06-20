import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { isDisplayed: true },
  },
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { isDisplayed: true },
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('../views/ProductView.vue'),
    meta: { isDisplayed: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
    meta: { isDisplayed: true },
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: () => import('../views/ConfirmationPage.vue'),
    meta: { isDisplayed: true },
  },
  {
    path: '/profile/:username',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: { isDisplayed: true },
  },

  // (other routes will come later)
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
