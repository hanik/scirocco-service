import { createLocalVue, shallowMount } from '@vue/test-utils';
import StepperTabList from '@/components/current/StepperTabList.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

const stubPush = jest.fn();
const $router = {
  push: stubPush,
  history: {
    current: {
      name: 'some router name',
    },
  },
};

describe('StepperTabList.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: { 'current/getCurrentStatusCode': () => 10 },
    });
    wrapper = shallowMount(StepperTabList, { localVue, store, mocks: { $router } });
  });

  it('show stepper list, when rendered', () => {
    expect(wrapper.find('#stepper-tab-list').exists()).toBe(true);
  });

  it('show stepper class add and remove, when click stepper list', () => {
    wrapper.find('#stepper-tab-list > .step:last-child > div').trigger('click');
    expect(wrapper.find('#stepper-tab-list > .step:last-child > div.selected').exists()).toBe(true);
    expect(wrapper.find('#stepper-tab-list > .step:first-child > div.selected').exists()).toBe(false);

    wrapper.find('#stepper-tab-list > .step:first-child > div').trigger('click');
    expect(wrapper.find('#stepper-tab-list > .step:first-child > div.selected').exists()).toBe(true);
    expect(wrapper.find('#stepper-tab-list > .step:last-child > div.selected').exists()).toBe(false);
  });
});
