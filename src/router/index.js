import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/backLogin',
    name: 'backLogin',
    component: () => import('../components/admin/BackLogin.vue')
  },
  {
    path: '/',
    name: 'back',
    component: () => import('../components/admin/Back.vue'),
    children: [
      {
        path: '/myIndex',
        name: 'myIndex',
        component: () => import('../components/admin/MyIndex.vue')
      },
      {
        path: '/manageCategory',
        name: 'manageCategory',
        component: () => import('../components/admin/ManageCategory.vue')
      },
      {
        path: '/manageShop',
        name: 'manageShop',
        component: () => import('../components/admin/ManageShop.vue')
      }, 
      {
        path: '/manageUser',
        name: 'manageUser',
        component: () => import('../components/admin/ManageUser.vue')
      }, 
      {
        path: '/manageOrder',
        name: 'manageOrder',
        component: () => import('../components/admin/ManageOrder.vue')
      }, 
      {
        path: '/manageComment',
        name: 'manageComment',
        component: () => import('../components/admin/ManageComment.vue')
      },
      {
        path: '/myAbout',
        name: 'myAbout',
        component: () => import('../components/admin/MyAbout.vue')
      },
      {
        path: '/CategorySales',
        name: 'CategorySales',
        component: () => import('../components/admin/CategorySales.vue')
      }
      
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
