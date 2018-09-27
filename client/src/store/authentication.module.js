import { userService } from '../services';
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username });

      userService.login(username, password)
        .then(
          (user) => {
            commit('loginSuccess', user);
            dispatch('userState/statusBarVisible', null, { root: true })
            router.push('/');
          },
          (error) => {
            commit('loginFailure', error);
            dispatch('alert/error', error, { root: true });
          },
        );
    },
    logout({ dispatch, commit }) {
      userService.logout();
      commit('logout');
      dispatch('userState/statusBarInvisible', null, { root: true })
    },
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
  },
};

export default authentication;
