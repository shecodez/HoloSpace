<template>
  <div class="dropdown dropdown-end" title="Change Theme">
    <div tabindex="0" class="m-1 normal-case btn-ghost btn">
      <Icon icon="tabler:color-swatch" width="24" />
      <span class="hidden md:inline px-2">Change Theme</span>
      <Icon icon="mdi:chevron-down" width="20" />
    </div>
    <div
      class="mt-16 overflow-y-auto shadow-2xl top-px dropdown-content rounded h-96 w-48 bg-base-200 text-base-content border-t-2 border-primary"
    >
      <ul class="p-4 menu compact">
        <li v-for="theme in themes" :key="theme.id">
          <a tabindex="0" :data-set-theme="theme.id" data-act-class="active">{{ theme.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const themes = ref([
  { id: 'light', name: '🌝 light' },
  { id: 'dark', name: '🌚 dark' },
  { id: 'cupcake', name: '🧁 cupcake' },
  { id: 'bumblebee', name: '🐝 bumblebee' },
  { id: 'emerald', name: '✳️ Emerald' },
  { id: 'corporate', name: '🏢 Corporate' },
  { id: 'synthwave', name: '🌃 synthwave' },
  { id: 'retro', name: '👴 retro' },
  { id: 'cyberpunk', name: '🤖 cyberpunk' },
  { id: 'valentine', name: '🌸 valentine' },
  { id: 'halloween', name: '🎃 halloween' },
  { id: 'garden', name: '🌷 garden' },
  { id: 'forest', name: '🌲 forest' },
  { id: 'aqua', name: '🐟 aqua' },
  { id: 'lofi', name: '👓 lofi' },
  { id: 'pastel', name: '🖍 pastel' },
  { id: 'fantasy', name: '🧚‍♀️ fantasy' },
  { id: 'wireframe', name: '📝 Wireframe' },
  { id: 'black', name: '🏴 black' },
  { id: 'luxury', name: '💎 luxury' },
  { id: 'dracula', name: '🧛‍♂️ dracula' },
]);
</script>
