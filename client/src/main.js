import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router';

// setup fake backend for test
import { configureFakeBackend } from './helpers';

Vue.config.productionTip = false;
configureFakeBackend();

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App),
});


// https://github.com/cornflourblue/vue-vuex-jwt-authentication-example
