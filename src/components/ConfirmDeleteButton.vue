<template>
  <div class="flex items-center gap-2" :class="css">
    <button @click="isRdyToDelete ? emitDelete() : prepForDelete()" type="button" class="btn" :class="btnCss">
      <slot>
        <span>🗑️</span>
        <span v-if="isRdyToDelete"> Confirm</span>
        <span v-else>&nbsp;{{ label }}</span>
        <span class="sr-only">Confirm Delete</span>
      </slot>
    </button>

    <button v-if="isRdyToDelete" type="button" class="btn btn-ghost" @click="cancelDelete()">Cancel</button>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';

const props = defineProps({
  label: String,
  css: String,
  btnCss: {
    type: String,
    default: 'btn-error',
  },
});

const isRdyToDelete = ref(false);
function prepForDelete() {
  isRdyToDelete.value = true;
}

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

function emitDelete() {
  emit('delete');
  isRdyToDelete.value = false;
}

function cancelDelete() {
  isRdyToDelete.value = false;
}

const { label, css, btnCss } = toRefs(props);
</script>
