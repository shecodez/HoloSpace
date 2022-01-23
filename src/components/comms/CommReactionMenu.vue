<template>
  <ul class="menu px-3 shadow-lg bg-base-100 rounded-box horizontal">
    <li v-for="reaction in reactions" :key="reaction.emoji">
      <button class="btn btn-xs btn-square btn-ghost">
        {{ reaction.emoji }}
      </button>
    </li>
    <li>
      <button class="btn btn-xs btn-square btn-ghost">
        <Icon icon="mdi:dots-horizontal" width="20" />
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const reactions = ref([
  { emoji: '👍', name: 'Like' },
  { emoji: '👌', name: 'OK' },
  { emoji: '🤣', name: 'LOL' },
  { emoji: '🥰', name: 'Love' },
  { emoji: '🤬', name: 'Angry' },
  { emoji: '😱', name: 'Fear' },
]);
</script>
