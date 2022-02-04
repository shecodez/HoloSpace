<template>
  <div v-if="state.error" class="alert alert-error rounded my-2">
    <div class="flex-1 flex gap-2 justify-start">
      <Icon icon="carbon:error" width="24" />
      <label>{{ state.error }}</label>
    </div>
  </div>

  <form @submit.prevent="submitRegister" class="flex flex-col">
    <div class="form-control">
      <label class="label">Username</label>
      <input
        v-focus
        type="text"
        v-model="credentials.username"
        placeholder="username"
        class="input input-bordered"
        :class="v$.username.$error ? 'input-error' : 'input-primary'"
      />
      <span class="label-text-alt text-error" v-if="v$.username.$error">
        {{ v$.username.$errors[0].$message }}
      </span>
    </div>

    <div class="form-control required">
      <label class="label">E-mail</label>
      <input
        v-focus
        type="text"
        v-model="credentials.email"
        placeholder="E-mail"
        class="input input-bordered"
        :class="v$.email.$error ? 'input-error' : 'input-primary'"
      />
      <span class="label-text-alt text-error" v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </span>
    </div>

    <div class="form-control required">
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
          tabindex="-1"
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

      <div class="pw-str-meter mt-2 flex w-full">
        <template v-for="(v, i) in 4" :key="i">
          <div class="w-1/4 px-1">
            <div
              class="h-1 rounded-xl transition-colors"
              :class="
                i < state.passwordScore
                  ? state.passwordScore <= 2
                    ? 'bg-error'
                    : state.passwordScore <= 3
                    ? 'bg-warning'
                    : 'bg-success'
                  : 'bg-base-100'
              "
            />
          </div>
        </template>
      </div>
    </div>
    <button class="btn btn-primary my-4" :class="state.loading && 'loading'">Register</button>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import useValidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { Icon } from '@iconify/vue';
import { createToast, withProps } from 'mosha-vue-toastify';

import { IAuth } from '@/data/interfaces';
//import { PasswordStrength } from '@/data/mock';
import useAuth from '@/use/auth';
import Toast from '@/components/DockUI/Toast.vue';

const state = reactive({
  showPassword: false,
  //passwordStrength: PasswordStrength.VERY_WEAK,
  passwordScore: 0,
  loading: false,
  userSession: null,
  error: null,
});

const credentials = reactive<IAuth>({
  username: '',
  email: '',
  password: '',
});

function togglePasswordText() {
  state.showPassword = !state.showPassword;
}

// TODO: use more in-depth password scoring
// https://stackoverflow.com/a/11268104
function scorePassword(pass: string) {
  let score = 0;
  if (!pass) return score;
  if (pass.length < 6) return score;

  // award every unique letter until 5 repetitions
  let letters: any = {};
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  let variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  Object.entries(variations).forEach(([key, value]) => {
    // console.log(key, value);
    variationCount += value === true ? 1 : 0;
  });
  score += (variationCount - 1) * 10;

  return Number(score);
}

watch(
  () => credentials.password,
  (password) => {
    state.passwordScore = scorePassword(password!) / 42;
  },
);

const rules = computed(() => {
  return {
    username: {},
    email: { required, email },
    password: { required },
  };
});

const v$ = useValidate(rules, credentials);

const { register } = useAuth();

async function submitRegister(): Promise<void> {
  state.error = null;
  v$.value.$validate();
  if (v$.value.$error) return;

  //console.log('register', credentials);
  try {
    state.loading = true;
    await register(credentials);

    createToast(
      withProps(Toast, {
        type: 'success',
        title: 'Registration successful',
        text: `A confirmation e-mail should be sent to '${credentials.email}' soon!`,
      }),
      { type: 'success' },
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

.pw-str-meter {
  color: rgb(175, 175, 175);
  display: flex;
  height: 0.25rem;
}
.pw-str-meter svg {
  fill: currentColor;
  height: 100%;
  padding: 0 0.25%;
  transition: all 0.6s ease-in-out;
  width: 25%;
}
</style>
