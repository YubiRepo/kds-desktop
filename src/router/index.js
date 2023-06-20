import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'KDS',
      icon: 'mdi-account',
      visible: true,
    },
    component: () => import('../views/auth/Login.vue')
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



