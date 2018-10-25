import { shallowMount, createLocalVue } from '@vue/test-utils';
import Navigator from '@/components/navi/Navigator.vue';
import Vuex from 'vuex';

const stubPush = jest.fn();
const $router = {
  push: stubPush,
};
const $route = {
  path: '/current/feedback',
};
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Navigator.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: { 'authentication/isLogin': () => true },
    });
    wrapper = shallowMount(Navigator, { localVue, store, mocks: { $router, $route } });
  });

  describe('lifecycle methods', () => {
    it('set clickedMenu value when mounted', () => {
      expect(wrapper.vm.clickedMenu).toBe('current');
    });
  });

  describe('trigger events', () => {
    it('call router.push when current/history menu is clicked', () => {
      wrapper.findAll('.menu').at(1).trigger('click');

      expect(stubPush).toHaveBeenCalledWith('/history');
    });
  });
});
