import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
  {
    path: '/',
<<<<<<< HEAD
    redirect: '/home'
  },

  {
    path: '/home',
    name: 'home',
=======
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'login',
>>>>>>> 5e29ebae3946e5d4f3bbbf6aef4ed944dec725c4
    meta: {
      title: 'KDS',
      icon: 'mdi-account',
      visible: true,
    },
<<<<<<< HEAD
    component: () => import('@/views/HomeView')
=======
    component: () => import('../views/auth/Login.vue')
>>>>>>> 5e29ebae3946e5d4f3bbbf6aef4ed944dec725c4
  },

  {
    path: '/',
    name: 'home',
    meta: {
      title: 'home',
    },

    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'KDS',
          icon: 'mdi-view-dashboard',
          visible: true,
        },
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/Authenticated"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
})

export default router



