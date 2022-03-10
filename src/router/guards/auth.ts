import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> | void {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const requiresUnauth = to.matched.some((route) => route.meta.requiresUnauth);

  const authStore = useAuthStore();
  const appStore = useAppStore();

  if (requiresAuth && !authStore.isAuthenticated) {
    authStore.saveRedirectRoute(to);
    next({ name: 'Login', query: { redirect: to.fullPath } });
    appStore.setToast({ title: 'Auth Error', text: 'You must be logged in' }, 'danger');
  } else if (requiresUnauth && authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
}
