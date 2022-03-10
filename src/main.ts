import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'mosha-vue-toastify/dist/style.css';
import './assets/styles/tailwind.css';
import App from './App.vue';
import { router } from './router';
import focus from './directives/focus';

const app = createApp(App);

app.directive('focus', focus);

app.use(createPinia());
app.use(router);

app.mount('#app');
