import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'hammerjs';

// Import named export VueHammer
import { VueHammer } from 'vue2-hammer';

Vue.config.productionTip = false;

// Use the named export plugin
Vue.use(VueHammer);

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');