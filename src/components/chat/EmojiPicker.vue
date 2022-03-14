<template>
  <div class="relative">
    <Popper placement="top-end">
      <template v-slot:activator>
        <button :class="btnCss" :title="tooltip">
          <Icon icon="mdi:emoticon" width="20" />
        </button>
      </template>

      <div ref="pickerEl" id="picker-el"></div>
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { Picker } from 'emoji-picker-element';

import Popper from '@/components/DockUI/Popper.vue';
import { EmojiClickEventDetail } from '@/data/interfaces';

const props = defineProps({
  btnCss: String,
  tooltip: String,
});

const pickerEl = ref();
onMounted(() => {
  pickerEl.value.append(new Picker());
  document.querySelector('emoji-picker')?.addEventListener('emoji-click', (event) => handleEmojiClick(event.detail));
});

onBeforeUnmount(() => {
  document.removeEventListener('emoji-click', () => handleEmojiClick);
});

const emit = defineEmits<{
  (e: 'addEmoji', detail: EmojiClickEventDetail): void;
}>();

function handleEmojiClick(detail: EmojiClickEventDetail) {
  emit('addEmoji', detail);
}
</script>
