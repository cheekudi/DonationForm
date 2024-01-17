import { createRouter, createWebHistory } from 'vue-router'
import DonationView from '../views/DonationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DonationView
    }
  ]
})

export default router
