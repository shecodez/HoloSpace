<template>
  <div
    class="message relative"
    :class="isReply ? 'message-reply bg-base-100' : fromUser ? 'bg-base-100 border border-primary' : 'bg-secondary'"
  >
    <div class="message-header">
      <h5 v-if="!fromUser || isReply" class="message-author-name">{{ message.author?.name }}</h5>
      <span v-if="message.created_at" class="message-date" :title="`${parseISO(`${message.created_at}`)}`">
        {{ format(parseISO(`${message.created_at}`), 'Pp') }}
      </span>
      <span v-if="message.updated_at" class="italic text-xs pl-2">edited</span>
      <div v-if="!isReply && message.type !== IMessageType.REMOVED" class="message-actions">
        <Popper placement="top-end">
          <template v-slot:activator>
            <button title="Click to Reply" class="btn btn-xs btn-square btn-ghost mx-1">
              <Icon icon="ic:twotone-quickreply" width="18" />
            </button>
          </template>
          <ReactionMenu @reply="chatStore.setReplyToMessage(message)" @reaction="sendReaction" />
        </Popper>
      </div>
      <button @click="emitClose" v-if="isReply && showMessage" class="btn btn-xs btn-square btn-ghost ml-auto">
        <Icon icon="mdi:close" width="16" />
      </button>
    </div>

    <div v-if="showMessage" class="message-body py-0.5">
      <slot></slot>
      <div v-if="message.type === IMessageType.Markdown" v-html="toHTML(message.content)" />
      <p v-else-if="message.type === IMessageType.REMOVED" class="italic flex items-center gap-1">
        <Icon icon="mdi:circle-off-outline" class="text-error" /><span>This message was deleted.</span>
      </p>
      <p v-else>{{ message.content }}</p>
    </div>
    <button v-else @click="showMessage = true" class="btn btn-xs btn-ghost">...</button>

    <div v-if="!!Object.keys(reactionObject).length && showMessage" class="message-reactions">
      <ul class="tooltip-arrow-top bg-base-100 rounded flex relative text-sm p-1">
        <template v-for="(reaction, key) in reactionObject" :key="key">
          <li :title="reaction.toString()" class="cursor-pointer">
            <h5>{{ key }}</h5>
            <span class="link">{{ reaction.length }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import { format, parseISO } from 'date-fns';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useRoute } from 'vue-router';

import { IMessage, IMessageReaction, IMessageType } from '@/data/interfaces';
import ReactionMenu from '@/components/chat/MessageReactionMenu.vue';
import Popper from '@/components/DockUI/Popper.vue';
import { useChatStore } from '@/stores/chat';

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
const { message, reactions, isReply } = toRefs(props);

const chatStore = useChatStore();
const route = useRoute();

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

function sendReaction(emoji: string) {
  const newReaction = { emoji, message_id: message.value?.id, space_id: route.params.spaceId } as IMessageReaction;
  try {
    chatStore.insertMessageReaction(newReaction);
  } catch (e: any) {
    console.log(e.error_description || e.message);
  }
  chatStore.clearReplyToMessage();
}

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const showMessage = ref(true);
function emitClose() {
  if (isReply.value) {
    showMessage.value = false;
  }
  emit('close');
}
</script>

<style scoped>
.message {
  @apply p-2 rounded max-w-5xl bg-opacity-80;
}
.message.message-reply {
  @apply bg-opacity-20 min-w-full p-2 rounded border-l-4 mb-1 shadow;
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
  @apply text-xs text-slate-400;
}
.message-actions {
  @apply relative ml-auto px-1;
}

.message-reactions {
  @apply absolute z-10 mb-7 ml-4 shadow;
}

.message-reactions li {
  @apply relative flex items-start gap-1 pr-1;
}

.message-body code {
  @apply text-primary;
}
</style>
