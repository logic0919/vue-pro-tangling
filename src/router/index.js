import { createRouter, createWebHistory } from 'vue-router'
import loginPage from '../views/loginPage.vue'
import index from '../views/index.vue'
import test from '../views/testPage.vue'
import royalDetail from '../views/royalDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/royalDetail/:id',
      name: 'royalDetail',
      component: royalDetail
    }
  ]
})

export default router
