import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createToast, withProps } from 'mosha-vue-toastify';

import Toast from '@/components/DockUI/Toast.vue';

import Test from '@/views/Test.vue';
import Home from '@/views/Home.vue';
import Comms from '@/views/Comms.vue';
import H010Comms from '@/views/H010Comms.vue';
import DirectComms from '@/views/DirectComms.vue';
import Terms from '@/views/legal/Terms.vue';
import Privacy from '@/views/legal/Privacy.vue';
import NotFound from '@/views/error/NotFound.vue';
import Login from '@/views/auth/Login.vue';
import Logout from '@/views/auth/Logout.vue';
import Register from '@/views/auth/Register.vue';
import Me from '@/views/@me.vue';
import Profile from '@/views/Profile.vue';
import useAuth from '@/use/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: async (to, from, next) => {
      const { logout } = useAuth();
      await logout();

      next({ name: 'Home' });
    },
  },
  {
    path: '/@me',
    name: 'Me',
    component: Me,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/h010dex/@:h010tag',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/d/:deck_id/TEXT/:diskspace_id',
    name: 'TEXTComms',
    component: Comms,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/d/:deck_id/VoIP/:diskspace_id',
    name: 'VOIPComms',
    component: Comms,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/d/:deck_id/H010/:diskspace_id',
    name: 'H010Comms',
    component: H010Comms,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/direct',
    name: 'DirectCommsRoot',
    component: DirectComms,
    children: [
      { path: '/direct/TEXT/:diskspace_id', name: 'DirectTEXTComms', component: DirectComms },
      { path: '/direct/VoIP/:diskspace_id', name: 'DirectVOIPComms', component: DirectComms },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/direct/H010/:diskspace_id',
    name: 'DirectH010Comms',
    component: H010Comms,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

// create router instance
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const requiresUnauth = to.matched.some((route) => route.meta.requiresUnauth);

  const { isLoggedIn } = useAuth();

  if (requiresAuth && !isLoggedIn()) {
    createToast(
      withProps(Toast, {
        type: 'error',
        title: 'Oops',
        text: 'You must be logged in',
      }),
      { type: 'danger' },
    );
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else if (requiresUnauth && isLoggedIn()) next('/');
  else next();
});
