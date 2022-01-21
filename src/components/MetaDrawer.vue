<template>
  <Drawer :collapsed="collapsed" minW="w-20">
    <Panel css="bg-base-300 bg-opacity-70">
      <template #header>
        <div class="navbar" :class="collapsed ? 'collapsed flex justify-center' : ''">
          <div class="flex-none">
            <button
              @click="$emit('toggleCollapsed')"
              class="btn btn-square btn-ghost"
              :class="collapsed && 'transform rotate-180'"
            >
              <Icon icon="mdi:forwardburger" width="24" />
            </button>
          </div>
          <div class="flex-1 mx-2 hide-on-collapsed">
            <span class="text-lg font-bold">Crew</span>
          </div>
        </div>
      </template>

      <div class="users overflow-y-auto overflow-x-hidden" :class="collapsed ? 'collapsed' : ''">
        <UserList title="On-Deck" :users="usersOnline" />
        <UserList title="Offline" :users="usersOffline" offline />
      </div>

      <template #footer>
        <UserToolbar :user="users[1]" :collapsed="collapsed" />
      </template>
    </Panel>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Drawer from '@/components/MyDrawer.vue';
import Panel from '@/components/Panel.vue';
import UserList from '@/components/UserList.vue';
import UserToolbar from './UserToolbar.vue';
import { IUser } from '../data/interfaces';

const props = defineProps({
  users: {
    type: Array as PropType<IUser[]>,
    default: [],
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const { users, collapsed } = toRefs(props);

const usersOnline = computed(() => users.value.filter((x) => x.is_online && x.status !== 'HIDE'));
const usersOffline = computed(() => users.value.filter((x) => !x.is_online || x.status === 'HIDE'));
</script>

<style>
.collapsed .hide-on-collapsed {
  display: none;
}

.collapsed .user-list {
  @apply flex items-center;
}
</style>

<style scoped>
.users {
  overflow-y: overlay;
}
</style>
