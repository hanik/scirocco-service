const status = {
  namespaced: true,
  state: {
    modelName: null,
    createDate: null,
    endDate: null,
    // TODO change value from hard coding
    itAdmin: 'icebar2002@gmail.com',
    legalAdmin: 'yclaw01@gmail.com',
  },
  actions: {
    setITAdmin({ commit }, user) {
      commit('setITAdminMutation', user);
    },
    setModelCreateInfo({ commit }, createInfo) {
      commit('setModelCreateInfoMutation', createInfo);
    },
  },
  mutations: {
    setITAdminMutation(state, user) {
      state.itAdmin = user.username;
    },
    setModelCreateInfoMutation(state, createInfo) {
      state.modelName = createInfo.modelName;
      state.createDate = createInfo.createDate;
    },
  },
  getters: {
    getITAdmin: state => state.itAdmin,
    getLegalAdmin: state => state.legalAdmin,
    getModelName: state => state.modelName,
    getCreateDate: state => state.createDate,
    getEndDate: state => state.endDate,
  },
};

export default status;
