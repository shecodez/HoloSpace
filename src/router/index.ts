import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Comms from '@/views/Comms.vue';
//import DirectComms from '@/views/DirectComms.vue';
import Terms from '@/views/legal/Terms.vue';
import Privacy from '@/views/legal/Privacy.vue';
import NotFound from '@/views/error/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/d/:deck_id/:diskspace_id',
    name: 'Comms',
    component: Comms,
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
