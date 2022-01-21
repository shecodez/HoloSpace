<template>
  <div class="bg-base-200 rounded border-t-2 border-primary rounded-b-none mr-2 shadow-lg">
    <div class="flex space-x-6 justify-end">
      <ul v-for="(markdownGroup, i) in markdownOptions" :key="i" class="grid grid-flow-col grid-cols-3 gap-2">
        <li v-for="option in markdownGroup" :key="option.id">
          <button class="btn btn-sm btn-square btn-ghost rounded-none">
            <Icon :icon="option.icon" width="20" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const markdownOptions = ref({
  HBI: [
    { id: 'header', icon: 'gridicons:heading', name: 'add_header_text' },
    { id: 'bold', icon: 'mdi:format-bold', name: 'add_bold_text', shortcut: '<ctrl+b>' },
    { id: 'italic', icon: 'mdi:format-italic', name: 'add_italic_text', shortcut: '<ctrl+i>' },
  ],

  QCL: [
    { id: 'quote', icon: 'bi:blockquote-left', name: 'add_quote_text' },
    { id: 'code', icon: 'mdi:code-tags', name: 'insert_code', shortcut: '<ctrl+e>' },
    { id: 'link', icon: 'mdi:link-variant', name: 'add_a_link', shortcut: '<ctrl+k>' },
  ],

  UOT: [
    { id: 'ul', icon: 'mdi:format-list-bulleted', name: 'add_bulleted_list' },
    { id: 'ol', icon: 'mdi:format-list-numbered', name: 'add_numbered_list' },
    { id: 'task', icon: 'mdi:checkbox-multiple-marked-outline', name: 'add_check_list' },
  ],

  AEG: [
    { id: 'attachment', icon: 'clarity:paperclip-line', name: 'attachment' },
    { id: 'emoji', icon: 'mdi:emoticon', name: 'add_emoji', shortcut: 'ex: :smile:' }, //https://github.com/ikatyang/emoji-cheat-sheet
    { id: 'gif', icon: 'mdi:gif', name: 'add_gif', shortcut: '/giphy' },
  ],
});
//const state = reactive({});
</script>
