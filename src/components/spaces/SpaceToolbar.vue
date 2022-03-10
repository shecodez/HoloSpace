<template>
  <div class="navbar bg-base-100">
    <div class="flex-none">
      <button
        @click="appStore.toggleSideDrawerCollapsed"
        :title="collapsed ? 'Open' : 'Collapse'"
        class="btn btn-square btn-ghost"
        :class="!collapsed && 'transform rotate-180'"
      >
        <Icon icon="mdi:forwardburger" width="24" />
      </button>
    </div>
    <div class="flex-1 px-2 mx-2 flex items-center w-full overflow-hidden divide-x divide-opacity-10">
      <h1 class="text-lg font-brand pr-2 inline-block truncate" :title="space.name">{{ space.name }}</h1>
      <span class="font-thin pl-2 truncate" :title="space.topic">{{ space.topic }}</span>
    </div>

    <div class="hidden mx-2 md:flex">
      <SearchModal />
      <CalendarModal />
      <NotificationDrawer />
    </div>

    <Popper placement="bottom">
      <template v-slot:activator>
        <button class="btn btn-circle btn-ghost" title="More Options">
          <Icon icon="mdi:dots-vertical" width="24" />
        </button>
      </template>
      <QuickMenu />
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Popper from '@/components/DockUI/Popper.vue';
import QuickMenu from '@/components/me/QuickMenu.vue';
import NotificationDrawer from '@/components/me/NotificationDrawer.vue';
import CalendarModal from '@/components/calendar/CalendarModal.vue';
import SearchModal from '@/components/search/SearchModal.vue';
import { ISpace } from '@/data/interfaces';
import { useAppStore } from '@/stores/app';

const props = defineProps({
  space: {
    type: Object as PropType<ISpace>,
    default: {},
  },
});

const appStore = useAppStore();
const collapsed = computed(() => appStore.isSideDrawerCollapsed);
</script>
