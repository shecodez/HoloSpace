<template>
  <Layout :backgroundImageUrl="state.backgroundImageUrl" pageTitle="Login">
    <div>
      <h2 class="text-center font-bold mb-4">Hey, welcome back!</h2>
      <LoginForm />
      <p class="text-center text-sm font-semibold">
        Need an account? <router-link to="/register" class="link-primary">Register</router-link>
      </p>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import Layout from '@/layouts/AuthLayout.vue';
import LoginForm from '@/components/auth/LoginForm.vue';

const state = reactive({
  backgroundImageUrl: 'https://heipqgxfpjhqerywembc.supabase.in/storage/v1/object/public/backgrounds/auth-bg.jpg',
});
</script>
