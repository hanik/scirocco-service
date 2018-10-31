import api from '@/services/api.service';

const current = {
  namespaced: true,
  state: {
    currentStatusCode: -1,
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
    // 서버에서 현재 돌아가고 있는 상태가 있는지에 대한 코드를 받아옴
    async fetchCurrentStatusAsync({ dispatch }) {
      const currentStatus = await api.fetchCurrentStatus();
      dispatch('setCurrentStatusCode', currentStatus);
    },
    async fetchFeedbackInfoAsync({ commit }) {
      const feedbackInfo = await api.fetchFeedbackInfo();
      commit('fetchFeedbackInfoSuccess', feedbackInfo);
    },
    async createModelAsync({ dispatch }, info) {
      const response = await api.createModel(info);
      if (response.status === 200) {
        dispatch('setCurrentStatusCode', 20);
      } else {
        console.log(response);
      }
    },
    async fetchPrepareInfoAsync({ commit }) {
      const prepareInfo = await api.fetchPrepareInfo();
      commit('fetchPrepareInfoSuccess', prepareInfo);
    },
    async prepareDataStartAsync({ dispatch }) {
      dispatch('setCurrentStatusCode', 21);
      const response = await api.prepareDataStart();
      if (response.status === 200) {
      } else {
        dispatch('setCurrentStatusCode', 20);
        console.log(response);
      }
    },
    async prepareDataCancelAsync({ dispatch }) {
      const response = await api.prepareDataCancel();
      if (response.status === 200) {
        dispatch('setCurrentStatusCode', 20);
      } else {
        console.log(response);
      }
    },
    async trainingStartAsync({ dispatch }) {
      dispatch('setCurrentStatusCode', 31);
      const response = await api.trainingStart();
      if (response.status === 200) {
      } else {
        dispatch('setCurrentStatusCode', 30);
        console.log(response);
      }
    },
    async trainingCancelAsync({ dispatch }) {
      const response = await api.trainingCancel();
      if (response.status === 200) {
        dispatch('setCurrentStatusCode', 31);
      } else {
        console.log(response);
      }
    },
    async confirmVerifyAsync({ dispatch }) {
      const response = await api.confirmVerify();
      if (response.status === 200) {
        dispatch('setCurrentStatusCode', 41);
      } else {
        console.log(response);
      }
    },
    async useVerifiedModelAsync({ dispatch }) {
      const response = await api.useVerifiedModel();
      if (response.status === 200) {
        dispatch('fetchCurrentStatusAsync');
      } else {
        console.log(response);
      }
    },
    async noUseVerifiedModelAsync({ dispatch }) {
      const response = await api.noUseVerifiedModel();
      if (response.status === 200) {
        dispatch('fetchCurrentStatusAsync');
      } else {
        console.log(response);
      }
    },
    async restartServiceStartAsync() {
      const response = await api.restartServiceStart();
      if (response.status === 200) {
      } else {
        console.log(response);
      }
    },
    async initCurrentStepAsync({ dispatch }) {
      const response = await api.initCurrentStep();
      if (response.status === 200) {
        dispatch('setCurrentStatusCode', 10);
      } else {
        console.log(response);
      }
    },
    setCurrentStatusCode({ commit }, stepCode) {
      commit('setCurrentStatusCodeMutation', stepCode);
    },
  },
  mutations: {
    fetchFeedbackInfoSuccess(state, feedbackInfo) {
      state.feedbackInfo = feedbackInfo;
    },
    fetchPrepareInfoSuccess(state, prepareInfo) {
      state.prepareInfo = prepareInfo;
    },
    setCurrentStatusCodeMutation(state, stepCode) {
      state.currentStatusCode = stepCode;
    },
  },
  getters: {
    getCurrentStatusCode: state => state.currentStatusCode,
    getFeedbackInfo: state => state.feedbackInfo,
    getPrepareInfo: state => state.prepareInfo,
    getVerityModelReportDatas: state => state.reportDatas,
    getVerityModelReportSummaries: state => state.reportSummaries,
  },
};

export default current;
