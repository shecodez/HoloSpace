import { defineStore } from 'pinia';

import { IMessage, IMessageReaction, IUser } from '@/data/interfaces';
import useSupabase from '@/use/supabase';

const { supabase } = useSupabase();

type State = {
  loading: boolean;
  messages: IMessage[];
  messageReactions: IMessageReaction[];
  replyToMessage: IMessage | null;
  users: IUser[];
  error: null;
};

type Getters = {
  isLoading(): boolean;
  messageReactionsObject(): any;
  isReplyToMessage(): boolean;
};

type Actions = {
  setCurrentChatMessages(spaceId: string): void;
  subscribeToMessages(spaceId: string): void;
  setCurrentChatMessageReactions(messageId: string): void;
  subscribeToMessageReactions(spaceId: string): void;
  setReplyToMessage(message: IMessage): void;
  clearReplyToMessage(): void;
  insertMessage(message: IMessage): void;
  insertMessageReaction(reaction: IMessageReaction): void;
  setCurrentChatUsers(users: IUser[]): void;
};

export const useChatStore = defineStore<'chat', State, Getters, Actions>('chat', {
  state() {
    return {
      loading: false,
      messages: [],
      messageReactions: [],
      replyToMessage: null,
      users: [],
      error: null,
    };
  },

  getters: {
    isLoading() {
      return !!this.loading;
    },
    messageReactionsObject() {
      const obj = {} as { [key: string | number]: Array<IMessageReaction> };

      // copy array elements to the object
      for (let i = 0; i < this.messageReactions.length; i++) {
        const key = this.messageReactions[i].message_id;
        if (!(key in obj)) {
          obj[key] = this.messageReactions
            .filter((x) => x.message_id === key)
            .map((x) => ({ emoji: x.emoji, message_id: x.message_id, user_id: x.user_id, username: x.user?.name }));
        }
      }
      return obj;
    },
    isReplyToMessage() {
      return !!this.replyToMessage?.id;
    },
  },

  actions: {
    async setCurrentChatMessages(spaceId) {
      const { data, error } = await supabase
        .from('messages')
        .select(`*, author:author_id(*), replyMessage:reply_to_id(type, content, author:author_id(name))`)
        .eq('space_id', spaceId);
      if (error) throw error;
      if (data === null) return (this.messages = []);

      this.messages = data;
      this.subscribeToMessages(spaceId);
    },

    subscribeToMessages(spaceId) {
      supabase
        .from(`messages:space_id=eq.${spaceId}`)
        .on('*', (payload) => {
          //console.log('Change received! messages', payload);
          switch (payload.eventType) {
            case 'INSERT':
              const author = this.users.find((x) => x.id === payload.new.author_id);
              const replyMessage = this.messages.find((x) => x.id === payload.new.reply_to_id);
              this.messages.push({ ...payload.new, replyMessage, author });
              break;
            case 'UPDATE':
            case 'DELETE':
              const idx = this.messages.findIndex((x) => x.id === payload.old.id);
              if (idx >= 0) this.messages = this.messages[idx] = payload.new.id;
              break;
          }
        })
        .subscribe();
    },

    async setCurrentChatMessageReactions(spaceId) {
      const { data, error } = await supabase
        .from('message_reactions')
        .select(`*, user:user_id(name)`)
        .eq('space_id', spaceId);
      if (error) throw error;
      if (data === null) return (this.messageReactions = []);

      this.messageReactions = data;
      this.subscribeToMessageReactions(spaceId);
    },

    subscribeToMessageReactions(spaceId) {
      supabase
        .from(`message_reactions:space_id=eq.${spaceId}`)
        .on('*', (payload) => {
          //console.log('Change received! message_reactions', payload);
          switch (payload.eventType) {
            case 'INSERT':
              const user = this.users.find((x) => x.id === payload.new.user_id);
              this.messageReactions.push({ ...payload.new, user });
              break;
          }
        })
        .subscribe();
    },

    async insertMessage(message) {
      const { error } = await supabase.from('messages').insert(message);
      if (error) throw error;

      //const data: IMessage = body ? { ...body[0] } : null;
      //this.messages.push(data); handled by subscription?
    },

    async insertMessageReaction(reaction) {
      const { error } = await supabase.from('message_reactions').insert(reaction);
      if (error) throw error;
    },

    setReplyToMessage(message: IMessage) {
      this.replyToMessage = message;
    },

    clearReplyToMessage() {
      this.replyToMessage = null;
    },

    async setCurrentChatUsers(users) {
      this.users = users;
    },
  },
});
