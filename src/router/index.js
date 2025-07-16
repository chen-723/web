import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/components/LoginBox.vue') },
  { path: '/home', name: 'HomePage', component: () => import('@/views/HomePage.vue') },
  { path: '/', redirect: '/login' }
]

const router = new VueRouter({
  mode: 'history',
  routes // ✅ 这里必须是 routes，不是 routesl
})

export default router