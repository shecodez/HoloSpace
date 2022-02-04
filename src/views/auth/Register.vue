<template>
  <Layout :backgroundImageUrl="state.backgroundImageUrl" pageTitle="Register">
    <div>
      <h2 class="text-center font-bold mb-4">Create an Account</h2>
      <RegisterForm />
      <p class="text-center text-sm font-semibold">
        Have an account? <router-link to="/login" class="link-primary">Login</router-link>
      </p>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import Layout from '@/layouts/AuthLayout.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';

const state = reactive({
  backgroundImageUrl: 'https://heipqgxfpjhqerywembc.supabase.in/storage/v1/object/public/backgrounds/auth-bg.jpg',
});
</script>
