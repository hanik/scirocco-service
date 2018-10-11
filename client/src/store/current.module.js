import api from './api';

const current = {
  namespaced: true,
  state: {
    type: null,
    message: null,
    feedbackTotal: -1,
    feedbackCurrent: -1,
  },
  actions: {
    async getFeedbackInfo({ commit }) {
      const feedbackInfo = await api.getFeedbackInfo();
      console.log(feedbackInfo);
      // commit('error', message);
    },
    async createModel({ commit }, modelInfo ) {
      await api.createModel(modelInfo);
    },
    error({ commit }, message) {
      commit('error', message);
    },
    clear({ commit }, message) {
      commit('success', message);
    },
  },
  mutations: {
    success(state, message) {
      state.type = 'alert-success';
      state.message = message;
    },
    error(state, message) {
      state.type = 'alert-danger';
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    },
  },
};

export default current;
