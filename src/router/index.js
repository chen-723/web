import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/components/LoginBox.vue') },
  { path: '/register', component: () => import('@/views/RegisterPage.vue') }, // ✅ 改这里
  { path: '/home', name: 'HomePage', component: () => import('@/views/HomePage.vue') },
  { path: '/', redirect: '/login' }
]


const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router