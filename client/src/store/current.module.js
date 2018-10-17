import api from '@/services/api.service';

const current = {
  namespaced: true,
  state: {
    currentStep: 'step-feedback',
    /*
      현재 진행중인 스탭, default는 step-feedback
      step-feedback, step-prepareData, step-prepareData, step-verifyModel,step-restartService
     */
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
    async createModelAsync({ dispatch, commit }, modelInfo) {
      dispatch('setCurrentStep', 'step-prepareData')

      // TODO 주석 해제
      // const response = await api.createModel(modelInfo);
      // if(response.data == 'success') {
      //   commit('success', '');
      //   // 모델 생성 버튼 클릭 후, 서버에서 모델 생성이 되었다는 success표시가 온 경우
      //   dispatch('setCurrentStep', 'step-prepareData')
      // } else {
      //   commit('error', '')
      // }
    },
    async fetchPrepareInfoAsync({ commit }) {
      const prepareInfo = await api.fetchPrepareInfo();
      commit('fetchPrepareInfoSuccess', prepareInfo);
    },
    async prepareDataStartAsync({ commit }) {
      await api.prepareDataStart();
      commit('success', '');
    },
    setCurrentStep({ commit }, step) {
      commit('setCurrentStepMutation', step);
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
    setCurrentStepMutation(state, step) {
      state.currentStep = step;

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
    getCurrentStep: state => state.currentStep,
    getFeedbackInfo: state => state.feedbackInfo,
    getPrepareInfo: state => state.prepareInfo,
  },
};

export default current;
