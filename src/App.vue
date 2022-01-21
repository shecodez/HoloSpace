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
  @apply h-full;
}

.bg-0d0d0d {
  background-color: #0d0d0d;
}

.font-brand {
  font-family: 'Audiowide', cursive;
}

.my-divider {
  @apply border-gray-400 border-opacity-70;
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

.t-border-menu {
  @apply bg-base-100 rounded border-t-2 border-primary;
}

label.label {
  @apply text-xs uppercase font-medium inline-block;
}
.form-control.required .label:after {
  content: ' *';
  color: red;
}
</style>
