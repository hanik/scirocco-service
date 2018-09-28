import { shallowMount } from '@vue/test-utils';
import RButton from '@/components/common/RButton.vue';

describe('RButton.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RButton, {
      propsData: {
        type: 'primary',
        title: 'button',
        width: 120,
      },
    });
  });
  it('emitted, when button is primary type and clicked', () => {
    wrapper.setProps({ type: 'primary' });
    wrapper.find('#rbutton > div').trigger('click');

    expect(wrapper.emitted('button-clicked')).toBeTruthy();
  });
  it('emit is undefined, when button is disabled type and clicked', () => {
    wrapper.setProps({ type: 'disabled' });
    wrapper.find('#rbutton > div').trigger('click');

    expect(wrapper.emitted('button-clicked')).toBeUndefined();
  });

  it('primary attribute exist, when button is primary type', () => {
    wrapper.setProps({ type: 'primary' });
    expect(wrapper.find('#rbutton > div.primary').exists()).toBe(true);
  });
});
