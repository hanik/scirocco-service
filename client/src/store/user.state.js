const userState = {
  namespaced: true,
  state: {
    statusBarState: false,
  },
  actions: {
    statusBarVisible({ commit }) {
      console.log("??????")
      commit('statusBarVisible');
    },
    statusBarInvisible({ commit }) {
      commit('statusBarInvisible');
    }
  },
  mutations: {
    statusBarVisible(state) {
      console.log("~!~~~~~")

      state.statusBarState = true;
    },
    statusBarInvisible(state) {
      state.statusBarState = false;
    }
  },
};

export default userState;