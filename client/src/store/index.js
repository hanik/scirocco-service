import Vue from 'vue';
import Vuex from 'vuex';

import alert from './alert.module';
import authentication from './authentication.module';
import users from './users.module';
import userState from './user.state.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    authentication,
    users,
    userState,
  },
});

