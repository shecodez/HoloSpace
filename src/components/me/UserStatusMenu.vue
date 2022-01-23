<template>
  <ul class="t-border-menu menu menu-compact w-52 py-3 shadow-lg text-gray-200">
    <li class="menu-title">
      <span>My Status</span>
    </li>
    <li v-for="status in statuses" :key="status.id" class="hover-bordered">
      <a class="space-x-8 items-baseline" :class="user.status === status.id && 'active'">
        <Icon :icon="getStatusIcon(status.id)" :width="16" :class="getStatusColor(status.id)" />
        <div class="leading-tight">
          <b>{{ status.name }}</b>
          <p v-if="status.description" class="text-gray-300 text-sm">
            {{ status.description }}
          </p>
        </div>
      </a>
    </li>
    <template v-if="collapsed">
      <li class="menu-title">
        <span>Camera/Mic/VR</span>
      </li>
      <li class="flex items-center justify-center">
        <IOToolbar :user="user" :collapsed="collapsed" />
      </li>
      <li class="menu-title">
        <span>My Settings</span>
      </li>
      <li class="flex items-center justify-center">
        <button @click="$emit('openSettings')" class="btn btn-square btn-ghost">
          <Icon icon="mdi:cog" width="24" />
          <span class="sr-only">My Settings</span>
        </button>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import IOToolbar from '@/components/me/UserIOToolbar.vue';
import { IUser } from '@/data/interfaces';
import { OnlineStatus } from '@/data/mock';

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    default: {},
  },
  collapsed: Boolean,
});

const statuses = ref([
  { id: OnlineStatus.SHOW, name: 'Show', description: 'Available' },
  { id: OnlineStatus.AWAY, name: 'Away' },
  { id: OnlineStatus.BRB, name: 'BRB', description: 'Be Right Back' },
  { id: OnlineStatus.BUSY, name: 'Busy' },
  {
    id: OnlineStatus.DND,
    name: 'DND',
    description: 'Do NOT Disturb',
  },
  { id: OnlineStatus.HIDE, name: 'Hide', description: 'Go Invisible' },
]);

function getStatusIcon(status: OnlineStatus, isOnline = true) {
  if (!isOnline) return 'mdi:circle';

  switch (status) {
    case OnlineStatus.SHOW:
      return 'mdi:check-circle';
    case OnlineStatus.BRB:
      return 'mdi:clock-outline';
    case OnlineStatus.DND:
      return 'mdi:minus-circle-outline';
    default:
      return 'mdi:circle';
  }
}

function getStatusColor(status: OnlineStatus, isOnline = true) {
  if (!isOnline) return 'text-gray-500';

  switch (status) {
    case OnlineStatus.AWAY:
    case OnlineStatus.BRB:
      return 'text-warning';
    case OnlineStatus.BUSY:
    case OnlineStatus.DND:
      return 'text-error';
    case OnlineStatus.SHOW:
      return 'text-success';
    default:
      return 'text-gray-500';
  }
}

const { user, collapsed } = toRefs(props);
</script>

<style scoped>
.items-baseline {
  align-items: baseline;
}
</style>
