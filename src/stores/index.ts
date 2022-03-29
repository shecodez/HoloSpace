import { useAppStore } from '@/stores/app';
import { useSpaceStore } from './space';
import { useChatStore } from './chat';
import { useDeckStore } from './deck';
import { useAuthStore } from '@/stores/auth';

const stores = {
  app: useAppStore(),
  auth: useAuthStore(),
  deck: useDeckStore(),
  space: useSpaceStore(),
  chat: useChatStore(),
};

export default function useStores() {
  return stores;
}
