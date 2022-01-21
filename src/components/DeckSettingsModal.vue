<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" fullscreen>
    <div class="flex w-full h-full">
      <div class="w-20 md:w-1/3 bg-base-100 bg-opacity-80">
        <Panel css="ml-auto md:w-2/5 md:pt-20">
          <template #header>
            <div class="my-divider border-b navbar p-0 mx-2">
              <div class="flex-none">
                <Icon icon="mdi:layers-outline" width="28" />
              </div>
              <div class="flex-1 mx-2 hide-on-collapsed">
                <span class="text-lg font-bold uppercase">{{ deck.name }}</span>
              </div>
            </div>
          </template>

          <div class="overflow-y-auto overflow-x-hidden">DeckSettingsList</div>

          <template #footer>
            <div class="my-divider border-t border-error navbar p-0 mx-2 text-error">
              <div class="flex-none">
                <Icon icon="la:skull-crossbones" width="24" />
              </div>
              <div class="flex-1 mx-2 hide-on-collapsed">
                <span class="font-bold uppercase">Danger Zone</span>
              </div>
            </div>
          </template>
        </Panel>
      </div>

      <div class="flex-1 md:w-2/3 bg-base-200 bg-opacity-80"></div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';
import Panel from '@/components/Panel.vue';
import { IDeck } from '@/data/interfaces';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  deck: {
    type: Object as PropType<IDeck>,
    default: {},
  },
});

const { isOpen, deck } = toRefs(props);
</script>
