import { createApp } from 'vue'
import './style.css'
import { createWebHistory, createRouter } from 'vue-router'
import {createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import i18n from './i18n'

// Add Eruda for console debugging on mobile (remove if not needed)
// import eruda from 'eruda'
// eruda.init()

// Create a Pinia store
const pinia = createPinia()
// Make Pinia persist its state
pinia.use(piniaPluginPersistedstate);

import App from './views/App.vue'
import Home from './views/Home.vue'
import ActivityConfig from './views/games/activity/ActivityConfig.vue'
import ActivityBreak from './views/games/activity/ActivityBreak.vue'
import ActivityGame from './views/games/activity/ActivityGame.vue'
import ActivityDone from './views/games/activity/ActivityDone.vue'
import ActivityRanked from './views/games/activity/ActivityRanked.vue'
import ActivityTimeUp from './views/games/activity/ActivityTimeUp.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/activity/game-config', component: ActivityConfig },
  { path: '/activity/break', component: ActivityBreak },
  { path: '/activity', component: ActivityGame },
  { path: '/activity/done', component: ActivityDone },
  { path: '/activity/ranked', component: ActivityRanked },
  { path: '/activity/time-up', component: ActivityTimeUp },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .mount('#app')
