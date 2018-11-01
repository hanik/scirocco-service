import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '@/services/api.service';


describe('api services', () => {
  let mock;
  let response;
  const body = {};
  const mockResponse = { data: {} };

  beforeEach(() => {
    mock = new MockAdapter(axios);
    response = { data: {} };
  });

  describe('success', () => {
    it('returns data when fetchCurrentStatus is called and success', async () => {
      mock.onPost('/api/current/state').reply(200, mockResponse);
      const res = await api.fetchCurrentStatus();

      expect(res.data).toEqual(response);
    });

    it('returns data when fetchFeedbackInfo is called and success', async () => {
      mock.onPost('/api/current/feedback/info').reply(200, mockResponse);
      const res = await api.fetchFeedbackInfo();

      expect(res.data).toEqual(response);
    });

    it('returns data when createModel is called and success', async () => {
      mock.onPost('/api/current/feedback/create', body).reply(200, mockResponse);
      const res = await api.createModel(body);

      expect(res.data).toEqual(response);
    });

    it('returns data when fetchPrepareInfo is called and success', async () => {
      mock.onPost('/api/current/prepare/info').reply(200, mockResponse);
      const res = await api.fetchPrepareInfo();

      expect(res.data).toEqual(response);
    });

    it('returns data when prepareDataStart is called and success', async () => {
      mock.onPost('/api/current/prepare/start').reply(200, mockResponse);
      const res = await api.prepareDataStart();

      expect(res.data).toEqual(response);
    });

    it('returns data when fetchPrepareDataStatus is called and success', async () => {
      mock.onPost('/api/current/prepare/state').reply(200, mockResponse);
      const res = await api.fetchPrepareDataStatus();

      expect(res.data).toEqual(response);
    });
    it('returns data when prepareDataCancel is called and success', async () => {
      mock.onPost('/api/current/prepare/cancel').reply(200, mockResponse);
      const res = await api.prepareDataCancel();

      expect(res.data).toEqual(response);
    });
    it('returns data when trainingStart is called and success', async () => {
      mock.onPost('/api/current/training/start').reply(200, mockResponse);
      const res = await api.trainingStart();

      expect(res.data).toEqual(response);
    });
    it('returns data when trainingCancel is called and success', async () => {
      mock.onPost('/api/current/training/cancel').reply(200, mockResponse);
      const res = await api.trainingCancel();

      expect(res.data).toEqual(response);
    });
    it('returns data when fetchTrainingStatus is called and success', async () => {
      mock.onPost('/api/current/training/state').reply(200, mockResponse);
      const res = await api.fetchTrainingStatus();

      expect(res.data).toEqual(response);
    });
    it('returns data when confirmVerify is called and success', async () => {
      mock.onPost('/api/current/verify/confirm').reply(200, mockResponse);
      const res = await api.confirmVerify();

      expect(res.data).toEqual(response);
    });
    it('returns data when useVerifiedModel is called and success', async () => {
      mock.onPost('/api/current/verify/use').reply(200, mockResponse);
      const res = await api.useVerifiedModel();

      expect(res.data).toEqual(response);
    });
    it('returns data when noUseVerifiedModel is called and success', async () => {
      mock.onPost('/api/current/verify/no-use').reply(200, mockResponse);
      const res = await api.noUseVerifiedModel();

      expect(res.data).toEqual(response);
    });
    it('returns data when restartServiceStart is called and success', async () => {
      mock.onPost('/api/current/translation/restart').reply(200, mockResponse);
      const res = await api.restartServiceStart();

      expect(res.data).toEqual(response);
    });
    it('returns data when initCurrentStep is called and success', async () => {
      mock.onPost('/api/current/init').reply(200, mockResponse);
      const res = await api.initCurrentStep();

      expect(res.data).toEqual(response);
    });
    it('returns data when fetchHistoryList is called and success', async () => {
      mock.onPost('/api/models/list').reply(200, mockResponse);
      const res = await api.fetchHistoryList();

      expect(res.data).toEqual(response);
    });
    it('returns data when fetchServiceModel is called and success', async () => {
      mock.onPost('/api/models/service-model').reply(200, mockResponse);
      const res = await api.fetchServiceModel();

      expect(res.data).toEqual(response);
    });
  });

  describe('errors', () => {
    let spyConsoleLog;

    beforeEach(() => {
      spyConsoleLog = jest.spyOn(console, 'log');
      mock.onPost('/api/current/state').networkError();
    });

    it('error when fetchCurrentStatus is called and fail', async (done) => {
      api.fetchCurrentStatus().then((res) => {
        expect(spyConsoleLog).toHaveBeenCalledWith(res.message);
        done();
      });
    });
  });
});
