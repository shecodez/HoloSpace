<script setup lang="ts">
import { reactive, watch } from 'vue';
import { RouteLocationRaw, RouterView, useRouter } from 'vue-router';
import { createToast, withProps } from 'mosha-vue-toastify';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import Toast from '@/components/DockUI/Toast.vue';
import useSupabase from '@/use/supabase';
// import useAuth from '@/use/auth';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';

const { supabase } = useSupabase();
const router = useRouter();
const authStore = useAuthStore();
const appStore = useAppStore();
const breakpoints = useBreakpoints(breakpointsTailwind);

const state = reactive({
  sideDrawerPreBreakpoint: false,
  metaDrawerPreBreakpoint: false,
});

authStore.loadUser();

supabase.auth.onAuthStateChange((event, session) => {
  // const { user } = useAuth();
  // user.value = session?.user || undefined;

  if (event === 'SIGNED_IN') {
    authStore.loadUser();
    authStore.loadRedirectRoute();
  } else if (event === 'SIGNED_OUT') {
    authStore.clearUser();
  }
});

authStore.$onAction(({ name, store, after }) => {
  if (name === 'loadRedirectRoute') {
    after(async () => {
      const redirectRoute = store.redirectRoute;
      if (redirectRoute) {
        await router.isReady();
        await router.replace(redirectRoute as RouteLocationRaw);
        authStore.clearRedirectRoute();
      }
    });
  }
});

authStore.$onAction(({ name, store, after }) => {
  if (name === 'loadUser') {
    after(async () => {
      authStore.setUserData(authStore.userId!);
    });
  }
});

appStore.$onAction(({ name, store, after }) => {
  if (name === 'setToast') {
    after(async () => {
      const text = store.toastText;
      const title = store.toastTitle;
      const type = store.toastType;
      if (text) {
        createToast(withProps(Toast, { type, title, text }), { type });
      }
    });
  }
});

const lgAndLarger = breakpoints.greater('lg');
watch(
  () => lgAndLarger.value,
  (lgAndLarger: Boolean) => {
    if (lgAndLarger) {
      appStore.setSideDrawerCollapsed(state.sideDrawerPreBreakpoint);
      appStore.setMetaDrawerCollapsed(state.metaDrawerPreBreakpoint);
    } else {
      state.sideDrawerPreBreakpoint = appStore.isSideDrawerCollapsed;
      state.metaDrawerPreBreakpoint = appStore.isMetaDrawerCollapsed;

      appStore.setSideDrawerCollapsed(true);
      appStore.setMetaDrawerCollapsed(true);
    }
  },
  { immediate: true },
);
</script>

<template>
  <router-view></router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Barlow+Condensed:wght@400;700&family=Barlow:wght@400;700&display=swap');

/* ------------------- */
/* Reset               */
/* ------------------- */

/* https://piccalil.li/blog/a-modern-css-reset/ */

/* Box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* set up the body */
body,
#app {
  /* @apply h-full; */
  line-height: 1.5;
  min-height: 100vh;
  font-family: 'Barlow', sans-serif;
}

/* make images easier to work with */
img,
picutre {
  max-width: 100%;
  display: block;
}

/* remove animations for people who've turned them off */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    background-attachment: initial !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
}

/* ------------------- */
/* Global              */
/* ------------------- */

.bg-0d0d0d {
  background-color: #0d0d0d;
}

.font-brand {
  font-family: 'Audiowide', cursive;
}
.font-sans-normal {
  font-family: 'Barlow', sans-serif;
}
.font-sans-accent {
  font-family: 'Barlow Condensed', sans-serif;
}

.my-divider {
  @apply border-gray-400 border-opacity-70;
}

.ribbon-tail:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
}

.tooltip-arrow-top:after {
  content: '';
  position: absolute;
  bottom: 100%;
  top: 1;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px;
  background: inherit;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}

.t-border-menu {
  @apply bg-base-100 rounded border-t-2 border-primary;
}

label.label {
  @apply text-xs uppercase font-medium inline-block;
}
.form-control.required .label:after {
  content: ' *';
  color: red;
}
</style>
