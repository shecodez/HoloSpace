<template>
  <ul class="t-border-menu menu horizontal bg-base-100 shadow-lg">
    <li v-for="reaction in reactions" :key="reaction.emoji">
      <button class="btn btn-sm btn-square btn-ghost rounded-none" :title="reaction.name">
        {{ reaction.emoji }}
      </button>
    </li>
    <li>
      <button class="btn btn-sm btn-square btn-ghost rounded-none" title="Reply">
        <Icon icon="carbon:reply" width="20" class="text-primary" />
      </button>
    </li>
    <!-- <li>
      <button class="btn btn-sm btn-square btn-ghost rounded-none" title="More Options">
        <Icon icon="mdi:dots-horizontal" width="20" />
      </button>
    </li> -->
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const reactions = ref([
  { emoji: '👌', name: 'OK' },
  { emoji: '👍', name: 'Like' },
  { emoji: '🤣', name: 'LOL' },
  { emoji: '🥰', name: 'Love' },
  { emoji: '😱', name: 'Fear' },
  { emoji: '🤬', name: 'Angry' },
]);
</script>
