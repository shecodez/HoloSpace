<template>
  <form>
    <template v-if="isTeam">
      <div class="form-control relative w-full pb-4">
        <div class="relative">
          <input
            v-focus
            v-model="state.q"
            type="text"
            placeholder="Search @h010tag#1234..."
            class="input input-secondary input-bordered w-full pr-16"
          />

          <button type="button" @click="search" class="absolute top-0 right-0 rounded-l-none btn btn-secondary">
            <Icon icon="mdi:magnify" width="20" />
          </button>
        </div>

        <div v-if="state.results.length" class="absolute top-12 z-10 inset-x-0">
          <ul class="flex gap-2 w-full p-3 border border-secondary bg-base-100 rounded-box rounded-t-none">
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

    <div class="form-control required mb-2">
      <label class="label">Name</label>
      <div class="relative">
        <input v-focus v-model="form.name" type="text" class="w-full pl-16 input input-secondary input-bordered" />
        <span class="absolute top-0 left-0 rounded-r-none btn btn-secondary btn-disabled">
          <Icon icon="carbon:vmdk-disk" width="20" />
        </span>
      </div>
    </div>

    <div class="form-control mb-2">
      <label class="label">Topic</label>
      <div class="relative flex">
        <textarea v-model="form.topic" class="textarea h-24 textarea-bordered textarea-secondary pl-16 w-full" />
        <span class="absolute top-0 left-0 h-full rounded-r-none btn btn-secondary btn-disabled">
          <Icon icon="mdi:note-text" width="20" />
        </span>
      </div>
    </div>

    <div class="form-control required mb-2 md:w-1/2">
      <label class="label">Type</label>
      <div class="relative">
        <select v-model="form.type" :disabled="!!space.id" class="select select-bordered select-secondary pl-16 w-full">
          <!-- <option selected disabled>Select Space Type</option> -->
          <option v-for="spaceType in state.spaceTypes" :value="spaceType.id">
            {{ spaceType.name }}
          </option>
        </select>
        <span class="absolute top-0 left-0 rounded-r-none btn btn-secondary btn-disabled">
          <Icon :icon="getSpaceTypeIcon" width="20" />
        </span>
      </div>
    </div>

    <template v-if="isTeam">
      <div class="form-control">
        <label class="label">Team</label>
        <ul class="flex gap-2">
          <li class="cursor-not-allowed">
            <div class="flex items-center gap-2 rounded-full border bg-base-200 pr-4">
              <UserAvatar :user="users[1]" :size="8" textCss="text-sm" hideIndicators />
              <span class="text-xs truncate">{{ users[1].name }}#{{ users[1].pin }}</span>
            </div>
          </li>
          <template v-for="user in form.team" :key="user.id">
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

    <div class="text-right mt-6">
      <div v-if="!!space.id" class="flex gap-2 justify-end">
        <button class="btn btn-secondary">Edit</button>
        <ConfirmDeleteButton @delete="deleteSpace" />
      </div>
      <button v-else class="btn btn-secondary">{{ `Add ${form.type}Space` }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, reactive, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import UserAvatar from '@/components/users/UserAvatar.vue';
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton.vue';
import { SpaceType, users } from '@/data/mock';
import { ISpace, IUser } from '@/data/interfaces';

const props = defineProps({
  type: {
    type: String as PropType<SpaceType>,
    default: SpaceType.TEXT,
  },
  isTeam: {
    type: Boolean,
    default: false,
  },
  space: {
    type: Object as PropType<ISpace>,
    default: {},
  },
});
const { type, space } = toRefs(props);

const state = {
  q: '',
  results: [] as IUser[],
  spaceTypes: [
    { id: SpaceType.TEXT, name: 'Text', icon: 'ph:chats-fill' },
    { id: SpaceType.VOIP, name: 'VoIP', icon: 'mdi:microphone' },
    { id: SpaceType.H010, name: 'H010', icon: 'heroicons-solid:cube-transparent' },
  ],
  uploadError: null,
};

const form = reactive({
  name: '',
  topic: '',
  type: type.value,
  team: [] as IUser[],
});

onMounted(() => {
  if (!!space.value.id) {
    form.name = space.value.name;
    form.topic = space.value.topic || '';
    form.type = space.value.type;
    form.team = space.value.team as IUser[];
  }
});

function search() {
  // TODO: filter anyone already in team from results
  state.results = users.filter((x) => x.name.includes(state.q) || x.pin.toString().includes(state.q));
}

function addTeamMember(user: IUser) {
  form.team.push(user);
  const idx = state.results.findIndex((x) => x.id === user.id);
  state.results.splice(idx, 1);
}

function removeTeamMember(user: IUser) {
  const idx = form.team.findIndex((x) => x.id === user.id);
  form.team.splice(idx, 1);
  //state.results.push(user);
}

// TODO: submitAddSpace, submitEditSpace

function deleteSpace() {
  console.log('Delete', space.value);
}

const getSpaceTypeIcon = computed(() => state.spaceTypes[state.spaceTypes.findIndex((x) => x.id === form.type)].icon);
</script>

<style scoped>
.form-control:focus-within label {
  @apply text-secondary;
}
</style>
