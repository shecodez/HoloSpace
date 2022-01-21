<template>
  <button @click="openModal" :class="btnCss">
    <Icon icon="mdi:calendar-month" width="24" />
  </button>

  <Modal :isOpen="openCalendar" @close="closeModal" fullscreen closeBtnCss="hidden">
    <div class="flex flex-col w-full h-full">
      <div class="navbar bg-primary shadow-lg">
        <div class="flex-none">
          <button @click="closeModal" class="btn btn-square btn-ghost hover:btn-error">
            <Icon icon="mdi:close" width="24" />
          </button>
        </div>
        <div class="flex-1 px-2 mx-2 flex items-center w-full overflow-hidden">
          <h2 class="text-lg font-bold pr-2">Calendar</h2>
        </div>

        <div class="flex gap-4">
          <button class="btn btn-square btn-ghost">
            <Icon icon="mdi:cog" width="24" />
          </button>
        </div>
      </div>

      <div class="flex w-full h-full">
        <!-- TODO: background will be an image of forcast (i.e. clouds if cloudy) -->
        <div class="w-64 bg-base-300" :class="collapsed && 'hidden'">
          <Panel class="shadow-lg">
            <template #header>
              <div class="navbar px-4 py-2">
                <div class="flex-none">
                  <button class="btn btn-sm btn-square btn-primary btn-outline">
                    <Icon icon="carbon:location-filled" width="24" />
                  </button>
                  <div class="flex flex-col mx-2 leading-3">
                    <span class="font-bold capitalize">Atlanta</span>
                    <span class="text-xs uppercase">ga</span>
                  </div>
                </div>

                <div class="ml-auto">
                  <span class="text-4xl font-bold">72</span>
                  <Icon icon="wi:degrees" width="12" />
                </div>
              </div>
            </template>

            <div class="flex flex-col items-center justify-center font-semibold p-4">
              <h3 class="text-7xl mb-1">{{ format(today, 'd') }}</h3>
              <span class="uppercase text-sm">{{ format(today, 'iiii') }}</span>
            </div>

            <div class="overflow-y-auto overflow-x-hidden">
              <div v-if="!events.length" class="text-center p-4 font-bold">No upcoming events.</div>
              <div v-else class="p-3">
                <h5 class="text-xs font-bold mb-2">Upcoming Events:</h5>
                <!-- TODO: events.slice(0,3) where event.startDate >= today -->
                <ul>
                  <li v-for="event in events.slice(0, 3)" :key="event.id" class="my-divider border-b py-2">
                    {{ event.title || 'Untitled' }}
                  </li>
                </ul>
              </div>
            </div>

            <template #footer>
              <div class="navbar mx-2">
                <button class="btn btn-sm btn-primary w-full flex items-center gap-2">
                  <Icon icon="mdi:plus" width="24" />
                  Add Event
                </button>
              </div>
            </template>
          </Panel>
        </div>

        <div class="flex-1 bg-primary">
          <div class="flex flex-col h-full">
            <div class="navbar bg-base-200">
              <div class="flex-none">
                <button
                  @click="toggleCollapsed"
                  class="btn btn-square btn-ghost"
                  :class="!collapsed && 'transform rotate-180'"
                >
                  <Icon icon="mdi:forwardburger" width="24" />
                </button>
              </div>
              <div class="flex-1 px-2 mx-2 flex items-center w-full overflow-hidden">
                <h2 class="text-lg font-bold pr-2">{{ format(state.showDate, 'MMMM y') }}</h2>
              </div>

              <div class="flex gap-2 mx-2">
                <button class="btn btn-primary btn-sm">Today</button>
                <div class="flex items-center gap-2">
                  <button class="btn btn-sm btn-square btn-ghost">
                    <Icon icon="bx:bx-caret-left" width="24" />
                  </button>
                  <span class="font-semibold uppercase">{{ state.displayPeriodUom }}</span>
                  <button class="btn btn-sm btn-square btn-ghost">
                    <Icon icon="bx:bx-caret-right" width="24" />
                  </button>
                </div>
              </div>
            </div>

            <div class="flex-1 flex flex-col flex-grow text-neutral">
              <!-- TODO: add css to cross-out past days -->
              <CalendarView
                :items="events"
                :show-date="state.showDate"
                :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
                show-times
                :display-period-uom="state.displayPeriodUom"
                :current-period-label="state.useTodayIcons ? 'icons' : ''"
                @click-date="onClickDay"
                @click-item="onClickItem"
                class="theme-default holiday-us-traditional holiday-us-official"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import { format } from 'date-fns';
import { CalendarView } from 'vue-simple-calendar';
import '../../node_modules/vue-simple-calendar/dist/style.css';
// The next two lines are optional themes
import '../../node_modules/vue-simple-calendar/static/css/default.css';
import '../../node_modules/vue-simple-calendar/static/css/holidays-us.css';

import Modal from '@/components/DockUI/Modal.vue';
import Panel from '@/components/Panel.vue';
import { events as all_events } from '@/data/mock';

const props = defineProps({
  btnCss: {
    type: String,
    default: 'btn btn-square btn-sm btn-ghost',
  },
  collapsed: Boolean,
});

const { btnCss } = toRefs(props);

const today = new Date();

const openCalendar = ref(false);
function openModal() {
  openCalendar.value = true;
}
function closeModal() {
  openCalendar.value = false;
}

const collapsed = ref(false);
function toggleCollapsed() {
  collapsed.value = !collapsed.value;
}

const state = reactive({
  showDate: today, // change this to go to other months/years
  disablePast: true, // ?
  displayPeriodUom: 'month', // week
  newItemTitle: '',
  newItemStartDate: new Date(),
  newItemEndDate: new Date(),
  useDefaultTheme: true,
  useHolidayTheme: true,
  useTodayIcons: true,
});

function onClickDay(d: any) {
  console.log(`You clicked: ${d}`);
}

function onClickItem(e: any) {
  console.log(`You clicked: ${e.title}`);
}

const events = ref(all_events);

function clickTestAddEvent() {
  events.value.push({
    id: 'e' + Math.random().toString(36).substr(2, 10),
    title: state.newItemTitle,
    startDate: state.newItemStartDate,
    endDate: state.newItemEndDate,
  });
  console.log('Toast Success: You added a calendar event!');
}
</script>

<style>
.cv-weekdays {
  overflow: overlay;
}
</style>
