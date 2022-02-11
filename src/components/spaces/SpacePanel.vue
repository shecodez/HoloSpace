<template>
  <Panel css="bg-base-200 bg-opacity-70">
    <template #header>
      <TeamToolbar v-if="isTeam" />
      <DeckToolbar v-else :deck="deck" />
    </template>

    <div class="overflow-y-auto overflow-x-hidden">
      <SpaceList :type="SpaceType.TEXT" :isTeam="isTeam" :spaces="textSpaces" :open="isActiveType(SpaceType.TEXT)" />
      <SpaceList :type="SpaceType.VOIP" :isTeam="isTeam" :spaces="voipSpaces" :open="isActiveType(SpaceType.VOIP)" />
      <SpaceList :type="SpaceType.H010" :isTeam="isTeam" :spaces="h010Spaces" :open="isActiveType(SpaceType.H010)" />
    </div>

    <template #footer>
      <div class="bg-black p-2 flex items-center justify-center">Ad</div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import Panel from '@/components/DockUI/Panel.vue';
import SpaceList from '@/components/spaces/SpaceList.vue';
import DeckToolbar from '@/components/decks/DeckToolbar.vue';
import TeamToolbar from '@/components/spaces/TeamToolbar.vue';
import { SpaceType } from '@/data/mock';
import { IDeck, ISpace } from '@/data/interfaces';

const props = defineProps({
  deck: {
    type: Object as PropType<IDeck>,
    default: {},
  },
  isTeam: Boolean,
  spaces: {
    type: Array as PropType<ISpace[]>,
    default: [],
  },
});

const textSpaces = computed(() => spaces.value.filter((x) => x.type === SpaceType.TEXT));
const voipSpaces = computed(() => spaces.value.filter((x) => x.type === SpaceType.VOIP));
const h010Spaces = computed(() => spaces.value.filter((x) => x.type === SpaceType.H010));

const route = useRoute();

function isActiveType(listType: SpaceType) {
  const activeSpace = spaces.value.find((x) => x.id === route.params.space_id);
  return activeSpace?.type === listType;
}

const { deck, spaces } = toRefs(props);
</script>
