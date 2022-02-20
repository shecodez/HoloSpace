<template>
  <header class="sticky top-0 flex items-center justify-between">
    <router-link :to="{ name: 'Home' }" class="logo">
      <Logo color="#fff" :size="42" />
      <!-- <span class="text-2xl font-brand tracking-wide hidden lg:inline-flex">H010SPACE</span> -->
      <span class="sr-only">Home</span>
    </router-link>

    <button
      @click="toggleMenu"
      aria-controls="main-nav"
      :aria-expanded="state.menuOpen"
      class="block md:hidden btn btn-square btn-ghost absolute z-50 top-4 right-4"
    >
      <label class="btn btn-square swap swap-rotate">
        <input type="checkbox" :checked="state.menuOpen" />
        <Icon icon="mdi:menu" width="24" />
        <Icon icon="mdi:close" width="24" />
        <span class="sr-only">Menu</span>
      </label>
    </button>

    <nav>
      <ul id="main-nav" :data-visible="state.menuOpen" class="main-nav flex gap-4 lg:gap-6">
        <template v-for="(item, i) in menuItems" :key="item.id">
          <li class="nav-li hover:border-b-2" :class="$route.name === item.id && 'active'">
            <router-link
              :to="{ name: `${item.id}` }"
              class="font-sans-accent block p-2 md:p-6 lg:p-8 uppercase tracking-widest"
            >
              <span aria-hidden="true" class="font-bold">{{ String(i).padStart(2, '0') }}</span>
              {{ item.name }}
            </router-link>
          </li>
        </template>
        <li v-if="user?.email" class="flex items-center">
          <router-link :to="{ name: 'Me' }" class="btn btn-outline gap-2 rounded-full"> Open App </router-link>
        </li>
        <li v-else class="flex items-center">
          <router-link :to="{ name: 'Login' }" class="btn btn-outline gap-2 rounded-full">
            <Icon icon="mdi:key" width="14" />
            Login
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';

import Logo from '@/components/Logo.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import useAuth from '@/use/auth';

const { user } = useAuth();

const menuItems = [
  {
    id: 'Home',
    name: 'Home',
  },
  {
    id: 'Test',
    name: 'Test',
  },
  {
    id: 'Terms',
    name: 'Crew Regs',
  },
  {
    id: 'Privacy',
    name: 'Privacy',
  },
];

const state = reactive({
  menuOpen: false,
});

function toggleMenu() {
  state.menuOpen = !state.menuOpen;
}
</script>

<style scoped>
.logo {
  margin: 1rem clamp(1.5rem, 5vw, 3.5rem);
}

.nav-li {
  @apply border-transparent border-r-4 md:border-r-0 md:border-b-2;
}
.nav-li:hover,
.nav-li:focus {
  @apply border-white border-opacity-50;
}
.nav-li.active {
  @apply border-white border-r-4 md:border-r-0 md:border-b-2;
}

.main-nav {
  background-color: hsl(0 0% 0% / 0.5);
}
@supports (backdrop-filter: blur(1rem)) {
  .main-nav {
    background-color: hsl(0 0% 100% / 0.05);
    backdrop-filter: blur(1rem);
  }
}

.main-nav a > [aria-hidden='true'] {
  margin-inline-end: 0.5em;
}

@media (min-width: 35em) {
  .main-nav {
    padding-inline: clamp(3rem, 7vw, 7rem);
  }
}

@media (min-width: 55em) {
  header::after {
    content: '';
    display: block;
    position: relative;
    height: 1px;
    width: 100%;
    margin: 0 -2.75rem 0 0;
    background-color: hsl(0 0% 100% / 0.15);
    order: 1;
  }
  nav {
    order: 2;
    flex-shrink: 0;
  }
  .main-nav {
    margin-block: 2rem;
  }
}

@media (min-width: 35em) and (max-width: 55em) {
  .main-nav a > [aria-hidden='true'] {
    display: none;
  }
}

@media (max-width: 35em) {
  .main-nav {
    position: fixed;
    inset: 0 0 0 30%;
    z-index: 10;

    flex-direction: column;
    padding: min(30vh, 10rem) 0 min(30vh, 10rem) 2em;

    transform: translateX(100%);
    transition: transform 350ms ease-out;
  }

  .main-nav[data-visible='true'] {
    transform: translateX(0%);
  }
}
</style>
