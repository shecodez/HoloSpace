<script setup lang="ts">
// const active = computed(() => {
//   get: () => {}
//   set: () => {}
// })
</script>

<template>
  <router-view></router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

.app {
  @apply h-full text-gray-800 dark:text-gray-200;
}

.bg-0d0d0d {
  background-color: #0d0d0d;
}

.font-brand {
  font-family: 'Audiowide', cursive;
}

.my-divider {
  @apply border-black border-opacity-10 dark:border-white dark:border-opacity-10;
}

.ribbon-tail:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0;
  /* TODO: calc dynamic width w/ JS */
  background: transparent;
  clip-path: polygon(50% 50%, 0 100%, 100% 100%);
  transform: rotate(270deg);
}
</style>
