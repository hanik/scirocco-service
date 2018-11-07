import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import GatherFeedback from '@/components/current/subcontents/GatherFeedback.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('GatherFeedback.vue', () => {
  let wrapper;
  let store;

  const actions = {
    'current/fetchFeedbackInfoAsync': jest.fn(),
  };

  let getters = {
    'current/getFeedbackInfo': () => ({ progressCount: 2, totalCount: 10 }),
    'current/getCurrentStatusCode': () => 10,
    'status/getCurrentModelStatus': () => ({
      modelName: null,
      createDate: null,
      endDate: null,
      itAdmin: 'icebar2002@gmail.com',
      legalAdmin: 'yclaw01@gmail.com',
    }),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      actions,
      getters,
    });
    wrapper = mount(GatherFeedback, { localVue, store });
  });

  describe('lifecycle', () => {
    it('fetchFeedbackInfoAsync should be called when component mounted', () => {
      expect(actions['current/fetchFeedbackInfoAsync']).toHaveBeenCalled();
    });

    it('must exist feedbackInfo value when component mounted', () => {
      expect(wrapper.vm.feedbackInfo).toEqual({ progressCount: 2, totalCount: 10 });
    });
  });

  describe('methods', () => {
    it('popupVisibility should be true when call openPopup ', () => {
      wrapper.vm.openPopup();

      expect(wrapper.find('#create-model-popup-area').isVisible()).toBe(true);
    });

    it('popupVisibility should be false when call closePopup ', () => {
      wrapper.vm.closePopup();

      expect(wrapper.find('#create-model-popup-area').isVisible()).toBe(false);
    });
  });

  describe('computed', () => {
    it('displayFeedbackInfo should return 0 when feedbackInfo state is empty', () => {
      expect(wrapper.vm.displayFeedbackInfo).toBe(20);
    });

    it('displayFeedbackInfo should return 0 when feedbackInfo state is empty', () => {
      getters = {
        'current/getFeedbackInfo': () => ({}),
        'current/getCurrentStatusCode': () => 10,
      };
      store = new Vuex.Store({ actions, getters });
      wrapper = shallowMount(GatherFeedback, { localVue, store });

      expect(wrapper.vm.displayFeedbackInfo).toBe(0);
    });
  });
});
