import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/tailwind.css';
import { router } from './router';
import focus from './directives/focus';

const app = createApp(App);

app.directive('focus', focus);

app.use(router);
app.mount('#app');
