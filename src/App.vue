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
  right: 0;
  bottom: 0;
  top: 0;
  clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
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
