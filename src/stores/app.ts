import { defineStore } from 'pinia';

import { BannerType, ToastType } from '@/data/interfaces';

type State = {
  theme: string;
  bannerIcon?: string;
  bannerTitle?: string;
  bannerText: string;
  bannerType: BannerType | undefined;
  bannerDismissible?: boolean;
  //bannerFunc?: Function;
  sideDrawerCollapsed: boolean;
  metaDrawerCollapsed: boolean;
  toastTitle?: string;
  toastText: string;
  toastType: ToastType | undefined;
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
  //getLatestSiteNotification(): void;
  setBanner(banner: { icon?: string; title?: string; text: string }, type: BannerType, isDismissible: boolean): void;
  clearBanner(): void;
  toggleSideDrawerCollapsed(): void;
  setSideDrawerCollapsed(collapsed: boolean): void;
  toggleMetaDrawerCollapsed(): void;
  setMetaDrawerCollapsed(collapsed: boolean): void;
  setToast(toast: { title: string; text: string }, type: ToastType): void;
  clearToast(): void;
};

export const useAppStore = defineStore<'app', State, Getters, Actions>('app', {
  state() {
    return {
      theme: 'dark',
      bannerIcon: undefined,
      bannerTitle: undefined,
      bannerType: undefined,
      bannerText: '',
      bannerDismissible: false,
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
    setBanner(banner: { text: string; icon?: string; title?: string }, type: BannerType, isDismissible: boolean) {
      this.bannerIcon = banner.icon;
      this.bannerTitle = banner.title;
      this.bannerText = banner.text;
      this.bannerType = type;
      this.bannerDismissible = isDismissible;
    },
    clearBanner() {
      this.bannerIcon = undefined;
      this.bannerTitle = undefined;
      this.bannerText = '';
      this.bannerType = undefined;
      this.bannerDismissible = false;
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
    setToast(toast: { title: string; text: string }, type: ToastType) {
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
