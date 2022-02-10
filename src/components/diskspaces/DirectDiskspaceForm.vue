<template>
  <DiskspaceForm :type="type" :diskspace="diskspace">
    <template #header>
      <div class="form-control relative w-full pb-4">
        <div class="relative">
          <input
            v-focus
            v-model="state.q"
            type="text"
            placeholder="Search @h010tag#1234..."
            class="input input-primary input-bordered w-full pr-16"
          />

          <button type="button" @click="search" class="absolute top-0 right-0 rounded-l-none btn btn-primary">
            <Icon icon="mdi:magnify" width="20" />
          </button>
        </div>

        <div v-if="state.results.length" class="absolute top-12 z-10 inset-x-0">
          <ul class="flex gap-2 w-full p-3 border border-primary bg-base-100 rounded-box rounded-t-none">
            <template v-for="user in state.results" :key="user.id">
              <li>
                <div class="flex items-center gap-2 rounded-full bg-base-200">
                  <UserAvatar :user="user" :size="8" textCss="text-sm" hideIndicators />
                  <span class="text-xs truncate">{{ user.name }}#{{ user.pin }}</span>
                  <button type="button" @click="addTeamMember(user)" class="btn btn-sm btn-circle btn-ghost">
                    <Icon icon="mdi:check" width="14" class="text-success" />
                  </button>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="form-control">
        <label class="label">Team ({{ state.team.length + 1 }})</label>
        <ul class="flex gap-2">
          <li class="cursor-not-allowed">
            <div class="flex items-center gap-2 rounded-full border bg-base-200 pr-4">
              <UserAvatar :user="users[1]" :size="8" textCss="text-sm" hideIndicators />
              <span class="text-xs truncate">{{ users[1].name }}#{{ users[1].pin }}</span>
            </div>
          </li>
          <template v-for="user in state.team" :key="user.id">
            <li>
              <div class="flex items-center gap-2 rounded-full bg-base-200">
                <UserAvatar :user="user" :size="8" textCss="text-sm" hideIndicators />
                <span class="text-xs truncate">{{ user.name }}#{{ user.pin }}</span>
                <button type="button" @click="removeTeamMember(user)" class="btn btn-sm btn-circle btn-ghost">
                  <Icon icon="mdi:close" width="14" class="text-error" />
                </button>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </DiskspaceForm>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue';
import { Icon } from '@iconify/vue';

import UserAvatar from '@/components/users/UserAvatar.vue';
import DiskspaceForm from '@/components/diskspaces/DiskspaceForm.vue';
import { IUser } from '@/data/interfaces';
import { users } from '@/data/mock';
import { SpaceType } from '@/data/mock';
import { IDiskspace } from '@/data/interfaces';

const props = defineProps({
  type: {
    type: String as PropType<SpaceType>,
    default: SpaceType.TEXT,
  },
  diskspace: {
    type: Object as PropType<IDiskspace>,
    default: {},
  },
});

const state = reactive({
  q: '',
  results: [] as IUser[],
  team: [] as IUser[],
});

function search() {
  // TODO: filter anyone already in team from results
  state.results = users.filter((x) => x.name.includes(state.q) || x.pin.toString().includes(state.q));
}

function addTeamMember(user: IUser) {
  state.team.push(user);
  const idx = state.results.findIndex((x) => x.id === user.id);
  state.results.splice(idx, 1);
}
function removeTeamMember(user: IUser) {
  const idx = state.team.findIndex((x) => x.id === user.id);
  state.team.splice(idx, 1);
  //state.results.push(user);
}
</script>
