import { defineStore } from 'pinia';

import { IDeck, IUser } from '@/data/interfaces';
import useSupabase from '@/use/supabase';

const { supabase } = useSupabase();

type State = {
  loading: boolean;
  decks: IDeck[];
  currentDeck: IDeck | undefined;
  crew: IUser[];
  error: null;
};

type Getters = {
  isLoading(): boolean;
};

type Actions = {
  setUserDecks(userId: string): void;
  setCurrentDeck(deckId: string): void;
  setCrew(deckId: string): void;
  createDeck(deck: IDeck): void;
};

export const useDeckStore = defineStore<'deck', State, Getters, Actions>('deck', {
  state() {
    return {
      loading: false,
      decks: [],
      currentDeck: undefined,
      crew: [],
      error: null,
    };
  },

  getters: {
    isLoading() {
      return !!this.loading;
    },
  },

  actions: {
    async setUserDecks(userId) {
      //const { data, error } = await supabase.from('decks').select('*').eq('captain_id', userId);
      // TODO: order by crew_members.last_seen_at DESC
      const { data, error } = await supabase
        .from('decks')
        .select('*, crew_members!inner(*)')
        .eq('crew_members.user_id', userId);
      if (error) throw error;
      if (data === null) return (this.decks = []);

      this.decks = data;
    },
    async setCurrentDeck(deckId) {
      const { data, error } = await supabase.from('decks').select('*').eq('id', deckId).single();
      if (error) throw error;

      this.currentDeck = data;
    },
    // TODO: transform crew to Array of labled users i.e. [{label: 'on-deck', [...users] }, { label: 'offline', [...users]}]
    async setCrew(deckId) {
      const { data, error } = await supabase
        .from('users')
        .select('*, crew_members!inner(*)')
        .eq('crew_members.deck_id', deckId);
      if (error) throw error;
      if (data === null) return (this.crew = []);

      this.crew = data;
    },
    async createDeck(deck) {
      const { body, error } = await supabase.from('decks').insert(deck);
      if (error) throw error;

      const data: IDeck = body ? { ...body[0] } : null;
      this.decks.push(data);
    },
  },
});
