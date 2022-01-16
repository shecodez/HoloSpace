<template>
  <Panel css="w-0 bg-gray-400 bg-opacity-80 dark:bg-gray-600 dark:bg-opacity-80 text-gray-800 dark:text-gray-200">
    <template #header>
      <div class="navbar bg-gray-400 dark:bg-gray-600">
        <div class="flex-none">
          <button
            @click="$emit('toggleCollapsed')"
            class="btn btn-square btn-ghost"
            :class="!collapsed && 'transform rotate-180'"
          >
            <Icon icon="mdi:forwardburger" width="24" />
          </button>
        </div>
        <div class="my-x-divider flex-1 px-2 mx-2 flex items-center w-full overflow-hidden">
          <h1 class="text-lg font-brand pr-2 inline-block truncate">{{ diskspace.name }}</h1>
          <span class="font-thin pl-2 truncate">{{ diskspace.topic }}</span>
        </div>

        <div class="hidden md:block btn-group">
          <button class="btn btn-square btn-sm btn-ghost">
            <Icon icon="mdi:magnify" width="24" />
          </button>
          <button class="btn btn-square btn-sm btn-ghost">
            <Icon icon="mdi:calendar-month" width="24" />
          </button>
          <button class="btn btn-square btn-sm btn-ghost">
            <Icon icon="mdi:bell" width="24" />
          </button>
        </div>
        <button class="btn btn-square btn-ghost">
          <Icon icon="mdi:dots-vertical" width="24" />
        </button>
      </div>
    </template>

    <div class="overflow-y-auto overflow-x-hidden">
      <MessageList :messages="messages" />
    </div>

    <template #footer>
      <MessageForm />
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Panel from '@/components/Panel.vue';
import MessageList from '@/components/MessageList.vue';
import MessageForm from '@/components/MessageForm.vue';
import { IDiskspace, ITextMessage } from '@/data/interfaces';

const props = defineProps({
  diskspace: {
    type: Object as PropType<IDiskspace>,
    default: {},
  },
  collapsed: Boolean,
  messages: {
    type: Array as PropType<ITextMessage[]>,
    default: [],
  },
});

const { diskspace, messages, collapsed } = toRefs(props);
</script>

<style scoped>
.my-x-divider {
  @apply divide-x divide-black divide-opacity-10 dark:divide-white dark:divide-opacity-10;
}
</style>
