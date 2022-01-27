import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/links',
    name: 'Links',
    component: () =>
      import(/* webpackChunkName: "link" */ '../views/links/Links'),
  },
  {
    path: '/article/:id',
    name: 'article',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "article" */ '../components/article/index'),
  },

  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "404" */ '../components/404'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
// 前置守卫
router.beforeEach((to, from, next) => {
  // ...
  next()
  NProgress.start()
  // 返回 false 以取消导航
  return false
})
// 后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
