import { defineStore } from 'pinia';

type AlertType = 'info' | 'danger' | 'success' | 'warning';

type State = {
  theme: string;
  bannerText: string;
  bannerType: AlertType | undefined;
  //bannerFunc?: Function;
  sideDrawerCollapsed: boolean;
  metaDrawerCollapsed: boolean;
  toastTitle: string;
  toastText: string;
  toastType: AlertType | undefined;
  //toastFunc?: Function;
};

type Getters = {
  getTheme(): string;
  isBanner(): boolean;
  isMetaDrawerCollapsed(): boolean;
  isSideDrawerCollapsed(): boolean;
  isToast(): boolean;
};

type Actions = {
  setTheme(theme: string): void;
  setBanner(type: AlertType, text: string): void;
  clearBanner(): void;
  toggleSideDrawerCollapsed(): void;
  setSideDrawerCollapsed(collapsed: boolean): void;
  toggleMetaDrawerCollapsed(): void;
  setMetaDrawerCollapsed(collapsed: boolean): void;
  setToast(toast: { title: string; text: string }, type: AlertType): void;
  clearToast(): void;
};

export const useAppStore = defineStore<'app', State, Getters, Actions>('app', {
  state() {
    return {
      theme: 'dark',
      bannerType: undefined,
      bannerText: '',
      //bannerFunc: () => {},
      sideDrawerCollapsed: false,
      metaDrawerCollapsed: false,
      toastType: undefined,
      toastTitle: '',
      toastText: '',
      //toastFunc: () => {},
    };
  },

  getters: {
    getTheme() {
      return this.theme;
    },
    isBanner() {
      return !!this.bannerText;
    },
    isMetaDrawerCollapsed() {
      return !!this.metaDrawerCollapsed;
    },
    isSideDrawerCollapsed() {
      return !!this.sideDrawerCollapsed;
    },
    isToast() {
      return !!this.toastText;
    },
  },

  actions: {
    setTheme(theme: string) {
      this.theme = theme;
      // TODO: set theme in localstorage
    },
    setBanner(text: string, type: AlertType) {
      this.bannerText = text;
      this.bannerType = type;
    },
    clearBanner() {
      this.bannerText = '';
      this.bannerType = undefined;
    },
    toggleSideDrawerCollapsed() {
      this.sideDrawerCollapsed = !this.sideDrawerCollapsed;
    },
    setSideDrawerCollapsed(collapsed: boolean) {
      this.sideDrawerCollapsed = collapsed;
    },
    toggleMetaDrawerCollapsed() {
      this.metaDrawerCollapsed = !this.metaDrawerCollapsed;
    },
    setMetaDrawerCollapsed(collapsed: boolean) {
      this.metaDrawerCollapsed = collapsed;
    },
    setToast(toast: { title: string; text: string }, type: AlertType) {
      this.toastTitle = toast.title;
      this.toastText = toast.text;
      this.toastType = type;
    },
    clearToast() {
      this.toastTitle = '';
      this.toastText = '';
      this.toastType = undefined;
    },
  },
});
