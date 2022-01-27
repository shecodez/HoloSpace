<template>
  <ul class="relative flex flex-col gap-1 mt-3">
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

import ToogleDarkMode from '@/components/ToogleDarkMode.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import SearchModal from '@/components/search/SearchModal.vue';
import CalendarModal from '@/components/calendar/CalendarModal.vue';
import NotificationDrawer from '@/components/me/NotificationDrawer.vue';
</script>
