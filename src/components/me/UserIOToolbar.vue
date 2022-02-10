<template>
  <div :class="!collapsed && 't-border-menu'">
    <div class="btn-group">
      <template v-for="btn in buttons" :key="btn.id">
        <button @click="btn.toggle" class="btn btn-ghost relative">
          <Icon :icon="btn.icon" width="24" />
          <Icon v-if="!btn.isOn" icon="mdi:circle-off-outline" width="24" class="absolute text-error" />
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import { IUser } from '@/data/interfaces';

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    default: {},
  },
  collapsed: Boolean,
});

const toggleCam = () => {
  buttons.value[0].isOn = !buttons.value[0].isOn;
};

const toggleMic = () => {
  buttons.value[1].isOn = !buttons.value[1].isOn;
};

const toggleVr = () => {
  buttons.value[2].isOn = !buttons.value[2].isOn;
};

const buttons = ref([
  { id: '1', icon: 'mdi:video', isOn: false, toggle: toggleCam },
  { id: '2', icon: 'mdi:microphone', isOn: true, toggle: toggleMic },
  { id: '3', icon: 'mdi:hololens', isOn: false, toggle: toggleVr },
]);

const { user, collapsed } = toRefs(props);
</script>
