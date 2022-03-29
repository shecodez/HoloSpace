<template>
  <div
    class="message relative"
    :class="isReply ? 'message-reply bg-base-100' : fromUser ? 'bg-base-100 border border-primary' : 'bg-secondary'"
  >
    <ul v-if="!!Object.keys(reactionObject).length" class="message-reactions bg-base-100">
      <li v-for="(reaction, key) in reactionObject" :key="key">
        <h5>{{ key }}</h5>
        <span :title="reaction.toString()" class="link">{{ reaction.length }}</span>
      </li>
    </ul>

    <div class="message-header">
      <h5 v-if="!fromUser || isReply" class="message-author-name">{{ message.author?.name }}</h5>
      <span v-if="message.created_at" class="message-date" :title="`${parseISO(`${message.created_at}`)}`">
        {{ format(parseISO(`${message.created_at}`), 'Pp') }}
      </span>
      <span v-if="message.updated_at" class="italic text-xs pl-2">edited</span>
      <div v-if="!isReply" class="message-actions">
        <Popper placement="top-end">
          <template v-slot:activator>
            <button title="Click to Reply" class="btn btn-xs btn-square btn-ghost mx-1">
              <Icon icon="ic:twotone-quickreply" width="18" />
            </button>
          </template>
          <ReactionMenu />
        </Popper>
      </div>
      <button v-else class="btn btn-xs btn-square btn-ghost ml-auto">
        <Icon icon="mdi:close" width="16" />
      </button>
    </div>

    <div class="message-body">
      <slot></slot>
      <div v-if="message.type === IMessageType.Markdown" v-html="toHTML(message.content)" />
      <p v-else>{{ message.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import { format, parseISO } from 'date-fns';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import { IMessage, IMessageReaction, IMessageType } from '@/data/interfaces';
import ReactionMenu from '@/components/chat/MessageReactionMenu.vue';
import Popper from '@/components/DockUI/Popper.vue';

const props = defineProps({
  message: {
    type: Object as PropType<IMessage>,
    default: {},
  },
  reactions: {
    type: Array as PropType<IMessageReaction[]>,
    default: [],
  },
  isReply: {
    type: Boolean,
    default: false,
  },
  fromUser: {
    type: Boolean,
    default: false,
  },
});
const { reactions } = toRefs(props);

function toHTML(markdown: string) {
  return DOMPurify.sanitize(marked.parse(markdown));
}

const reactionObject = computed(() => {
  const obj = {} as { [key: string]: any };

  // copy array elements to the object
  for (let i = 0; i < reactions.value.length; i++) {
    const key = reactions.value[i].emoji;
    if (!(key in obj)) {
      obj[key] = reactions.value.filter((x) => x.emoji === key).map((x) => x.username);
    }
  }
  return obj;
});
</script>

<style scoped>
.message {
  @apply p-2 rounded max-w-5xl bg-opacity-80;
}
.message-reply {
  @apply bg-opacity-20 p-2 rounded border-l-4 mb-1;
}

.message .message-actions {
  visibility: hidden;
}
.message:hover .message-actions {
  visibility: visible;
}

.message-header {
  @apply flex items-center w-full;
}
.message-author-name {
  @apply font-bold mr-2;
}
.message-date {
  @apply text-xs text-gray-400;
}
.message-actions {
  @apply relative ml-auto px-1;
}

.message-reactions {
  @apply inline-flex absolute rounded text-sm p-1 -mt-7 border-b-2;
}
.message-reactions > li {
  @apply flex items-start gap-1 px-1;
}
</style>
