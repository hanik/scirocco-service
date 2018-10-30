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
      mock.onPost('/api/current/feedback/create', { modelInfo: { createData: {} } }).reply(200, data);
      mock.onPost('/api/current/prepare/info').reply(200, data);
      mock.onPost('/api/current/prepare/start').reply(200, data);
    });

    it('returns data when fetchFeedbackInfo is called and success', async (done) => {
      const res = await api.fetchFeedbackInfo();

      expect(res).toEqual(data);
      done();
    });

    it('returns data when createModel is called and success', async (done) => {
      const res = await api.createModel({ modelInfo: { createData: {} } });

      expect(res).toEqual(data);
      done();
    });

    it('returns data when fetchPrepareInfo is called and success', async (done) => {
      const res = await api.fetchPrepareInfo();

      expect(res).toEqual(data);
      done();
    });

    it('returns data when prepareDataStart is called and success', async (done) => {
      const res = await api.prepareDataStart();

      expect(res).toEqual(data);
      done();
    });
  });

  describe('errors', () => {
    // let spyConsoleLog;
    //
    // beforeEach(() => {
    //   spyConsoleLog = jest.spyOn(console, 'log');
    //   mock.onPost('/api/current/feedback/info').networkError();
    // });
    //
    // it('error when fetchFeedbackInfo is called and fail', async (done) => {
    //   api.fetchFeedbackInfo().then((res) => {
    //     expect(spyConsoleLog).toHaveBeenCalledWith(res.message);
    //     done();
    //   });
    // });
  });
});
