<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" fullscreen>
    <div class="flex w-full h-full">
      <div class="w-20 md:w-1/3 bg-base-100 bg-opacity-80">
        <Panel css="ml-auto md:w-2/5 md:pt-20">
          <template #header>
            <div class="my-divider border-b navbar p-0 mx-2">
              <div class="flex-none">
                <Icon icon="mdi:cog" width="28" />
              </div>
              <div class="flex-1 mx-2 hide-on-collapsed">
                <span class="text-lg font-bold uppercase">Settings</span>
              </div>
            </div>
          </template>

          <div class="overflow-y-auto overflow-x-hidden">Settings for {{ user.name }}</div>

          <template #footer>
            <div class="my-divider border-t navbar p-0 mx-2">
              <div class="flex-none">
                <Icon icon="mdi:information" width="18" />
                <span class="text-sm text-gray-500 ml-2">v1.0.0</span>
              </div>

              <div class="ml-auto">
                <ToogleDarkMode />
                <LogoutButton />
              </div>
            </div>
          </template>
        </Panel>
      </div>

      <div class="flex-1 md:w-2/3 bg-base-200 bg-opacity-80">
        <ThemeSwitcher />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';
import Panel from '@/components/DockUI/Panel.vue';
import ToogleDarkMode from '@/components/ToogleDarkMode.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { IUser } from '@/data/interfaces';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object as PropType<IUser>,
    default: {},
  },
});

const { isOpen, user } = toRefs(props);
</script>
