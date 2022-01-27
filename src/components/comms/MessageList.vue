<template>
  <ul class="mx-2 md:mx-6">
    <!-- <li class="text-center p-2">Comms Start</li> -->
    <template v-for="(message, i) in messages" :key="message.id">
      <li v-if="i > 0 && !isSameDay(messages[i].created_at, messages[i - 1].created_at)" class="mx-6 md:mx-16">
        <div class="divider md:mx-2">{{ format(message.created_at, 'P') }}</div>
      </li>
      <li
        class="flex mx-4 my-3"
        :class="message.user_id === '1' ? 'justify-self-end flex-row-reverse' : 'justify-self-start'"
      >
        <div :class="message.user_id === '1' ? 'invisible' : ''">
          <div class="avatar" :class="message.author?.image_url ? '' : 'placeholder'">
            <div class="user bg-base-300 text-neutral-content rounded-full w-10 h-10 m-2">
              <span v-if="!message.author?.image_url" class="text-xl">{{ message.author?.name.charAt(0) }}</span>
            </div>
          </div>
        </div>

        <div
          class="comm p-2 rounded max-w-5xl bg-opacity-80"
          :class="message.user_id === '1' ? 'bg-base-100 border border-primary' : 'bg-secondary'"
        >
          <div class="flex items-center w-full">
            <span v-if="message.user_id !== '1'" class="font-medium mr-2">{{ message.author?.name }}</span>
            <span class="text-xs text-gray-400">{{ formatRelative(message.created_at, new Date()) }}</span>
            <span v-if="message.updated_at" class="italic text-xs pl-2">edited</span>
            <div v-if="message.user_id !== '1'" class="reply-reactions relative ml-auto px-1">
              <Popper placement="top-end">
                <template v-slot:activator>
                  <button title="Click to Reply" class="btn btn-xs btn-circle btn-ghost">
                    <Icon icon="ic:twotone-quickreply" width="20" />
                  </button>
                </template>
                <CommReactionMenu />
              </Popper>
            </div>
          </div>
          <p>{{ message.text }}</p>
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { format, formatRelative, isSameDay, isSameMinute } from 'date-fns';
import { Icon } from '@iconify/vue';

import CommReactionMenu from '@/components/comms/CommReactionMenu.vue';
import Popper from '@/components/DockUI/Popper.vue';
import { ITextMessage, IMessage } from '@/data/interfaces';

const props = defineProps({
  messages: {
    type: Array as PropType<ITextMessage[]>,
    default: [],
  },
});

function checkIsSameMinute(message: IMessage, previousMessage: IMessage) {
  if (previousMessage && previousMessage.user_id === message.user_id) {
    return isSameMinute(new Date(message.created_at), new Date(previousMessage.created_at));
  }
  return false;
}

const { messages } = toRefs(props);
</script>

<style scoped>
.comm .reply-reactions {
  visibility: hidden;
}
.comm:hover .reply-reactions {
  visibility: visible;
}
</style>
