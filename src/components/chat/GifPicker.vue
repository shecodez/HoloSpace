<template>
  <div class="relative">
    <Popper placement="top-end">
      <template v-slot:activator>
        <button :class="btnCss" :title="tooltip">
          <Icon icon="mdi:gif" width="20" />
        </button>
      </template>

      <div class="t-border-menu menu bg-base-100 shadow-lg w-72 h-auto py-2 px-4">
        <div class="mt-2 mb-4">
          <div class="form-control w-full">
            <div class="relative">
              <input
                v-focus
                type="text"
                v-model="q"
                @keydown.enter="searchGiphy"
                placeholder="Search..."
                class="input pr-8 input-bordered input-primary input-sm w-full"
              />
              <button
                @click="searchGiphy"
                type="button"
                class="absolute top-0 right-0 rounded-l-none btn btn-sm btn-primary"
              >
                <Icon icon="mdi:search" />
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <template v-for="gif in state.gifs" :key="gif.id">
            <div @click="handleGifClick(gif)" class="bg-base-300 relative aspect-square overflow-hidden">
              <!-- v-if="!Object.keys(gif).length" -->
              <Icon icon="mdi:loading" class="absolute inset-0 m-auto animate-spin" />
              <img :src="gif.URL" :alt="gif.name" class="relative block h-full w-full" />
            </div>
          </template>
        </div>

        <div class="flex items-center justify-between gap-1 pt-2 text-xs">
          <div class="form-control">
            <label class="cursor-pointer flex items-center gap-1" @click="toggleIsGif">
              <Icon icon="arcticons:gifmaker" width="20" :class="state.isGif && 'text-accent'" />
              <input type="checkbox" class="toggle toggle-sm toggle-accent" :checked="!state.isGif" />
              <Icon icon="mdi:sticker-emoji" width="20" :class="!state.isGif && 'text-accent'" />
            </label>
          </div>
          <a
            href="https://support.giphy.com/hc/en-us/articles/360020027752-GIPHY-User-Terms-of-Service"
            target="_blank"
            class="link link-hover"
          >
            Giphy Terms
          </a>
        </div>
      </div>
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { GiphyFetch } from '@giphy/js-fetch-api';

import Popper from '@/components/DockUI/Popper.vue';
import { IGif } from '@/data/interfaces';

const props = defineProps({
  btnCss: String,
  tooltip: String,
});

const state = reactive({
  isGif: true, // isGif false = stickers
  gf: new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY),
  loading: false,
  gifs: [] as IGif[],
  error: null,
});
const q = ref();

async function loadRandomGifs() {
  state.loading = true;
  // fetch 9 gifs
  const { data: gifs } = await state.gf.trending({ limit: 9 });
  state.gifs = gifs.map((gif) => {
    return { id: gif.id, URL: gif.images.original.url, name: gif.slug };
  });
  state.loading = false;
}
onMounted(() => loadRandomGifs());

async function searchGiphy() {
  state.loading = true;
  const { data: gifs } = await state.gf.search(q.value, { sort: 'relevant', lang: 'es', limit: 9 });
  state.gifs = gifs.map((gif) => {
    return { id: gif.id, URL: gif.images.original.url, name: gif.slug };
  });
  state.loading = false;
}

watch(q, (q: string) => {
  if (!q) loadRandomGifs();
});

function toggleIsGif() {
  state.isGif = !state.isGif;
}

const emit = defineEmits<{
  (e: 'addGif', gif: IGif): void;
}>();

function handleGifClick(gif: IGif) {
  // console.log('ADD GIF', gif);
  emit('addGif', gif);
}
</script>
