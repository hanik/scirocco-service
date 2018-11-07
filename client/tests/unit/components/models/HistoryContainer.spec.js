import { shallowMount, createLocalVue } from '@vue/test-utils';
import HistoryContainer from '@/components/models/HistoryContainer.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HistoryContainer.vue', () => {
  let store;
  let wrapper;

  const spyFetchHistoryListAsync = jest.fn();
  const spyFetchServiceModelAsync = jest.fn();

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        'models/fetchHistoryListAsync': spyFetchHistoryListAsync,
        'models/fetchServiceModelAsync': spyFetchServiceModelAsync,
      },
      getters: {
        'models/getHistoryList': () => ([]),
      },
    });

    wrapper = shallowMount(HistoryContainer, { localVue, store });
  });

  describe('lifecycle', () => {
    it('call fetchHistoryListAsync, fetchServiceModelAsync actions when mounted', () => {
      expect(spyFetchHistoryListAsync).toHaveBeenCalled();
      expect(spyFetchServiceModelAsync).toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    it('push 1 and 2 to selectedItemsIndex when selected called with 1 and 2', () => {
      wrapper.vm.selected(1);
      expect(wrapper.vm.selectedItemsIndex).toEqual([1]);

      wrapper.vm.selected(2);
      expect(wrapper.vm.selectedItemsIndex).toEqual([1, 2]);
    });

    it('pop 1 to selectedItemsIndex when selected called with 1 again', () => {
      wrapper.vm.selected(1);
      wrapper.vm.selected(2);
      wrapper.vm.selected(1);

      expect(wrapper.vm.selectedItemsIndex).toEqual([2]);
    });
  });
});
