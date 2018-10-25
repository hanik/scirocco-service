import current from '@/store/current.module';
import api from '@/services/api.service';

/*
*  module testing
*    mutation, getter 는 단순 함수이므로 단순 테스트 한다.
*    action 의 내부에서 호출하는 타 모듈(함수)는 별도로 테스트 작성하고,
*      액션 내부에서는 spy 또는 stub 해서 테스트한다.
*/

describe('current module', () => {
  describe('getters', () => {
    it('get feedbackInfo when call getFeedbackInfo', () => {
      const { getFeedbackInfo } = current.getters;
      const state = { feedbackInfo: 'last feedback info' };

      expect(getFeedbackInfo(state)).toBe('last feedback info');
    });

    it('get prepareInfo when call getPrepareInfo', () => {
      const { getPrepareInfo } = current.getters;
      const state = { prepareInfo: 'last prepare info' };

      expect(getPrepareInfo(state)).toBe('last prepare info');
    });
  });

  describe('mutations', () => {
    it('set feedbackInfo state when called fetchFeedbackInfoSuccess', () => {
      const { fetchFeedbackInfoSuccess } = current.mutations;
      const state = { feedbackInfo: '' };

      fetchFeedbackInfoSuccess(state, 'new feedbackInfo');

      expect(state.feedbackInfo).toBe('new feedbackInfo');
    });
    it('set prepareInfo state when called fetchPrepareInfoSuccess', () => {
      const { fetchPrepareInfoSuccess } = current.mutations;
      const state = { prepareInfo: '' };

      fetchPrepareInfoSuccess(state, 'new prepareInfo');

      expect(state.prepareInfo).toBe('new prepareInfo');
    });
  });

  describe('actions', () => {
    let commitSpy;

    beforeEach(() => {
      commitSpy = jest.fn();
    });

    it('commit fetchFeedbackInfoSuccess when call fetchFeedbackInfoAsync action', async () => {
      const spyFetchFeedbackInfo = jest.spyOn(api, 'fetchFeedbackInfo');

      const { fetchFeedbackInfoAsync } = current.actions;
      spyFetchFeedbackInfo.mockReturnValueOnce({ id: 11, name: 'unknown object' });

      expect.assertions(2);

      await fetchFeedbackInfoAsync({ commit: commitSpy });

      expect(spyFetchFeedbackInfo).toHaveBeenCalled();
      expect(commitSpy).toBeCalledWith('fetchFeedbackInfoSuccess', { id: 11, name: 'unknown object' });

      spyFetchFeedbackInfo.mockRestore();
    });

    it('commit fetchPrepareInfoSuccess when call fetchPrepareInfoAsync action', async () => {
      const spyFetchPrepareInfo = jest.spyOn(api, 'fetchPrepareInfo');

      const { fetchPrepareInfoAsync } = current.actions;
      spyFetchPrepareInfo.mockReturnValueOnce({ id: 11, name: 'unknown object' });

      expect.assertions(2);

      await fetchPrepareInfoAsync({ commit: commitSpy });

      expect(spyFetchPrepareInfo).toHaveBeenCalled();
      expect(commitSpy).toBeCalledWith('fetchPrepareInfoSuccess', { id: 11, name: 'unknown object' });

      spyFetchPrepareInfo.mockRestore();
    });
  });
});
