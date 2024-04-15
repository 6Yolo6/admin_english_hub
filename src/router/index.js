import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/backLogin',
    name: 'backLogin',
    component: () => import('../components/BackLogin.vue')
  },
  {
    path: '/',
    name: 'back',
    component: () => import('../components/Back.vue'),
    children: [
      {
        path: '/manageUser',
        name: 'manageUser',
        component: () => import('../views/user/ManageUser.vue')
      }, 
      {
        path: '/manageEBook',
        name: 'manageEBook',
        component: () => import('../views/eBook/ManageEBook.vue')
      },
      {
        path: '/manageEBookSeries',
        name: 'manageEBookSeries',
        component: () => import('../views/eBookSeries/ManageEBookSeries.vue')
      },
      {
        path: '/myAbout',
        name: 'myAbout',
        component: () => import('../components/MyAbout.vue')
      },
      
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
