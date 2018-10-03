import { shallowMount } from '@vue/test-utils';
import StepperTabList from '@/components/current/StepperTabList.vue';

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
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(StepperTabList, { mocks: { $router } });
  });

  it('show stepper list, when rendered', () => {
    expect(wrapper.find('#stepper-tab-list').exists()).toBe(true);
  });

  it('show stepper class add and remove, when click stepper list', () => {
    wrapper.find('#stepper-tab-list > .step:last-child > div').trigger('click');
    expect(wrapper.find('#stepper-tab-list > .step:last-child > div.current').exists()).toBe(true);
    expect(wrapper.find('#stepper-tab-list > .step:first-child > div.current').exists()).toBe(false);

    wrapper.find('#stepper-tab-list > .step:first-child > div').trigger('click');
    expect(wrapper.find('#stepper-tab-list > .step:first-child > div.current').exists()).toBe(true);
    expect(wrapper.find('#stepper-tab-list > .step:last-child > div.current').exists()).toBe(false);
  });
});
