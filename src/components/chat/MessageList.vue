<template>
  <ul class="message-list">
    <li v-if="!messages.length" class="text-center py-8">
      <h2 class="text-5xl font-bold">No messages yet. Say something.</h2>
    </li>

    <template v-for="(message, i) in messages" :key="message.id">
      <li v-html="messageDateDivider(i, message.created_at, i > 0 ? messages[i - 1].created_at : undefined)" />

      <li v-if="message.id" class="message-li" :class="message.author_id === uId ? 'from-user' : 'from-other'">
        <div class="mx-2" :class="message.author_id === uId ? 'invisible' : ''">
          <UserAvatar :user="message.author" bgCss="bg-base-300" hideIndicators />
        </div>
        <Message :message="message" :fromUser="message.author_id === uId" :reactions="reactionObject[message.id]">
          <Message v-if="message.replyMessage" :message="message.replyMessage" isReply />
        </Message>
      </li>
      <li v-else class="message-li skeleton">
        <MessageSkeleton />
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue';
import { format, isSameDay, isSameMinute, parseISO, isToday } from 'date-fns';

import { IMessage } from '@/data/interfaces';
import { useAuthStore } from '@/stores/auth';
import { useChatStore } from '@/stores/chat';
import UserAvatar from '@/components/users/UserAvatar.vue';
import Message from '@/components/chat/MessageListItem.vue';
import MessageSkeleton from '@/components/chat/MessageSkeleton.vue';

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

function messageDateDivider(index: number, current: Date, previous?: Date) {
  let text = '';

  if (index === 0) text = format(parseISO(`${current}`), 'P');
  else {
    if (!isSameDay(parseISO(`${current}`), parseISO(`${previous}`))) {
      text = isToday(parseISO(`${current}`)) ? 'Today' : format(parseISO(`${current}`), 'P');
    } else return undefined;
  }

  return `<div class="mx-2 md:ml-10 md:mr-8"><div class="divider md:mx-2">${text}</div></div>`;
}

function checkIsSameMinute(message: IMessage, previousMessage: IMessage) {
  if (previousMessage && previousMessage.author_id === message.author_id) {
    return isSameMinute(new Date(message.created_at), new Date(previousMessage.created_at));
  }
  return false;
}
</script>

<style scoped>
.message-li {
  @apply flex mx-6 md:mx-10 my-3;
}
.message-li.from-other {
  @apply justify-self-start;
}
.message-li.from-user {
  @apply justify-self-end flex-row-reverse;
}
</style>
