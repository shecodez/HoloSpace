<template>
  <div class="indicator m-4">
    <div class="indicator-item badge badge-xs py-2" :class="!offline && 'badge-primary'">{{ users.length }}</div>
    <h5 class="mr-2 text-xs font-bold">{{ title }}</h5>
  </div>

  <ul class="user-list flex-1 flex flex-col gap-2" :class="offline ? 'offline' : 'online'">
    <li v-for="user in users" :key="user.id" class="user px-3 flex items-center hover:bg-gradient-to-r from-black">
      <Popper placement="left">
        <template v-slot:activator>
          <UserAvatar :user="user" :isCaptain="user.id === '1' ? true : false" />
        </template>
        <UserCard :user="user" :isActiveUser="user.id === '1'" />
      </Popper>

      <div class="hide-on-collapsed ml-4 overflow-hidden">
        <p class="truncate">{{ user.name }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';

import UserAvatar from './UserAvatar.vue';
import Popper from './DockUI/Popper.vue';
import UserCard from './UserCard.vue';
import { IUser } from '../data/interfaces';

const props = defineProps({
  title: String,
  users: {
    type: Array as PropType<IUser[]>,
    default: [],
  },
  offline: {
    type: Boolean,
    default: false,
  },
});

const { title, users, offline } = toRefs(props);
</script>

<style>
/* .user:hover {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
} */

.user-list.online .avatar {
  filter: none;
}
.user-list.offline .avatar,
.user-list.offline .status {
  filter: grayscale(100%);
}
.user-list.offline .avatar:hover {
  filter: none;
}
.user-card .avatar {
  filter: none !important;
}
</style>
