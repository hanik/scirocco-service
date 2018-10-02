import { shallowMount, createLocalVue } from '@vue/test-utils';
import CurrentStatus from '@/components/current/CurrentStatus.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('StepperTabArea.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: { 'authentication/isLogin': () => true },
    });
  });

  it('show status-container when user is login', () => {
    wrapper = shallowMount(CurrentStatus, { localVue, store });

    expect(wrapper.find('.status-container').exists()).toBe(true);
  });

  it('no-show status-container when user is logout', () => {
    store = new Vuex.Store({
      getters: { 'authentication/isLogin': () => false },
    });

    wrapper = shallowMount(CurrentStatus, { localVue, store });

    expect(wrapper.find('.status-container').exists()).toBe(false);
  });
});
