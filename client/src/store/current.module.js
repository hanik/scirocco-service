import api from '@/services/api.service';

const current = {
  namespaced: true,
  state: {
    type: null, // TODO 이것은 무슨 용도?
    message: null,
    feedbackTotal: -1,
    feedbackCurrent: -1,
    feedbackInfo: {
      progressCount: 0,
      totalCount: 0,
    },
    prepareInfo: {
      totalCount: 0,
    },
  },
  actions: {
    async fetchFeedbackInfoAsync({ commit }) {
      const feedbackInfo = await api.fetchFeedbackInfo();
      commit('fetchFeedbackInfoSuccess', feedbackInfo);
    },
    async createModelAsync({ commit }, modelInfo) {
      await api.createModel(modelInfo);
      commit('success', '');
    },
    async fetchPrepareInfoAsync({ commit }) {
      const prepareInfo = await api.fetchPrepareInfo();
      commit('fetchPrepareInfoSuccess', prepareInfo);
    },
    async prepareDataStartAsync({ commit }) {
      await api.prepareDataStart();
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
    fetchFeedbackInfoSuccess(state, feedbackInfo) {
      state.type = 'fetch-feedback-info-success';
      state.feedbackInfo = feedbackInfo;
    },
    fetchPrepareInfoSuccess(state, prepareInfo) {
      state.type = 'fetch-prepare-info-success';
      state.prepareInfo = prepareInfo;
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
    getPrepareInfo: state => state.prepareInfo,
  },
};

export default current;
