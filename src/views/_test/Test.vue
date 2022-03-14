<template>
  <Layout pageTitle="Test">
    <h1>Test</h1>

    <!-- <EmojiPicker @addEmoji="addEmoji" /> -->
    <GifPicker />

    <div class="border p-4">{{ output }}</div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Layout from '@/layouts/SiteLayout.vue';
import EmojiPicker from '@/components/chat/EmojiPicker.vue';
import { EmojiClickEventDetail } from '@/data/interfaces';
import GifPicker from '@/components/chat/GifPicker.vue';

const output = ref('');

function addEmoji(detail: EmojiClickEventDetail) {
  console.log('click', detail);
  output.value = output.value + detail.unicode;
}

function addGif() {
  console.log('clicked gif');
}
</script>
