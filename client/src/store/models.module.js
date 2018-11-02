import api from '@/services/api.service';

const models = {
  namespaced: true,
  state: {
    history: '',
    serviceModel: '',
  },
  actions: {
    async fetchHistoryListAsync({ commit }) {
      const response = await api.fetchHistoryList();
      if (response.status === 200) {
        const historyList = response.data;
        commit('fetchHistoryListSuccess', historyList);
      } else {
        console.log(response);
      }
    },
    async fetchServiceModelAsync({ commit }) {
      const response = await api.fetchServiceModel();
      if (response.status === 200) {
        const serviceModel = response.data;
        commit('fetchServiceModelSuccess', serviceModel);
      } else {
        console.log(response);
      }
    },
    async restartChangeModelAsync({ commit }, modelInfo) {
      const response = await api.restartChangeModel(modelInfo);
      if (response.status === 200) {
        const serviceModel = response.data;
        commit('fetchServiceModelSuccess', serviceModel);
      } else {
        console.log(response);
      }
    },
  },
  mutations: {
    fetchHistoryListSuccess(state, historyList) {
      state.history = historyList;
    },
    fetchServiceModelSuccess(state, serviceModel) {
      state.serviceModel = serviceModel;
    },
  },
  getters: {
    getHistoryList: state => state.history,
    getServiceModel: state => state.serviceModel,
  },
};

export default models;
