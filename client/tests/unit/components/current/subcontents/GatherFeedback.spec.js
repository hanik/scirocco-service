import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import GatherFeedback from '@/components/current/subcontents/GatherFeedback.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('GatherFeedback.vue', () => {
  let wrapper;
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      'current/fetchFeedbackInfoAsync': jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      getters: {
        'current/getFeedbackInfo': () => ({ processCount: 2, totalCount: 19 }),
      },
    });
    wrapper = mount(GatherFeedback, { localVue, store });
  });

  describe('lifecycle', () => {
    it('fetchFeedbackInfoAsync should be called when component mounted', () => {
      expect(actions['current/fetchFeedbackInfoAsync']).toHaveBeenCalled();
    });

    it('must exist feedbackInfo value when component mounted', () => {
      expect(wrapper.vm.feedbackInfo).toEqual({ processCount: 2, totalCount: 19 });
    });
  });

  describe('events', () => {
    it('should open popup when create feedback button clicked', () => {
      // TODO
      // console.log(wrapper.find('#content-feedback').html());
      // wrapper.findAll('#rbutton').at(1).trigger('button-clicked');
      // wrapper.findAll('#rbutton > div').at(1).trigger('click');

      // console.log(wrapper.find('.buttons').html());
      // expect(wrapper.vm.popupVisibility).toBe(true);

      // mount 해도 child 의 child component 의 이벤트 까지는 바인딩 안하나 보다.....
      // 테스트 불가 ?!
    });
  });
});
