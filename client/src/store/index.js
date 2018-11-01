import Vue from 'vue';
import Vuex from 'vuex';

import alert from './alert.module';
import authentication from './authentication.module';
import users from './users.module';
import models from './models.module';
import current from './current.module';
import status from './status.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    authentication,
    users,
    models,
    current,
    status,
  },
});

