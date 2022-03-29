<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h3 class="text-primary font-bold">Add New Deck</h3>
      <button @click="$emit('close')" class="btn btn-sm btn-square btn-error btn-outline">
        <Icon icon="mdi:close" width="20" />
      </button>
    </div>

    <p class="text-center">
      By creating a deck, you and your crew can access free VoIP, Text, &amp;
      <span class="font-brand">H010</span> spaces. Welcome aboard Captain!
    </p>

    <form>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="form-control required mb-2">
            <label class="label">Deck Name</label>
            <div class="relative">
              <input v-focus v-model="deck.name" type="text" class="w-full pl-16 input input-primary input-bordered" />
              <span class="absolute top-0 left-0 rounded-r-none btn btn-primary btn-disabled">
                <Icon icon="mdi:layers-outline" width="20" />
              </span>
            </div>
          </div>

          <div class="form-control mb-2">
            <label class="label">Deck HQ</label>
            <div class="relative">
              <select v-model="deck.hq" class="select select-bordered select-primary w-full max-w-xs pl-16">
                <!-- <option selected disabled>Select HQ region</option> -->
                <option v-for="region in state.regionList" :value="region.id">{{ region.name }}</option>
              </select>
              <span class="absolute top-0 left-0 rounded-r-none btn btn-primary btn-disabled">
                <Icon :icon="getRegionFlag" width="20" />
              </span>
            </div>
          </div>
        </div>
        <div class="text-center m-auto flex-col">
          <div class="relative">
            <div class="avatar" :class="deck.image_url ? '' : 'placeholder'">
              <div class="bg-primary text-neutral-content rounded-full w-32 h-32 border-4">
                <img v-if="deck.image_url" :src="deck.image_url" alt="2d avatar" class="inline-block" />
                <span v-else class="text-4xl">{{ deck.name.charAt(0) }}</span>
              </div>
            </div>
            <button class="btn btn-sm btn-circle glass border-dashed absolute right-0 bottom-0">
              <Icon icon="gis:layer-upload" width="14" />
              <input type="file" class="hidden" accept="image/*" />
            </button>
          </div>

          <div class="text-xs mt-2">
            <span class="capitalize">Min: <b>128</b> ~ Max: <b>1024</b></span>
            <span v-if="state.uploadError" class="text-error block">{{ state.uploadError }}</span>
            <span v-else class="hint block">Recommended: <b>512</b></span>
          </div>
        </div>
      </div>
    </form>

    <p class="text-xs">
      By creating a deck, you agree to <span class="font-brand">H010SPACE</span>'s
      <router-link to="/terms" class="link link-primary">Crew Regs</router-link>.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { Icon } from '@iconify/vue';

import { Region } from '@/data/mock';

const deck = reactive({
  name: '',
  image_url: '',
  hq: Region.US_EAST,
});

const state = {
  regionList: [
    { id: Region.US_EAST, name: 'US-East', icon: 'emojione:flag-for-united-states' },
    { id: Region.JP_ASIA, name: 'JP-Asia', icon: 'emojione:flag-for-japan' },
  ],
  uploadError: null,
};

const getRegionFlag = computed(() => state.regionList[state.regionList.findIndex((x) => x.id === deck.hq)].icon);
</script>

<style scoped>
.form-control:focus-within label {
  @apply text-primary;
}
</style>
