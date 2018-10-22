import api from '@/services/api.service';

const current = {
  namespaced: true,
  state: {
    currentStatusCode: -1,
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
    // 서버에서 현재 돌아가고 있는 상태가 있는지에 대한 코드를 받아옴
    async fetchCurrentStatusAsync({ dispatch }) {
      const currentStatus = await api.fetchCurrentStatus();
      dispatch('setCurrentStatusCode', currentStatus);
    },
    async fetchFeedbackInfoAsync({ commit }) {
      const feedbackInfo = await api.fetchFeedbackInfo();
      commit('fetchFeedbackInfoSuccess', feedbackInfo);
    },
    async createModelAsync({ dispatch, commit }, info) {
      const response = await api.createModel(info);
      if (response.status === 200) {
        commit('success', '');
        dispatch('setCurrentStatusCode', 20);
      } else {
        commit('error', '');
      }
    },
    async fetchPrepareInfoAsync({ dispatch, commit }) {
      const prepareInfo = await api.fetchPrepareInfo();
      commit('fetchPrepareInfoSuccess', prepareInfo);
    },
    async prepareDataStartAsync({ dispatch, commit }) {
      dispatch('setCurrentStatusCode', 21);
      const response = await api.prepareDataStart();
      if (response.status === 200) {
        commit('success', '');
      } else {
        // 에러나기 전 status code를 넣어주기
        dispatch('setCurrentStatusCode', 20);
        commit('error', '');
      }
    },
    async prepareDataCancelAsync({ dispatch, commit }) {
      const response = await api.prepareDataCancel();
      if (response.status === 200) {
        commit('success', '');
        dispatch('setCurrentStatusCode', 20);
      } else {
        commit('error', '');
      }
    },
    setCurrentStatusCode({ commit }, stepCode) {
      commit('setCurrentStatusCodeMutation', stepCode);
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
    setCurrentStatusCodeMutation(state, stepCode) {
      state.currentStatusCode = stepCode;
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
    getCurrentStatusCode: state => state.currentStatusCode,
    getFeedbackInfo: state => state.feedbackInfo,
    getPrepareInfo: state => state.prepareInfo,
    getVerityModelReportDatas: state => state.reportDatas,
    getVerityModelReportSummaries: state => state.reportSummaries,
  },
};

export default current;
