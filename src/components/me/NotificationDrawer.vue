<template>
  <div class="relative inline-flex">
    <button @click="openDrawer" :class="btnCss" title="Notifications">
      <Icon icon="mdi:bell" width="24" />
    </button>
    <span class="flex absolute h-2 w-2 top-0 right-0">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
    </span>
  </div>

  <DrawerModal :isOpen="openNotifications" @close="closeDrawer" css="justify-end">
    <div class="w-64 h-screen bg-base-100 p-2">
      <Panel css="w-full">
        <template #header>
          <div class="my-divider border-b navbar">
            <div class="flex-none">
              <Icon icon="mdi:bell" width="28" />
            </div>
            <div class="flex-1 mx-2 hide-on-collapsed">
              <span class="text-lg font-bold uppercase">Notifications</span>
            </div>

            <button @click="closeDrawer" class="btn btn-sm btn-ghost btn-square">
              <Icon icon="mdi:close" width="24" />
            </button>
          </div>
        </template>

        <div class="overflow-y-auto overflow-x-hidden">
          <div class="font-bold p-4">No new notifications.</div>
        </div>

        <template #footer>
          <div class="my-divider border-t navbar">
            <button class="btn btn-sm btn-accent w-full flex items-center gap-2">
              <Icon icon="ri:refresh-line" width="24" />
              Refresh
            </button>
          </div>
        </template>
      </Panel>
    </div>
  </DrawerModal>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import DrawerModal from '@/components/DockUI/DrawerModal.vue';
import Panel from '@/components/DockUI/Panel.vue';

// TODO: daily login reward notification like GW2
const props = defineProps({
  btnCss: {
    type: String,
    default: 'btn btn-square btn-sm btn-ghost inline-flex',
  },
  collapsed: Boolean,
});

const { btnCss } = toRefs(props);

const openNotifications = ref(false);

function openDrawer() {
  openNotifications.value = true;
}

function closeDrawer() {
  openNotifications.value = false;
}
</script>
