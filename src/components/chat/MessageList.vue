<template>
  <ul class="mx-2 md:mx-6">
    <li v-if="!messages.length" class="text-center py-8">
      <h2 class="text-5xl font-bold">No messages yet. Say something.</h2>
    </li>

    <template v-for="(message, i) in messages" :key="message.id">
      <li
        v-if="i > 0 && !isSameDay(parseISO(`${messages[i].created_at}`), parseISO(`${messages[i - 1].created_at}`))"
        class="mx-6 md:mx-16"
      >
        <div class="divider md:mx-2">{{ format(parseISO(`${message.created_at}`), 'P') }}</div>
      </li>

      <li
        v-if="message.id"
        class="flex mx-4 my-3"
        :class="message.author_id === uId ? 'justify-self-end flex-row-reverse' : 'justify-self-start'"
      >
        <div class="mx-2" :class="message.author_id === uId ? 'invisible' : ''">
          <UserAvatar :user="message.author" bgCss="bg-base-300" hideIndicators />
        </div>

        <!-- <div
          class="messsage p-2 rounded max-w-5xl bg-opacity-80"
          :class="message.author_id === uId ? 'bg-base-100 border border-primary' : 'bg-secondary'"
        >
          <div class="message-header flex items-center w-full">
            <h5 v-if="message.author_id !== uId" class="font-bold mr-2">{{ message.author?.name }}</h5>
            <span class="text-xs text-gray-400">
              {{ formatRelative(parseISO(`${message.created_at}`), new Date()) }}
            </span>
            <span v-if="message.updated_at" class="italic text-xs pl-2">edited</span>
            <div v-if="message.author_id !== uId" class="reply-reactions relative ml-auto px-1">
              <Popper placement="top-end">
                <template v-slot:activator>
                  <button title="Click to Reply" class="btn btn-xs btn-circle btn-ghost">
                    <Icon icon="ic:twotone-quickreply" width="20" />
                  </button>
                </template>
                <ReactionMenu />
              </Popper>
            </div>
          </div>

          <div class="message--body">
            <div
              v-if="message.replyMessage"
              class="reply-message bg-base-200 bg-opacity-20 p-2 rounded border-l-4 mb-1"
              :class="message.author_id === uId ? 'border-primary' : 'border-accent'"
            >
              <h5 class="font-bold">{{ message.replyMessage.author?.name }}</h5>
              <div
                v-if="message.replyMessage.type === IMessageType.Markdown"
                v-html="toHTML(message.replyMessage.content)"
              />
              <p v-else>{{ message.replyMessage.content }}</p>
            </div>

            <div v-if="message.type === IMessageType.Markdown" v-html="toHTML(message.content)" />
            <p v-else>{{ message.content }}</p>
          </div>
        </div> -->
        <Message :message="message" :fromUser="message.author_id === uId" :reactions="reactionObject[message.id]">
          <Message v-if="message.replyMessage" :message="message.replyMessage" isReply />
        </Message>
      </li>
      <li v-else>
        <Skeleton />
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue';
import { format, isSameDay, isSameMinute, parseISO } from 'date-fns';

import { IMessage } from '@/data/interfaces';
import { useAuthStore } from '@/stores/auth';
import { useChatStore } from '@/stores/chat';
import UserAvatar from '@/components/users/UserAvatar.vue';
import Message from '@/components/chat/Message.vue';
import Skeleton from '@/components/DockUI/Skeleton.vue';

const props = defineProps({
  messages: {
    type: Array as PropType<IMessage[]>,
    default: [],
  },
});

const authStore = useAuthStore();
const chatStore = useChatStore();

const uId = computed(() => authStore.userId);

const reactionObject = computed(() => chatStore.messageReactionsObject);

function checkIsSameMinute(message: IMessage, previousMessage: IMessage) {
  if (previousMessage && previousMessage.author_id === message.author_id) {
    return isSameMinute(new Date(message.created_at), new Date(previousMessage.created_at));
  }
  return false;
}
</script>
