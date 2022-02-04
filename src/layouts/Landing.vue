<template>
  <div class="flex h-full">
    <div class="max-w-screen md:w-5/12 lg:w-3/12 bg-0d0d0d min-h-screen p-8 md:p-12 text-gray-200 flex flex-col gap-4">
      <div class="mb-4">
        <a href="#">
          <span class="sr-only">H010SPACE</span>
          <Logo color="#4f46e5" :size="100" />
        </a>
      </div>
      <div class="text-5xl font-extrabold">
        <h2 class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-400">Get early access</h2>
      </div>
      <p>We'll announce it first in our newsletter</p>

      <div v-if="state.error" class="error-alert p-4 flex items-center my-4">🛑 {{ state.error }}</div>
      <div v-if="state.sent" class="success-alert p-4 flex items-center my-4">✔️ You're subscribed. Thanks!</div>
      <form v-else @submit.prevent="subscribeToNewsletter" class="flex-1 flex flex-col gap-2">
        <div
          class="d-textfield relative bg-white bg-opacity-10 px-4 pt-5 pb-1.5 rounded-t border-b border-white border-opacity-40"
        >
          <input
            type="email"
            name="email"
            v-model="state.email"
            placeholder=" "
            class="block bg-transparent w-full appearance-none focus:outline-none text-sm text-white"
            required
          />
          <label for="email" class="absolute top-0 transform translate-y-1/2 duration-300">E-Mail</label>
        </div>
        <button
          type="submit"
          class="btn px-4 py-2 rounded bg-gradient-to-r from-indigo-600 to-cyan-400"
          :class="state.loading && 'loading'"
        >
          <span class="text-lg font-bold uppercase tracking-wide">Subscribe</span>
        </button>
      </form>

      <p class="text-gray-600 mt-auto">
        By clicking "Subscribe" you agree to our
        <router-link to="/privacy" class="text-indigo-600">Privacy Policy</router-link>
        and
        <router-link to="/terms" class="text-indigo-600">Terms of Service</router-link>. We promise, no green eggs or
        spam from us.
      </p>
    </div>
    <div class="hidden md:block md:w-7/12 lg:w-9/12 bg-black min-h-screen p-8 md:p-12 text-white overflow-hidden">
      <div class="mb-4 flex items-center gap-2 h-12">
        <Logo color="#fff" :size="56" />
        <span class="text-3xl font-brand font-bold tracking-wide">H010SPACE</span>
      </div>
      <div class="h-full py-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import useSupabase from '@/use/supabase';
import Logo from '@/components/Logo.vue';

const state = reactive({
  loading: false,
  email: '',
  sent: false,
  error: null,
});

const { supabase } = useSupabase();

async function subscribeToNewsletter() {
  try {
    state.loading = true;

    let { data, error, status } = await supabase.from('subscribers').upsert({
      email: state.email,
    });
    if (error && status !== 406) throw error;

    if (data) {
      state.sent = true;
      console.log('subscribed to newsletter', data);
    }
  } catch (e: any) {
    state.error = e.error_description || e.message;
  } finally {
    state.loading = false;
  }
}
</script>

<style scoped>
.d-textfield:focus-within {
  border-bottom: 2px solid cyan;
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.d-textfield:focus-within input {
  caret-color: cyan;
}
.d-textfield:focus-within label {
  color: cyan;
}

.d-textfield input:focus-within ~ label,
.d-textfield input:not(:placeholder-shown) ~ label {
  transform: translate(-0.2em) scale(0.74);
}

.success-alert {
  @apply border-l-4 border-green-500 bg-green-400 bg-opacity-30 text-green-500;
}
.error-alert {
  @apply border-l-4 border-red-500 bg-red-400 bg-opacity-30 text-red-500;
}
</style>
