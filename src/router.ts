import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/pages/Home.vue';
import Chat from '@/pages/Chat.vue';
import Terms from '@/pages/legal/Terms.vue';
import Privacy from '@/pages/legal/Privacy.vue';
import NotFound from '@/pages/error/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/d/:deck_id/:diskspace_id',
    name: 'Chat',
    component: Chat,
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
