import { defineStore } from 'pinia';

import { IMessage, IMessageReaction } from '@/data/interfaces';
import useSupabase from '@/use/supabase';

const { supabase } = useSupabase();

type State = {
  loading: boolean;
  messages: IMessage[];
  messageReactions: IMessageReaction[];
  error: null;
};

type Getters = {
  isLoading(): boolean;
  messageReactionsObject(): any;
};

type Actions = {
  setCurrentChat(spaceId: string): void;
  subscribeToMessages(spaceId: string): void;
  fetchMessageReactions(messageId: string): void;
  insertMessage(message: IMessage): void;
};

export const useChatStore = defineStore<'chat', State, Getters, Actions>('chat', {
  state() {
    return {
      loading: false,
      messages: [],
      messageReactions: [],
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
  },

  actions: {
    async setCurrentChat(spaceId) {
      const { data, error } = await supabase
        .from('messages')
        .select(`*, author:author_id(*), replyMessage:reply_to_id(type, content, author:author_id(name))`)
        .eq('space_id', spaceId);
      if (error) throw error;
      if (data === null) return (this.messages = []);
      this.fetchMessageReactions(spaceId);
      this.subscribeToMessages(spaceId);

      this.messages = data;
    },
    subscribeToMessages(spaceId) {
      supabase
        .from(`messages:space_id=eq.${spaceId}`)
        .on('*', (payload) => {
          // console.log('Change received!', payload);
          switch (payload.eventType) {
            case 'INSERT':
              this.messages.push(payload.new);
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
    async fetchMessageReactions(spaceId) {
      const { data, error } = await supabase
        .from('message_reactions')
        .select(`*, user:user_id(name), messages!inner(space_id)`)
        .eq('messages.space_id', spaceId);
      if (error) throw error;
      if (data === null) return (this.messageReactions = []);

      this.messageReactions = data;
    },
    async insertMessage(message) {
      const { body, error } = await supabase.from('messages').insert(message);
      if (error) throw error;

      const data: IMessage = body ? { ...body[0] } : null;
      this.messages.push(data);
    },
  },
});
