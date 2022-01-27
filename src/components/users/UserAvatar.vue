<template>
  <div class="relative">
    <div class="user avatar cursor-pointer" :class="user?.image_url ? '' : 'placeholder'" :title="user?.name">
      <div class="bg-primary text-neutral-content rounded-full" :class="`w-${size} h-${size}`">
        <img v-if="user?.image_url" :src="user?.image_url" alt="User 2d-Avatar" class="inline-block" />
        <span v-else :class="textCss">{{ user?.name.charAt(0) }}</span>
      </div>
    </div>
    <Icon v-if="isCaptain" icon="mdi:view-headline" :width="iconSize" class="absolute left-0 top-0 text-yellow-500" />
    <Icon
      v-if="user"
      :icon="getStatusIcon(user.status, user.is_online)"
      :width="iconSize"
      class="status absolute bottom-0 right-0"
      :class="getStatusColor(user.status, user.is_online)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import { OnlineStatus } from '@/data/mock';
import { IUser } from '@/data/interfaces';

const props = defineProps({
  user: Object as PropType<IUser>,
  isCaptain: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 10,
  },
  iconSize: {
    type: Number,
    default: 14,
  },
  textCss: {
    type: String,
    default: 'text-xl',
  },
});

const { user } = toRefs(props);

function getStatusIcon(status: OnlineStatus, isOnline: boolean) {
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

function getStatusColor(status: OnlineStatus, isOnline: boolean) {
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
</script>
