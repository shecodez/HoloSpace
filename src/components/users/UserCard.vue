<template>
  <div class="user-card bg-base-200 max-w-xs rounded py-2 px-4 shadow-md">
    <div class="flex items-center space-x-4">
      <UserAvatar :user="user" :size="16" :iconSize="20" textCss="text-4xl" />
      <div class="flex-1 flex-col overflow-hidden">
        <div class="indicator max-w-full mt-4">
          <div class="indicator-item indicator-start badge badge-xs badge-accent ml-6">#{{ user.pin }}</div>
          <h5 class="truncate text-3xl">{{ user.name }}</h5>
        </div>
        <p class="text-xs text-right">Joined: {{ format(new Date(), 'MMM yy') }}'</p>
      </div>
    </div>

    <div class="grid grid-flow-col grid-cols-2 gap-4 my-4">
      <div>
        <div class="flex items-center gap-2">
          <Icon icon="mdi:shield-half-full" width="20" />
          <span>Role</span>
        </div>
        <p>badges go here...</p>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <Icon icon="mdi:note-outline" width="20" />
          <span>Note</span>
        </div>
        <p>notes go here...</p>
      </div>
    </div>

    <div v-if="!isActiveUser" class="actions flex items-center pt-2">
      <div v-if="showInput" class="form-control w-full mr-4">
        <div class="indicator w-full">
          <div class="indicator-item badge badge-secondary">
            <Icon @click="closeInput" icon="mdi:close" width="12" />
          </div>
          <div class="relative w-full">
            <input
              type="text"
              :placeholder="`DM @${user.name}`"
              class="block input input-primary input-bordered rounded-r-none"
            />
            <button class="absolute top-0 right-0 rounded-l-none btn btn-primary">
              <Icon icon="fa:paper-plane" width="24" />
            </button>
          </div>
        </div>
      </div>
      <button v-else @click="openInput" class="btn btn-outline btn-primary flex items-center gap-2">
        <span class="font-medium uppercase">Direct Comm</span>
        <Icon icon="fa:paper-plane" width="24" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import { format } from 'date-fns';

import { IUser } from '@/data/interfaces';
import UserAvatar from '@/components/users/UserAvatar.vue';

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    default: {},
  },
  isActiveUser: {
    type: Boolean,
    default: false,
  },
});

const showInput = ref(false);
function openInput() {
  showInput.value = true;
}
function closeInput() {
  showInput.value = false;
}
// TODO: function upsertDirectComm() {}

const { user, isActiveUser } = toRefs(props);
</script>

<style scoped>
.user-card::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: -90%;
  transform: skewY(-15deg);
  overflow: hidden;
  margin: 0 -1rem;
}
</style>
