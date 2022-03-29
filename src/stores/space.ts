import { defineStore } from 'pinia';

import { ISpace, IUser } from '@/data/interfaces';
import useSupabase from '@/use/supabase';

const { supabase } = useSupabase();

type State = {
  loading: boolean;
  spaces: ISpace[];
  teamSpaces: ISpace[];
  currentSpace: ISpace | undefined;
  team: IUser[];
  error: null;
};

type Getters = {
  isLoading(): boolean;
};

type Actions = {
  setDeckSpaces(userId: string): void;
  setTeamSpaces(userId: string): void;
  setCurrentSpace(spaceId: string): void;
  setTeam(spaceId: string): void;
  createSpace(space: ISpace): void;
};

export const useSpaceStore = defineStore<'space', State, Getters, Actions>('space', {
  state() {
    return {
      loading: false,
      spaces: [],
      teamSpaces: [],
      currentSpace: undefined,
      team: [],
      error: null,
    };
  },

  getters: {
    isLoading() {
      return !!this.loading;
    },
  },

  actions: {
    async setDeckSpaces(deckId) {
      const { data, error } = await supabase.from('spaces').select('*').eq('deck_id', deckId);
      if (error) throw error;
      if (data === null) return (this.spaces = []);

      this.spaces = data;
    },
    async setTeamSpaces(userId) {
      const { data, error } = await supabase
        .from('spaces')
        .select('*, team_members!inner(*)')
        .eq('is_private', true)
        .eq('team_members.user_id', userId);
      if (error) throw error;
      if (data === null) return (this.teamSpaces = []);

      this.teamSpaces = data;
    },
    async setCurrentSpace(spaceId) {
      const { data, error } = await supabase.from('spaces').select('*').eq('id', spaceId).single();
      if (error) throw error;

      this.currentSpace = data;
    },
    async setTeam(spaceId) {
      const { data, error } = await supabase
        .from('users')
        .select('*, team_members!inner(*)')
        .eq('team_members.space_id', spaceId);
      if (error) throw error;
      if (data === null) return (this.team = []);

      this.team = data;
    },
    async createSpace(space) {
      const { body, error } = await supabase.from('spaces').insert(space);
      if (error) throw error;

      const data: ISpace = body ? { ...body[0] } : null;
      this.spaces.push(data);
    },
  },
});
