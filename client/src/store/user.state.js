const userState = {
  namespaced: true,
  state: {
    statusBarState: false,
  },
  actions: {
    statusBarVisible({ commit }) {
      commit('statusBarVisible');
    },
    statusBarInvisible({ commit }) {
      commit('statusBarInvisible');
    }
  },
  mutations: {
    statusBarVisible(state) {
      state.statusBarState = true;
    },
    statusBarInvisible(state) {
      state.statusBarState = false;
    }
  },
  getters: {
    getStatusBarVisibility: state => state.statusBarState
  }
};

export default userState;