<template>
  <div v-if="state.error" class="alert alert-error rounded my-2">
    <div class="flex-1 flex gap-2 justify-start">
      <Icon icon="carbon:error" width="24" />
      <label>{{ state.error }}</label>
    </div>
  </div>

  <form @submit.prevent="submitLogin" class="flex flex-col">
    <div class="form-control required">
      <label class="label">E-mail</label>
      <div class="relative">
        <input
          v-focus
          type="text"
          v-model="credentials.email"
          placeholder="E-mail"
          class="w-full pr-16 input input-primary input-bordered"
          :class="v$.email.$error ? 'input-error' : 'input-primary'"
        />
        <button
          type="button"
          @click="submitLoginPasswordless"
          title="Send me a Magic Link (Passwordless Login)"
          class="absolute top-0 right-0 rounded-l-none btn btn-ghost"
        >
          <Icon icon="fa-solid:magic" width="20" />
        </button>
      </div>
      <span class="label-text-alt text-error" v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </span>
    </div>

    <div class="form-control">
      <label class="label">Password</label>
      <div class="relative">
        <input
          :type="state.showPassword ? 'text' : 'password'"
          v-model="credentials.password"
          placeholder="Password"
          class="w-full pr-16 input input-primary input-bordered"
          :class="v$.password.$error ? 'input-error' : 'input-primary'"
        />
        <button
          type="button"
          @click="togglePasswordText"
          :title="state.showPassword ? 'hide password' : 'show password'"
          class="absolute top-0 right-0 rounded-l-none btn btn-ghost"
        >
          <Icon :icon="state.showPassword ? 'mdi:eye-off' : 'mdi:eye'" width="20" />
        </button>
      </div>
      <span v-if="v$.password.$error" class="label-text-alt text-error">
        {{ v$.password.$errors[0].$message }}
      </span>
    </div>

    <button type="button" @click="submitForgot" class="btn btn-ghost btn-xs ml-auto">Forgot Password?</button>

    <button class="btn btn-primary my-4" :class="state.loading && 'loading'">Login</button>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import useValidate from '@vuelidate/core';
import { email, required, requiredIf } from '@vuelidate/validators';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

import { IAuth } from '@/data/interfaces';
import useAuth from '@/use/auth';
import { useAppStore } from '@/stores/app';

const state = reactive({
  showPassword: false,
  loading: false,
  userSession: null,
  error: null,
  reqPassword: false,
});

const credentials = reactive<IAuth>({
  email: '',
  password: '',
});

function togglePasswordText() {
  state.showPassword = !state.showPassword;
}

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required: requiredIf(() => state.reqPassword) },
  };
});

const v$ = useValidate(rules, credentials);
const { login, sendPasswordResetEmail } = useAuth();
const appStore = useAppStore();
const router = useRouter();

async function submitLogin() {
  state.reqPassword = true;
  v$.value.$validate();
  if (v$.value.$error) return;

  // console.log('Login', credentials);
  try {
    state.loading = true;
    await login(credentials);

    router.push({ name: 'Me' });
  } catch (e: any) {
    state.error = e.error_description || e.message;
  } finally {
    state.loading = false;
  }
}

async function submitForgot() {
  state.reqPassword = false;
  v$.value.$validate();
  if (v$.value.$error) return;

  const email = credentials.email;
  // console.log('Forgot Password', email);
  try {
    state.loading = true;
    await sendPasswordResetEmail(email);
    appStore.setToast(
      { title: 'Forgot Password?', text: `Password recovery email has been sent to '${email}'` },
      'success',
    );
  } catch (e: any) {
    state.error = e.error_description || e.message;
  } finally {
    state.loading = false;
  }
}

async function submitLoginPasswordless() {
  state.reqPassword = false;
  v$.value.$validate();
  if (v$.value.$error) return;

  const email = credentials.email;
  // console.log('Send Magic link', email);
  try {
    state.loading = true;
    await login({ email });

    appStore.setToast(
      {
        title: 'Passwordless Login',
        text: `We sent a magic link to ${email}, check your email`,
      },
      'success',
    );
  } catch (e: any) {
    state.error = e.error_description || e.message;
  } finally {
    state.loading = false;
  }
}
</script>

<style scoped>
.form-control {
  @apply mb-2;
}
.form-control:focus-within label {
  @apply text-primary;
}
</style>
