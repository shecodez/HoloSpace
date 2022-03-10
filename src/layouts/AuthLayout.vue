<template>
  <div class="absolute inset-x-0 mx-auto text-center top-7 md:left-7">
    <router-link to="/">
      <div class="inline-flex md:flex items-center gap-2 h-12">
        <Logo color="#fff" :size="56" />
        <span class="text-3xl font-brand font-bold tracking-wide">H010SPACE</span>
      </div>
    </router-link>
  </div>

  <div
    class="auth-layout h-screen flex items-center justify-center"
    :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
  >
    <div class="flex max-w-xl shadow-xl">
      <div class="hidden w-2/5 md:flex items-center justify-center bg-white bg-opacity-80 rounded-l rounded-tl-3xl">
        <img src="@/assets/branding/brand.png" alt="brand" class="p-2" />
      </div>
      <div class="bg-base-200 w-full md:w-3/5 py-10 px-4 md:px-8 bg-opacity-60 rounded-r md:rounded-br-3xl">
        <div v-if="authStore.isAuthenticated" class="flex flex-col items-center justify-center h-full">
          <h3>You are logged in as:</h3>
          <b class="mb-2">{{ authStore.userSession?.email }}</b>

          <LogoutButton />
        </div>
        <div v-else>
          <slot></slot>

          <div class="auth-with-social-media">
            <div class="divider">OR</div>

            <div v-if="state.error" class="alert alert-error rounded my-2">
              <div class="flex-1 flex gap-2 justify-start">
                <Icon icon="carbon:error" width="24" />
                <label>{{ state.error }}</label>
              </div>
            </div>
            <div class="flex items-center gap-4 justify-center">
              <button @click="handleAuth('google')" class="btn btn-sm btn-outline" :class="state.loading && 'loading'">
                <Icon icon="logos:google-icon" width="20" />
              </button>
              <button @click="handleAuth('twitter')" class="btn btn-sm btn-outline" :class="state.loading && 'loading'">
                <Icon icon="logos:twitter" width="20" />
              </button>
              <button @click="handleAuth('discord')" class="btn btn-sm btn-outline" :class="state.loading && 'loading'">
                <Icon icon="logos:discord-icon" width="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, toRefs } from 'vue';
import { useTitle } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

import Logo from '@/components/Logo.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import useAuth from '@/use/auth';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  backgroundImageUrl: String,
  pageTitle: String,
});
const { backgroundImageUrl, pageTitle } = toRefs(props);

const state = reactive({
  loading: false,
  error: '',
});

useTitle(`${pageTitle?.value} | ${import.meta.env.VITE_APP_NAME}`);

const router = useRouter();
const { authWithGoogle, authWithTwitter, authWithDiscord } = useAuth();
const authStore = useAuthStore();

async function handleAuth(provider: 'google' | 'twitter' | 'discord') {
  // console.log('social auth with', provider);
  try {
    state.loading = true;
    switch (provider) {
      case 'google':
        await authWithGoogle();
        break;
      case 'twitter':
        await authWithTwitter();
        break;
      case 'discord':
        await authWithDiscord();
        break;

      default:
        state.error = `Unsupported provider: ${provider} is not enable`;
        break;
    }

    router.push({ name: 'Me' });
  } catch (e: any) {
    state.error = e.error_description || e.message || e.msg;
  } finally {
    state.loading = false;
  }
}
</script>

<style scoped>
.auth-layout {
  background-position: center center;
}
</style>
