import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { authGuard } from './guards/auth';
import useAuth from '@/use/auth';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import Chat from '@/views/chat/Chat.vue';
import TeamChat from '@/views/chat/Team.vue';
import H010 from '@/views/chat/H010.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/_test/Test.vue'),
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
  //   path: '/d/:deckId/:type/:spaceId',
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
    props: (route) => ({ deckId: route.params.deckId, spaceId: route.params.spaceId }),
    children: [
      { path: '/d/:deckId/TEXT/:spaceId', name: 'TEXTChat', component: Chat },
      { path: '/d/:deckId/VoIP/:spaceId', name: 'VOIPChat', component: Chat },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/d/:deckId/H010/:spaceId',
    name: 'H010Chat',
    component: H010,
    //props: (route) => ({ deckId: route.params.deckId, spaceId: route.params.spaceId }),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/team',
    name: 'TeamChat',
    component: TeamChat,
    //props: (route) => ({ spaceId: route.params.spaceId }),
    children: [
      { path: '/team/TEXT/:spaceId', name: 'TeamTEXTChat', component: TeamChat },
      { path: '/team/VoIP/:spaceId', name: 'TeamVOIPChat', component: TeamChat },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/team/H010/:spaceId',
    name: 'TeamH010Chat',
    component: H010,
    //props: (route) => ({ spaceId: route.params.spaceId }),
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);
