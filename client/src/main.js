import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router/';
import store from './vuex/store';
import './registerServiceWorker';

Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// https://lovemewithoutall.github.io/it/vue-login-demo/
