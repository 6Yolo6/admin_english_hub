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
        component: () => import('../components/user/ManageUser.vue')
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
