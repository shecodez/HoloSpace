<template>
  <div class="m-2 grid-cols-3" :class="`grid grid-cols-${team.length % 5} gap-2`">
    <div v-for="user in team" class="h-48 flex items-center justify-center bg-base-300 bg-opacity-50">
      <UserAvatar :user="user" :size="16" :iconSize="20" textCss="text-4xl" hideIndicators />
      <div class="flex items-center">
        <button class="btn btn-ghost relative">
          <Icon icon="mdi:microphone" />
          <Icon icon="mdi:circle-off-outline" width="24" class="absolute text-error" />
        </button>
        <h5>{{ user.name }}</h5>
        <span>#{{ user.pin }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Icon } from '@iconify/vue';

import { IUser } from '@/data/interfaces';
import UserAvatar from '@/components/users/UserAvatar.vue';

const props = defineProps({
  team: {
    type: Array as PropType<IUser[]>,
    default: [],
  },
  me: {
    type: Object as PropType<IUser>,
    default: {},
  },
});
</script>

<style>
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
</style>
