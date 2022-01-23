<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" css="bg-base-100 w-11/12 md:max-w-lg mx-auto rounded shadow-lg">
    <div class="add-or-join-deck-modal p-6">
      <div v-if="state.init" class="flex text-center">
        <div class="init-col">
          <h2 class="text-primary">Add</h2>
          <Icon icon="mdi:layers-plus" width="72" class="m-auto" />
          <p>Add a new Deck and invite your crew. It's free! 😉</p>
          <button @click="showAddDeckForm" class="btn btn-primary block">Add A Deck</button>
        </div>
        <div class="divider divider-vertical">OR</div>
        <div class="init-col">
          <h2 class="text-accent">Join</h2>
          <Icon icon="mdi:account-multiple-plus" width="72" class="m-auto" />
          <p>Enter a <span class="font-brand">H010key</span> 🔑 and join your crew On-Deck.</p>
          <button @click="showJoinDeckForm" class="btn btn-accent block">Join A Deck</button>
        </div>
      </div>

      <AddDeckForm v-if="state.add" @submitForm="addDeck" @close="$emit('close')" />
      <JoinDeckForm v-if="state.join" @submitForm="joinDeck" @close="$emit('close')" />

      <div v-if="!state.init" class="flex items-center justify-between pt-4">
        <button @click="back" class="btn btn-outline flex gap-2">
          <Icon icon="mdi:keyboard-backspace" width="24" />
        </button>

        <button v-if="state.add" class="btn btn-primary">Add Deck</button>
        <button v-if="state.join" class="btn btn-accent">Join Deck</button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';
import AddDeckForm from '@/components/decks/AddDeckForm.vue';
import JoinDeckForm from '@/components/decks/JoinDeckForm.vue';
import { IDeck } from '@/data/interfaces';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const { isOpen } = toRefs(props);

const state = reactive({
  init: true,
  add: false,
  join: false,
});

function showAddDeckForm() {
  state.init = false;
  state.add = true;
}

function showJoinDeckForm() {
  state.init = false;
  state.join = true;
}

function back() {
  state.init = true;
  state.add = false;
  state.join = false;
}

function addDeck(deck: IDeck) {
  console.log('Add Deck', deck);
}

function joinDeck(h010key: string) {
  console.log('Join Deck with h010key', h010key);
}
</script>

<style scoped>
h2 {
  @apply text-xl uppercase font-bold;
}
.init-col {
  @apply flex-1 flex flex-col gap-4 p-2;
}

p {
  @apply text-sm;
}
</style>
