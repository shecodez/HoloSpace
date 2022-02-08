<template>
  <Panel css="w-0 bg-base-100 bg-opacity-80">
    <template #header>
      <div class="navbar bg-base-100">
        <div class="flex-none">
          <button
            @click="emitToggleCollapsed"
            :title="collapsed ? 'Open' : 'Collapse'"
            class="btn btn-square btn-ghost"
            :class="!collapsed && 'transform rotate-180'"
          >
            <Icon icon="mdi:forwardburger" width="24" />
          </button>
        </div>

        <div class="flex-1 px-2 mx-2 flex items-center w-full overflow-hidden">
          <h1 class="text-lg pr-2 inline-block truncate" :title="me">@{{ me }}</h1>
        </div>

        <div class="hidden mx-2 md:flex">
          <SearchModal />
          <CalendarModal />
          <NotificationDrawer />
        </div>

        <Popper placement="bottom">
          <template v-slot:activator>
            <button class="btn btn-square btn-ghost" title="More Options">
              <Icon icon="mdi:dots-vertical" width="24" />
            </button>
          </template>
          <QuickMenu />
        </Popper>
      </div>
    </template>

    <div ref="canvasarea" class="relative block w-full h-full bg-black">
      <!-- Height: {{ height }} Width: {{ width }} -->
      <UserModel :width="width" :height="height" />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import { useElementSize } from '@vueuse/core';

import Panel from '@/components/DockUI/Panel.vue';
import Popper from '@/components/DockUI/Popper.vue';
import QuickMenu from '@/components/me/QuickMenu.vue';
import NotificationDrawer from '@/components/me/NotificationDrawer.vue';
import CalendarModal from '@/components/calendar/CalendarModal.vue';
import SearchModal from '@/components/search/SearchModal.vue';
import UserModel from '@/components/users/UserModel.vue';

const props = defineProps({
  collapsed: Boolean,
  me: String,
});

const { collapsed, me } = toRefs(props);

const emit = defineEmits<{
  (e: 'toggleCollapsed'): void;
}>();

function emitToggleCollapsed() {
  emit('toggleCollapsed');
}

const canvasarea = ref(null);
const { width, height } = useElementSize(canvasarea);
</script>
