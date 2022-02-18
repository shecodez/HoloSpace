import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createToast, withProps } from 'mosha-vue-toastify';

import Toast from '@/components/DockUI/Toast.vue';
import useAuth from '@/use/auth';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import Chat from '@/views/chat/Index.vue';
import TeamChat from '@/views/chat/Team.vue';
import H010 from '@/views/chat/H010.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: () => import('@/views/_test/Index.vue'),
  // },
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
    component: () => import('@/views/auth/Logout.vue'),
    beforeEnter: async (to, from, next) => {
      const { logout } = useAuth();
      await logout();

      next({ name: 'Home' });
    },
  },
  {
    path: '/@me',
    name: 'Me',
    component: () => import('@/views/Me.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/h010dex/@:h010tag',
    name: 'Profile',
    component: () => import('@/views/h010dex/Profile.vue'),
  },
  // {
  //   path: '/d/:deck_id/:type/:space_id',
  //   name: 'Chat',
  //   component: Chat, // () => import('@/views/Chat.vue'),
  //   beforeEnter: (to, from, next) => {
  //     const types = ['text', 'voip', 'h010'];
  //     types.includes(to.params.type?.toString().toLowerCase())
  //       ? next() // :type can only be text | voip | h010
  //       : next({ name: 'NotFound', replace: false });
  //   },
  //   meta: { requiresAuth: true },
  // },
  // TODO: fix /d should not a route
  {
    path: '/d',
    name: 'Chat',
    component: Chat,
    children: [
      { path: '/d/:deck_id/TEXT/:space_id', name: 'TEXTChat', component: Chat },
      { path: '/d/:deck_id/VoIP/:space_id', name: 'VOIPChat', component: Chat },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/d/:deck_id/H010/:space_id',
    name: 'H010Chat',
    component: H010,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/team',
    name: 'TeamChat',
    component: TeamChat,
    children: [
      { path: '/team/TEXT/:space_id', name: 'TeamTEXTChat', component: TeamChat },
      { path: '/team/VoIP/:space_id', name: 'TeamVOIPChat', component: TeamChat },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/team/H010/:space_id',
    name: 'TeamH010Chat',
    component: H010,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/legal/Terms.vue'),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/legal/Privacy.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFound.vue'),
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
