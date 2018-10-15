const status = {
  namespaced: true,
  state: {
    modelName: null,
    createDate: null,
    endDate: null,
    // TODO change value from hardcoding
    itAdmin: 'icebar2002@gmail.com',
    legalAdmin: 'yclaw01@gmail.com',
    currentStep: null,
  },
  actions: {
    success({ commit }, message) {
      commit('success', message);
    },
    error({ commit }, message) {
      commit('error', message);
    },
    clear({ commit }, message) {
      commit('success', message);
    },
    setITAdmin({ commit }, user) {
      commit('setITAdminMutation', user);
    },
    setModelCreateInfo({ commit }, createInfo) {
      commit('setModelCreateInfoMutation', createInfo);
    },
    setCurrentStep({ commit }, message) {
      commit('setCurrentStepMutation', message);
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
    setITAdminMutation(state, user) {
      state.itAdmin = user.username;
    },
    setModelCreateInfoMutation(state, createInfo) {
      state.modelName = createInfo.modelName;
      state.createDate = createInfo.createDate;
    },
    setCurrentStepMutation(state, message) {
      state.currentStep = message;
    }
  },
  getters: {
    getITAdmin: state => state.itAdmin,
    getLegalAdmin: state => state.legalAdmin,
    getModelName: state => state.modelName,
    getCreateDate: state => state.createDate,
    getEndDate: state => state.endDate,
  }
};

export default status;
