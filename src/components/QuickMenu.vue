<template>
  <ul class="flex flex-col gap-1 mt-3">
    <template class="flex flex-col gap-1 md:hidden">
      <li><SearchModal btnCss="btn btn-sm btn-circle" /></li>
      <li><CalendarModal btnCss="btn btn-sm btn-circle" /></li>
      <li><NotificationDrawer btnCss="btn btn-sm btn-circle" /></li>
    </template>
    <li><ToogleDarkMode css="btn btn-sm btn-circle" /></li>
    <li>
      <LogoutButton css="btn btn-sm btn-error btn-circle" />
    </li>
  </ul>
</template>

<script setup lang="ts">
//import { Icon } from '@iconify/vue';

import ToogleDarkMode from './ToogleDarkMode.vue';
import LogoutButton from './LogoutButton.vue';
import SearchModal from './SearchModal.vue';
import CalendarModal from './CalendarModal.vue';
import NotificationDrawer from './NotificationDrawer.vue';
</script>
