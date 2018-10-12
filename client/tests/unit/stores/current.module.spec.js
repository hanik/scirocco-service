import current from '@/store/current.module';
import api from '@/services/api.service';

/*
*  module testing
*    mutation, getter 는 단순 함수이므로 단순 테스트 한다.
*    action 의 내부에서 호출하는 타 모듈(함수)는 별도로 테스트 작성하고,
*      액션 내부에서는 spy 또는 stub 해서 테스트한다.
*/

describe('current module', () => {
  describe('mutations', () => {
    it('set message state when called success', () => {
      const { success } = current.mutations;
      const state = { message: '' };

      success(state, 'new message');

      expect(state.message).toBe('new message');
    });
  });

  describe('actions', () => {
    // jest.fn 으로 작성할 때
    it('commit success when call fetchFeedbackInfoAsync action', async () => {
      const commitSpy = jest.fn();
      api.fetchFeedbackInfo = jest.fn();

      const { fetchFeedbackInfoAsync } = current.actions;
      api.fetchFeedbackInfo.mockReturnValueOnce({ id: 11, name: 'unknown object' });

      expect.assertions(2);

      await fetchFeedbackInfoAsync({ commit: commitSpy });

      expect(api.fetchFeedbackInfo).toHaveBeenCalled();
      expect(commitSpy).toBeCalledWith('fetchFeedbackSuccess', { id: 11, name: 'unknown object' });

      api.fetchFeedbackInfo.mockRestore();
    });

    // jest.spyOn 으로 작성할 때
    it('commit success when call fetchFeedbackInfoAsync action', async () => {
      const commitSpy = jest.fn();
      const spyFetchFeedbackInfo = jest.spyOn(api, 'fetchFeedbackInfo');

      const { fetchFeedbackInfoAsync } = current.actions;
      spyFetchFeedbackInfo.mockReturnValueOnce({ id: 11, name: 'unknown object' });

      expect.assertions(2);

      await fetchFeedbackInfoAsync({ commit: commitSpy });

      expect(spyFetchFeedbackInfo).toHaveBeenCalled();
      expect(commitSpy).toBeCalledWith('fetchFeedbackSuccess', { id: 11, name: 'unknown object' });

      spyFetchFeedbackInfo.mockRestore();
    });
  });
});
