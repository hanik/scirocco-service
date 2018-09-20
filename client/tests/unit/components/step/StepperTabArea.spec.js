import { shallowMount, createLocalVue } from '@vue/test-utils';
import StepperTabArea from '@/components/step/StepperTabArea.vue';

import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('StepperTabArea.vue', () => {
  it('show stepper list, when rendered', () => {
    const wrapper = shallowMount(StepperTabArea, { localVue });

    expect(wrapper.find('#stepper-tab-area > div').exists()).toBe(true);
  });
});
