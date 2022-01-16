<template>
  <div class="navbar shadow-lg bg-gray-200 dark:bg-gray-800" :class="collapsed ? 'collapsed flex justify-center' : ''">
    <div class="flex-none">
      <button class="btn btn-circle btn-ghost">
        <UserAvatar :user="user" :isCaptain="true" />
      </button>
    </div>
    <div class="hide-on-collapsed flex-1 mx-2 flex flex-col items-start overflow-hidden">
      <h3 class="text-lg font-bold w-full truncate">{{ user.name }}</h3>
      <span class="text-xs font-extralight text-gray-400 -mt-1.5">#{{ user.pin }}</span>
    </div>

    <div class="hide-on-collapsed">
      <button class="btn btn-square btn-sm btn-ghost">
        <Icon icon="mdi:chevron-up" width="24" />
      </button>
      <button class="btn btn-square btn-sm btn-ghost">
        <Icon icon="mdi:cog" width="24" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import { IUser } from '../data/interfaces';
import UserAvatar from './UserAvatar.vue';

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    default: {},
  },
  collapsed: Boolean,
});

const { user, collapsed } = toRefs(props);
</script>
