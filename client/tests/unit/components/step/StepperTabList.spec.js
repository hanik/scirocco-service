import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
// import jest from 'jest-mock';
import StepperTabList from '@/components/current/StepperTabList.vue';

const stubPush = sinon.stub();
const $router = {
  push: stubPush,
};

describe('StepperTabList.vue', () => {
  it('show stepper list, when rendered', () => {
    const wrapper = shallowMount(StepperTabList);

    expect(wrapper.find('#stepper-tab-list').exists()).toBe(true);
  });

  it('show stepper class add and remove, when click stepper list', () => {
    const wrapper = shallowMount(StepperTabList, { mocks: { $router } });

    wrapper.find('#stepper-tab-list > .step:last-child > div').trigger('click');
    expect(wrapper.find('#stepper-tab-list > .step:last-child > div.current').exists()).toBe(true);
    expect(wrapper.find('#stepper-tab-list > .step:first-child > div.current').exists()).toBe(false);

    wrapper.find('#stepper-tab-list > .step:first-child > div').trigger('click');
    expect(wrapper.find('#stepper-tab-list > .step:first-child > div.current').exists()).toBe(true);
    expect(wrapper.find('#stepper-tab-list > .step:last-child > div.current').exists()).toBe(false);
  });
});
