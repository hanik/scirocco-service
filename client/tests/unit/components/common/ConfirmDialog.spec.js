import { mount } from '@vue/test-utils';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

describe('ConfirmDialog.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ConfirmDialog, {
      propsData: {
        message: '다음 피드백 수집까지 기다리시겠습니까?',
      },
    });
  });
  it('emitted, when X button is clicked', () => {
    wrapper.find('.icon-close').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });
  it('emitted, when cancel button is clicked', () => {
    wrapper.find('#rbutton:first-child > div').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });
  it('emitted, when confirm button is clicked', () => {
    wrapper.find('#rbutton:last-child > div').trigger('click');

    expect(wrapper.emitted('confirm')).toBeTruthy();
  });
});
