import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Welcome',
    meta: {
      requiresUnauth: true,
    },
    component: () => import('../views/Welcome.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Dashboard.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch('autoLogin');

  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/');
  } else if (to.meta.requiresUnauth && store.getters.isAuth) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
