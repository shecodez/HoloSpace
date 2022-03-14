<template>
  <div class="hs-toast relative pt-4 overflow-hidden" :class="`${type}-toast bg-${type}-500`">
    <!-- <div class="flex justify-end space-x-1 p-1 mr-2">
      <div class="w-2 h-2 rounded-full bg-white bg-opacity-50 hover:bg-white" />
      <div class="w-2 h-2 rounded-full bg-white hover:bg-red-500" />
    </div> -->
    <div v-if="type === 'warning'" class="exclamation absolute left-7 top-0 z-20 text-red-400 font-bold">-!-</div>
    <div class="relative" :class="`${type}-face`">
      <div class="face absolute w-11 h-11 bg-white rounded-full border border-gray-800 top-0 left-4 z-10">
        <span class="eye" />
        <span class="eye" />
        <span class="mouth absolute w-2 h-2 rounded-full" />
      </div>
      <div class="shadow absolute w-10 h-1 bg-gray-800 bg-opacity-50 left-5 top-11 z-10" />
    </div>
    <div class="message uppercase mr-4" :class="type === 'error' || type === 'danger' ? 'ml-4' : 'ml-20'">
      <h4>
        <slot name="title">{{ title }}</slot>
      </h4>
      <p>
        <slot>{{ text }}</slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  type: String, // success, error, danger, info, warning
  title: String,
  text: String,
});

const { type, title, text } = toRefs(props);
</script>

<style scoped>
.hs-toast {
  min-height: 5rem;
}
.message {
  @apply cursor-default;
}
.message h4 {
  @apply text-sm text-gray-200;
  letter-spacing: 3px;
  text-shadow: 1px 1px #777;
}
.message p {
  font-size: 0.5em;
  @apply text-gray-800;
  letter-spacing: 1px;
}

.eye {
  @apply absolute w-1 h-1 bg-gray-900 rounded-full;
}
.eye {
  top: 40%;
  left: 21%;
}
.eye:nth-of-type(2) {
  left: 68%;
}

.mouth {
  top: 43%;
  left: 41%;
}

.shadow {
  border-radius: 50%;
}

.success-face .mouth {
  border: 1px solid;
  border-color: transparent #777 #777 transparent;
  transform: rotate(45deg);
}
.error-face .mouth,
.danger-face .mouth {
  border: 1px solid;
  border-color: #777 transparent transparent #777;
  transform: rotate(45deg);
}
.info-face .mouth {
  border: 1px solid #777;
  border-radius: 0;
}
.warning-face .mouth {
  top: 50%;
  height: 1px;
  border-bottom: 1px solid #777;
  border-radius: 0;
}

.success-face .face {
  animation: bounce 1s ease-in infinite;
}
.success-face .shadow {
  animation: scale 1s ease-in infinite;
}

.error-face .face,
.danger-face .face {
  left: initial;
  right: 5%;
  animation: roll 3s ease-in-out infinite;
}
.error-face .shadow,
.danger-face .shadow {
  left: initial;
  right: 5%;
  animation: move 3s ease-in-out infinite;
}

.info-face .mouth {
  animation: talk 2s ease-in-out infinite;
}

.warning-face .eye {
  animation: blink 2s steps(5, start) infinite;
}

.warning-toast .exclamation {
  text-shadow: 1px 1px #777;
  animation: scale 1s ease-in-out infinite;
}

@keyframes bounce {
  50% {
    transform: translateY(-10px);
  }
}

@keyframes scale {
  50% {
    transform: scale(0.85);
  }
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
    right: 5%;
  }
  50% {
    right: 45%;
    transform: rotate(-175deg);
  }
  100% {
    transform: rotate(0deg);
    right: 5%;
  }
}

@keyframes move {
  0% {
    right: 5%;
  }
  50% {
    right: 45%;
  }
  100% {
    right: 5%;
  }
}

@keyframes talk {
  0% {
    height: 8px;
  }
  45% {
    height: 2px;
  }
  75% {
    height: 6px;
  }
  85% {
    height: 4px;
  }
  100% {
    height: 6px;
  }
}

@keyframes blink {
  0% {
    height: 4px;
  }
  85% {
    height: 4px;
  }
  95% {
    height: 2px;
  }
  100% {
    height: 1px;
  }
}

/*
$white: #fcfcfc;
$grey: #ccc;
$dark: #777;
$error: #ef8d9c;
$orange: #ffc39e;
$success: #b0db7d;
$lime: #99dbb4;
$blue: #7db0db;
$purple: #7d81db;
$yellow: #efe08d;
$peach: #efaf8d;


.success-toast {
  /* background: linear-gradient(to bottom right, $success 40%, $lime 100%); /
  @apply bg-gradient-to-br from-green-500 to-indigo-300;
}

.error-toast {
  /* background: linear-gradient(to bottom left, $error 40%, $orange 100%); /
  @apply bg-gradient-to-bl from-red-500 to-yellow-500;
}

.info-toast {
  /* background: linear-gradient(to bottom right, $blue 40%, $purple 100%); /
  @apply bg-gradient-to-br from-blue-500 to-purple-500;
}

.warning-toast {
  /* background: linear-gradient(to bottom left, $yellow 40%, $peach 100%); /
  @apply bg-gradient-to-bl from-yellow-500 to-red-300;
}*/
</style>
