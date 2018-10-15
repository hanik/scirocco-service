import api from '@/services/api.service';

const current = {
  namespaced: true,
  state: {
    type: null, // TODO 이것은 무슨 용도?
    message: null,
    feedbackTotal: -1,
    feedbackCurrent: -1,
    feedbackInfo: {},
  },
  actions: {
    async fetchFeedbackInfoAsync({ commit }) {
      const feedbackInfo = await api.fetchFeedbackInfo();
      console.log(feedbackInfo);
      commit('fetchFeedbackSuccess', feedbackInfo);
    },
    async createModelAsync({ commit }, modelInfo) {
      await api.createModel(modelInfo);
      commit('success', '');
    },
    error({ commit }, message) {
      commit('error', message);
    },
    clear({ commit }) {
      commit('clear', '');
    },
  },
  mutations: {
    fetchFeedbackSuccess(state, feedbackInfo) {
      state.type = 'fetch-feedback-success';
      state.feedbackInfo = feedbackInfo;
    },
    success(state, message) {
      state.type = 'current-success';
      state.message = message;
    },
    error(state, message) {
      state.type = 'current-error';
      state.message = message;
    },
    clear(state) {
      state.type = '';
      state.message = '';
    },
  },
  getters: {
    getFeedbackInfo: state => state.feedbackInfo,
  },
};

export default current;
