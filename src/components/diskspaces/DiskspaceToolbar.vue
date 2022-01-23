<template>
  <div class="navbar bg-base-100">
    <div class="flex-none">
      <button
        @click="$emit('toggleCollapsed')"
        class="btn btn-square btn-ghost"
        :class="!collapsed && 'transform rotate-180'"
      >
        <Icon icon="mdi:forwardburger" width="24" />
      </button>
    </div>
    <div class="flex-1 px-2 mx-2 flex items-center w-full overflow-hidden divide-x divide-opacity-10">
      <h1 class="text-lg font-brand pr-2 inline-block truncate">{{ diskspace.name }}</h1>
      <span class="font-thin pl-2 truncate">{{ diskspace.topic }}</span>
    </div>

    <div class="hidden mx-2 md:flex">
      <SearchModal />
      <CalendarModal />
      <NotificationDrawer />
    </div>

    <Popper placement="bottom">
      <template v-slot:activator>
        <button class="btn btn-square btn-ghost">
          <Icon icon="mdi:dots-vertical" width="24" />
        </button>
      </template>
      <QuickMenu />
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Popper from '@/components/DockUI/Popper.vue';
import QuickMenu from '@/components/me/QuickMenu.vue';
import NotificationDrawer from '@/components/me/NotificationDrawer.vue';
import CalendarModal from '@/components/calendar/CalendarModal.vue';
import SearchModal from '@/components/search/SearchModal.vue';
import { IDiskspace } from '@/data/interfaces';

const props = defineProps({
  diskspace: {
    type: Object as PropType<IDiskspace>,
    default: {},
  },
  collapsed: Boolean,
});

const { diskspace, collapsed } = toRefs(props);
</script>
