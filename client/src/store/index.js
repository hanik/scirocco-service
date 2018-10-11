import Vue from 'vue';
import Vuex from 'vuex';

import alert from './alert.module';
import authentication from './authentication.module';
import users from './users.module';
import gara from './gara.module';
import current from './current.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    authentication,
    users,
    gara,
    current,
  },
});

