import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component:() => import('../components/game.vue')},
  { path: '/history',component:() => import('../components/history.vue')},
  { path: '/profile',component:() => import('../components/profile.vue')},
  { path: '/draw',component:() => import('../components/game_field.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;