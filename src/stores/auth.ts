import { defineStore } from 'pinia';
import { RouteLocation } from 'vue-router';
import { User } from '@supabase/supabase-js';

import { IUser, IProfile } from '@/data/interfaces';
import useSupabase from '@/use/supabase';

const { supabase } = useSupabase();

type State = {
  userSession: User | null;
  userData: IUser | undefined;
  profileData: IProfile | undefined;

  redirectRoute: Partial<RouteLocation> | null;
};

type Getters = {
  isAuthenticated(): boolean;
};

type Actions = {
  loadUser(): void;
  fetchUserData(userId: string): void;
  fetchUserProfile(userId: string): void;
  clearUser(): void;
  saveRedirectRoute(route: Partial<RouteLocation>): void;
  loadRedirectRoute(): void;
  clearRedirectRoute(): void;
};

export const useAuthStore = defineStore<'auth', State, Getters, Actions>('auth', {
  state() {
    return {
      userSession: null,
      userData: undefined,
      profileData: undefined,
      redirectRoute: null,
    };
  },

  getters: {
    isAuthenticated() {
      return !!this.userSession;
    },
  },

  actions: {
    loadUser() {
      this.userSession = supabase.auth.user();
    },
    async fetchUserData(userId: string) {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
      if (error) throw error;

      this.userData = data;
    },
    async fetchUserProfile(userId: string) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;

      this.profileData = data;
    },

    clearUser() {
      this.userSession = null;
      this.userData = undefined;
      this.profileData = undefined;
    },

    saveRedirectRoute(route: Partial<RouteLocation>) {
      const { name, params, query, hash } = route;

      localStorage.setItem('redirectRoute', JSON.stringify({ name, params, query, hash }));
    },
    loadRedirectRoute() {
      const route = JSON.parse(localStorage.getItem('redirectRoute') || 'null') as Partial<RouteLocation> | null;

      this.redirectRoute = route;
    },
    clearRedirectRoute() {
      localStorage.removeItem('redirectRoute');
      this.redirectRoute = null;
    },
  },
});
