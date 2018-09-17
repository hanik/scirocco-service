import Vue from 'vue';
import App from './App.vue';
import { store } from './store/index';
import { router } from './router';

Vue.config.productionTip = false;

// setup fake backend for test
import { configureFakeBackend } from './helpers';
configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});


// https://github.com/cornflourblue/vue-vuex-jwt-authentication-example