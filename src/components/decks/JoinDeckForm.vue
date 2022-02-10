<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h3 class="text-accent font-bold">Join a Deck</h3>
      <button @click="$emit('close')" class="btn btn-sm btn-square btn-error btn-outline">
        <Icon icon="mdi:close" width="20" />
      </button>
    </div>

    <p class="text-center px-4">
      Enter your <span class="font-brand">H010key</span> to join an existing Deck. Your key should look something like
      this:
      <span class="text-accent">https://h010space.com/h0l0keys/H6x35a</span>
    </p>

    <form>
      <div class="form-control mb-2">
        <label class="label">H010key</label>
        <div class="relative">
          <input v-focus type="text" placeholder="H6x35a" class="w-full pl-16 input input-accent input-bordered" />
          <span class="absolute top-0 left-0 rounded-r-none btn btn-accent btn-disabled">
            <Icon icon="mdi:key-variant" width="20" />
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<style scoped>
.form-control:focus-within label {
  @apply text-accent;
}
</style>
