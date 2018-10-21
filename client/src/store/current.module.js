import api from '@/services/api.service';

const current = {
  namespaced: true,
  state: {
    currentStep: 'step-feedback',
    currentStepCode: '10',
    /*
      현재 진행중인 스탭, default는 step-feedback
      step-feedback, step-prepareData, step-learning, step-verifyModel,step-restartService
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
    // 삭제 예정(가라 데이터)
    reportDatas: [
      { ko: '한글 원본 구문이 여기있고', en: 'English something writing' },
      { ko: '매칭 되는 영어 번역 구문이 우측에 보입니다', en: 'English something writing' },
      { ko: '단어', en: 'Word' },
      { ko: '문장이 길어져서 여러줄이 되는 경우는 이렇게 적용 될 것 같습니다. 문장이 길어져서 여러줄이 되는 경우는 이렇게 적용 될 것 같습니다', en: 'Sentence Sentence Sentence Sentence Sentence Sentence. Sentence Sentence Sentence Sentence Sentence Sentence' },
      { ko: '**기본 Set에 대해 내용을 주시면 제가 여기에다가 써놓도록 할게요!', en: '**English something writing' },
      { ko: '**이전 결과에 대비해 새롭게 바뀐 번역은 이렇게 별도로 표시해주면 어떨까요?', en: '**English something writing. English something writing?', isNew: true },
      { ko: '**기본 Set에 대해 내용을 주시면 제가 여기에다가 써놓도록 할게요!', en: '**English something writing' },
    ],
    reportSummaries: [
      { categoryName: '이전 모델 대비\n개선도', percentage: 30 },
      { categoryName: '이전 모델 대비\n오류 감소', percentage: 30 },
      { categoryName: '이전 모델 대비\n개선도', percentage: 30 },
      { categoryName: '이전 모델 대비\n오류 감소', percentage: 30 },
    ],
  },
  actions: {
    async fetchFeedbackInfoAsync({ commit }) {
      const feedbackInfo = await api.fetchFeedbackInfo();
      commit('fetchFeedbackInfoSuccess', feedbackInfo);
    },
    async createModelAsync({ dispatch, commit }, info) {
      const response = await api.createModel(info);
      if (response.status === 200) {
        commit('success', '');
        console.log('44');
        dispatch('setCurrentStep', 'step-prepareData');
      } else {
        commit('error', '');
      }
    },
    async fetchPrepareInfoAsync({ dispatch, commit }) {
      const prepareInfo = await api.fetchPrepareInfo();
      dispatch('setCurrentStepCode', '20');
      commit('fetchPrepareInfoSuccess', prepareInfo);
    },
    async prepareDataStartAsync({ dispatch, commit }) {
      const response = await api.prepareDataStart();
      if (response.status === 200) {
        commit('success', '');
        console.log('20');
        dispatch('setCurrentStepCode', '21');
        //TODO change to code
        dispatch('setCurrentStep', 'step-prepareData');
      } else {
        commit('error', '');
      }
    },
    async prepareDataCancelAsync({ dispatch, commit }) {
      const response = await api.prepareDataCancel();
      if (response.status === 200) {
        commit('success', '');
        console.log('20');
        dispatch('setCurrentStepCode', '20');
        dispatch('setCurrentStep', 'step-prepareData');
      } else {
        commit('error', '');
      }
    },
    setCurrentStep({ commit }, step) {
      //코드 > string 변환 하나 추가 enum 같은거 - https://code.i-harness.com/ko-kr/q/4649f
      commit('setCurrentStepMutation', step);
    },
    
    setCurrentStepCode({ commit }, stepCode) {
      commit('setCurrentStepCodeMutation', stepCode);
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

    setCurrentStepCodeMutation(state, stepCode) {
      state.currentStepCode = stepCode;
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
    // 삭제 예정
    getCurrentStepCode: state => state.currentStepCode,
    getVerityModelReportDatas: state => state.reportDatas,
    getVerityModelReportSummaries: state => state.reportSummaries,
  },
};

export default current;
