import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify';
import snotify from '@/plugins/notifier';

Vue.config.productionTip = false

require('./mixins');

new Vue({
  router,
  store,
  vuetify,
  snotify,
  render: h => h(App)
}).$mount('#app')
