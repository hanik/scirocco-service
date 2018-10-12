import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '@/services/api.service';


describe('api services', () => {
  let mock;
  let data;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    data = { response: true };
  });

  describe('success', () => {
    beforeEach(() => {
      mock.onPost('/api/current/feedback/info').reply(200, data);
    });

    // TODO. 같은 내용이지만 조금 다르게 작성된 두개의 테스트 이므로... 정리 하시오
    it('returns data when fetchFeedbackInfo is called', (done) => {
      api.fetchFeedbackInfo().then((res) => {
        expect(res).toEqual(data);
        done();
      });
    });

    it('returns data when fetchFeedbackInfo is called and success', async (done) => {
      const res = await api.fetchFeedbackInfo();

      expect(res).toEqual(data);
      done();
    });
  });

  describe('errors', () => {
    let spyConsoleLog;

    beforeEach(() => {
      spyConsoleLog = jest.spyOn(console, 'log');
      mock.onPost('/api/current/feedback/info').networkError();
    });

    // TODO. 같은 내용이지만 조금 다르게 작성된 두개의 테스트 이므로... 정리 하시오
    it('error when fetchFeedbackInfo is called', async (done) => {
      await api.fetchFeedbackInfo();

      expect(spyConsoleLog).toHaveBeenCalled();
      done();
    });

    it('error when fetchFeedbackInfo is called and fail', async (done) => {
      api.fetchFeedbackInfo().then((res) => {
        expect(spyConsoleLog).toHaveBeenCalledWith(res.message);
        done();
      });
    });
  });
});
