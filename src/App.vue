<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Barlow+Condensed:wght@400;700&family=Barlow:wght@400;700&display=swap');

/* ------------------- */
/* Reset               */
/* ------------------- */

/* https://piccalil.li/blog/a-modern-css-reset/ */

/* Box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* set up the body */
body,
#app {
  /* @apply h-full; */
  line-height: 1.5;
  min-height: 100vh;
  font-family: 'Barlow', sans-serif;
}

/* make images easier to work with */
img,
picutre {
  max-width: 100%;
  display: block;
}

/* remove animations for people who've turned them off */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    background-attachment: initial !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
}

/* ------------------- */
/* Global              */
/* ------------------- */

.bg-0d0d0d {
  background-color: #0d0d0d;
}

.font-brand {
  font-family: 'Audiowide', cursive;
}
.font-sans-normal {
  font-family: 'Barlow', sans-serif;
}
.font-sans-accent {
  font-family: 'Barlow Condensed', sans-serif;
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
