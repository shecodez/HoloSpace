<template>
  <div class="w-1/2">
    <Tabs>
      <Tab title="Tab 1">
        <h3>This is Tab 1</h3>
      </Tab>
      <Tab title="Tab 2">
        <h3>This is Tab 2</h3>
      </Tab>
      <Tab title="Tab 3">
        <h3>This is Tab 3</h3>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
//import { Tabs, Tab } from '@/components/DockUI/Tabs'; // ts-err with this import
import Tab from '@/components/DockUI/Tabs/Tab.vue';
import Tabs from '@/components/DockUI/Tabs/Tabs.vue';
</script>
