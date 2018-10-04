import { shallowMount } from '@vue/test-utils';
import Navigator from '@/components/navi/Navigator.vue';

const stubPush = jest.fn();
const $router = {
  push: stubPush,
};
const $route = {
  path: '/current/feedback',
};

describe('Navigator.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Navigator, { mocks: { $router, $route } });
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
