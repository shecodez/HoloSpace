<template>
  <div v-if="user?.name" class="relative overflow-hidden flex-shrink-0" :class="`w-${size} h-${size}`">
    <div class="user avatar cursor-pointer" :class="user?.image_url ? '' : 'placeholder'" :title="user?.name">
      <div class="text-neutral-content rounded-full" :class="[bgCss, `w-${size} h-${size}`]">
        <img v-if="user?.image_url" :src="user?.image_url" alt="User 2d-Avatar" class="inline-block" />
        <span v-else :class="textCss">{{ user?.name.charAt(0) }}</span>
      </div>
    </div>
    <template v-if="!hideIndicators">
      <Icon v-if="isCaptain" icon="emojione:crown" :width="iconSize" class="absolute left-0 top-0" />
      <Icon
        v-if="user.status"
        :icon="getStatusIcon(user.status, user.is_online)"
        :width="iconSize"
        class="status absolute bottom-0 right-0"
        :class="getStatusColor(user.status, user.is_online)"
      />
    </template>
  </div>
  <Skeleton v-else :css="`bg-accent w-${size} h-${size}`" />
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import { OnlineStatus } from '@/data/mock';
import { IUser } from '@/data/interfaces';
import Skeleton from '@/components/DockUI/Skeleton.vue';

const props = defineProps({
  user: Object as PropType<IUser | Partial<IUser>>,
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
  hideIndicators: {
    type: Boolean,
    default: false,
  },
  bgCss: {
    type: String,
    default: 'bg-primary',
  },
});

const { user } = toRefs(props);

function getStatusIcon(status: OnlineStatus, is_online?: boolean) {
  if (!is_online) return 'mdi:circle';

  switch (status) {
    case OnlineStatus.SHOW:
      return 'mdi:check-circle';
    case OnlineStatus.BRB:
      return 'mdi:clock';
    case OnlineStatus.DND:
      return 'mdi:minus-circle';
    default:
      return 'mdi:circle';
  }
}

function getStatusColor(status: OnlineStatus, is_online?: boolean) {
  if (!is_online) return 'text-gray-500';

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

<style scoped>
.w-7 {
  width: 1.75rem;
}
.h-7 {
  height: 1.75rem;
}
.w-8 {
  width: 2rem;
}
.h-8 {
  height: 2rem;
}
.w-16 {
  width: 4rem;
}
.h-16 {
  height: 4rem;
}
</style>
