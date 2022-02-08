<template>
  <button @click="openModal" :class="btnCss" title="Search">
    <Icon icon="mdi:magnify" width="24" />
  </button>

  <Modal :isOpen="openSearch" @close="closeModal" css="w-11/12 md:max-w-lg mx-auto rounded shadow-lg">
    <form class="flex w-full">
      <div class="form-control">
        <select v-model="state.filter" class="select select-bordered select-primary rounded-r-none rounded-bl-none">
          <option v-for="filter in filters" :value="filter.name">{{ filter.name }}</option>
        </select>
      </div>

      <div class="form-control w-full">
        <div class="relative">
          <input
            v-focus
            v-model="state.search"
            type="text"
            placeholder="Search..."
            class="input input-primary input-bordered w-full pr-16 rounded-l-none rounded-br-none"
          />

          <button type="button" class="absolute top-0 right-0 rounded-l-none btn btn-primary">
            <Icon icon="mdi:magnify" width="20" />
          </button>
        </div>
      </div>
    </form>

    <div class="p-4 bg-base-100">Results</div>

    <div class="my-divider border-t bg-base-100 rounded-b-lg flex items-center">
      <button @click="closeModal" class="btn btn-sm btn-error rounded-t-none rounded-r-none">
        <Icon icon="mdi:close" width="20" />
      </button>
      <div class="flex-1 text-xs font-bold text-right px-4">Hits: {{ state.results.length }}</div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';

const props = defineProps({
  btnCss: {
    type: String,
    default: 'btn btn-square btn-sm btn-ghost',
  },
  collapsed: Boolean,
});

const { btnCss } = toRefs(props);

const openSearch = ref(false);
function openModal() {
  openSearch.value = true;
}
function closeModal() {
  openSearch.value = false;
}

const state = reactive({
  search: '',
  filter: 'All',
  results: [],
});

const filters = [{ name: 'All' }, { name: 'Users' }, { name: 'Decks' }, { name: 'Diskspaces' }, { name: 'Messages' }];
</script>
