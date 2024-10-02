import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component:() => import('../components/game.vue')},
  { path: '/history',component:() => import('../components/history.vue')},
  { path: '/profile',component:() => import('../components/profile.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;