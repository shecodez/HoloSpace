<template>
  <div class="bg-base-200 rounded border-t-2 border-primary rounded-b-none mr-2 shadow-lg">
    <div class="flex space-x-6 justify-end">
      <div v-for="(markdownGroup, i) in markdownGroupBy3" :key="i" class="btn-group ml-4">
        <template v-for="opt in markdownGroup" :key="opt.id">
          <button
            @click="toggleMarkdownFn(opt.id)"
            class="btn btn-sm btn-square btn-ghost rounded-none"
            :class="opt.isActive && 'btn-active'"
          >
            <Icon :icon="opt.icon" width="20" />
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';

export interface IMarkdownOption {
  id: string;
  icon: string;
  name: string;
  shortcut?: string;
  isActive?: boolean;
}

const markdownOptions = ref([
  { id: 'header', icon: 'gridicons:heading', name: 'add_header_text', isActive: false },
  { id: 'bold', icon: 'mdi:format-bold', name: 'add_bold_text', shortcut: '<ctrl+b>', isActive: false },
  { id: 'italic', icon: 'mdi:format-italic', name: 'add_italic_text', shortcut: '<ctrl+i>', isActive: false },

  { id: 'quote', icon: 'bi:blockquote-left', name: 'add_quote_text', isActive: false },
  { id: 'code', icon: 'mdi:code-tags', name: 'insert_code', shortcut: '<ctrl+e>', isActive: false },
  { id: 'link', icon: 'mdi:link-variant', name: 'add_a_link', shortcut: '<ctrl+k>', isActive: false },

  { id: 'ul', icon: 'mdi:format-list-bulleted', name: 'add_bulleted_list', isActive: false },
  { id: 'ol', icon: 'mdi:format-list-numbered', name: 'add_numbered_list', isActive: false },
  { id: 'task', icon: 'mdi:checkbox-multiple-marked-outline', name: 'add_check_list', isActive: false },

  { id: 'attachment', icon: 'clarity:paperclip-line', name: 'attachment', isActive: false },
  { id: 'emoji', icon: 'mdi:emoticon', name: 'add_emoji', shortcut: 'ex: :smile:', isActive: false }, //https://github.com/ikatyang/emoji-cheat-sheet
  { id: 'gif', icon: 'mdi:gif', name: 'add_gif', shortcut: '/giphy', isActive: false },
]);

const markdownGroupBy3 = computed(() =>
  markdownOptions.value.reduce((r: any, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r, []),
);

function toggleMarkdownFn(id: string) {
  //emit('toggleMarkdownFn', id)
  const index = markdownOptions.value.findIndex((x) => x.id === id);
  markdownOptions.value[index].isActive = !markdownOptions.value[index].isActive;
}

//const state = reactive({});
</script>
