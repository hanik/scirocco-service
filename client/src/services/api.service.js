import axios from 'axios';

const login = async () => {
  const res = await axios.post('/api/login');
  /*
  보낼 값 :
  id: test
  password: test
  받아올 값:
  token
  account(계정 정보) : icebar2002@gmail.com
  accountType : IT/Legal
   */
  return res;
};

const fetchCurrentStatus = async () => {
  const res = await axios.post('/api/current/state')
    .then(response => response.data)
    .catch(error => error);
  return res;
};

const fetchFeedbackInfo = async () => {
  const res = await axios.post('/api/current/feedback/info')
    .then(response => response.data)
    .catch(error => error);
  return res;
};

const createModel = async (info) => {
  const res = await axios.post('/api/current/feedback/create', info)
    .then(response => response)
    .catch(error => error);
  return res;
};

const fetchPrepareInfo = async () => {
  const res = await axios.post('/api/current/prepare/info')
    .then(response => response.data)
    .catch(error => error);
  return res;
};

const prepareDataStart = async () => {
  const res = await axios.post('/api/current/prepare/start')
    .then(response => response)
    .catch(error => error);
  return res;
};

const fetchPrepareDataStatus = async () => {
  const res = await axios.post('/api/current/prepare/state')
    .then(response => response)
    .catch(error => error);
  return res;
};

const prepareDataCancel = async () => {
  const res = await axios.post('/api/current/prepare/cancel')
    .then(response => response)
    .catch(error => error);
  return res;
};

const trainingStart = async () => {
  const res = await axios.post('/api/current/training/start')
    .then(response => response)
    .catch(error => error);
  return res;
};

const trainingCancel = async () => {
  const res = await axios.post('/api/current/training/cancel')
    .then(response => response)
    .catch(error => error);
  return res;
};

const fetchTrainingStatus = async () => {
  const res = await axios.post('/api/current/training/state')
    .then(response => response)
    .catch(error => error);
  return res;
};

const confirmVerify = async () => {
  const res = await axios.post('/api/current/verify/confirm')
    .then(response => response)
    .catch(error => error);
  return res;
};

const useVerifiedModel = async () => {
  const res = await axios.post('/api/current/verify/use')
    .then(response => response)
    .catch(error => error);
  return res;
};

const restartServiceStart = async () => {
  const res = await axios.post('/api/current/translation/restart')
    .then(response => response)
    .catch(error => error);
  return res;
};

const initCurrentStep = async () => {
  const res = await axios.post('/api/current/init')
    .then(response => response)
    .catch(error => error);
  return res;
};

const fetchHistory = async () => {
  const res = await axios.post('/api/models/list')
    .then(response => response)
    .catch(error => error);
  return res;
};

export default {
  fetchCurrentStatus,
  fetchFeedbackInfo,
  createModel,
  prepareDataStart,
  fetchPrepareInfo,
  prepareDataCancel,
  fetchPrepareDataStatus,
  trainingStart,
  trainingCancel,
  fetchTrainingStatus,
  confirmVerify,
  useVerifiedModel,
  restartServiceStart,
  initCurrentStep,
};
