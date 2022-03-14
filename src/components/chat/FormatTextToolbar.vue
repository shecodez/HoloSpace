<template>
  <div class="bg-base-200 rounded-lg border-t-2 border-primary rounded-b-none mr-2 shadow-lg">
    <div class="flex space-x-6 justify-end">
      <div v-for="(markdownGroup, i) in markdownGroupBy3" :key="i" class="btn-group ml-4">
        <template v-for="opt in markdownGroup" :key="opt.id">
          <button
            @click="toggleMarkdownFn(opt.id)"
            :class="[btnCss, opt.isActive && 'btn-active']"
            :title="opt.shortcut ? `${opt.label}, ${opt.shortcut}` : opt.label"
          >
            <Icon :icon="opt.icon" width="20" />
          </button>
        </template>
      </div>
      <div class="btn-group">
        <button :class="btnCss" title="mention user/group, shortcut: @">
          <Icon icon="mdi:mail-ru" width="20" />
        </button>
        <EmojiPicker :btnCss="btnCss" tooltip="Add emoji, shortcut: :smile:" @addEmoji="handleEmojiClick" />
        <GifPicker :btnCss="`${btnCss} rounded-tr-lg`" tooltip="Add gif, shortcut: /giphy" @addGif="handleGifClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';

import EmojiPicker from '@/components/chat/EmojiPicker.vue';
import { EmojiClickEventDetail, IGif } from '@/data/interfaces';
import GifPicker from './GifPicker.vue';

export interface IMarkdownOption {
  id: string;
  icon: string;
  name: string;
  shortcut?: string;
  isActive?: boolean;
}

const btnCss = 'btn btn-sm btn-square btn-ghost rounded-none';

const markdownOptions = ref([
  { id: 'header', icon: 'gridicons:heading', label: 'Add header text', isActive: false },
  { id: 'bold', icon: 'mdi:format-bold', label: 'Add bold text', shortcut: '<ctrl+b>', isActive: false },
  { id: 'italic', icon: 'mdi:format-italic', label: 'Add italic text', shortcut: '<ctrl+i>', isActive: false },

  { id: 'quote', icon: 'bi:blockquote-left', label: 'Add quote text', isActive: false },
  { id: 'code', icon: 'mdi:code-tags', label: 'Insert code', shortcut: '<ctrl+e>', isActive: false },
  { id: 'link', icon: 'mdi:link-variant', label: 'Add a link', shortcut: '<ctrl+k>', isActive: false },

  { id: 'ul', icon: 'mdi:format-list-bulleted', label: 'Add bulleted list', isActive: false },
  { id: 'ol', icon: 'mdi:format-list-numbered', label: 'Add numbered list', isActive: false },
  { id: 'task', icon: 'mdi:checkbox-multiple-marked-outline', label: 'Add check list', isActive: false },

  // { id: 'attachment', icon: 'clarity:paperclip-line', name: 'attachment', isActive: false },
  // { id: 'emoji', icon: 'mdi:emoticon', name: 'add_emoji', shortcut: 'ex: :smile:', isActive: false }, //https://github.com/ikatyang/emoji-cheat-sheet
  // { id: 'gif', icon: 'mdi:gif', name: 'add_gif', shortcut: '/giphy', isActive: false },
]);

const markdownCmds = {
  header: { cmd: '### |' },
  bold: { cmd: '**|**' },
  italic: { cmd: '_|_' },

  quote: { cmd: '\n> |' },
  code: { cmd: '`|`' },
  link: { cmd: '[|](url)' },

  ul: { cmd: '- |' },
  ol: { cmd: '1. |' },
  task: { cmd: '- [] |' },
} as { [key: string]: { cmd: string } };

// return the index from the end
function getCursorIdxFromEnd(mdCmd: string) {
  return Array.from(String(mdCmd || ''))
    .reverse()
    .join('')
    .indexOf('|');
}

const markdownGroupBy3 = computed(() =>
  markdownOptions.value.reduce((r: any, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r, []),
);

function toggleMarkdownFn(id: string) {
  const md = markdownCmds[id].cmd;
  emit('addMarkdown', { md, cursorIdx: getCursorIdxFromEnd(md) });

  //const index = markdownOptions.value.findIndex((x) => x.id === id);
  //markdownOptions.value[index].isActive = !markdownOptions.value[index].isActive;
}

// function addEmoji(detail: EmojiClickEventDetail) {
//   //console.log('click-emoji', detail);
// }

const emit = defineEmits<{
  (e: 'addEmoji', emoji: EmojiClickEventDetail): void;
  (e: 'addMarkdown', cmd: { md: string; cursorIdx: number }): void;
  (e: 'addGif', gif: IGif): void;
}>();

function handleEmojiClick(emoji: EmojiClickEventDetail) {
  emit('addEmoji', emoji);
}

function handleGifClick(gif: IGif) {
  emit('addGif', gif);
}
</script>
