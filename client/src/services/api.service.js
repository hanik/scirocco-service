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

const fetchFeedbackInfo = async () => {
  const res = await axios.post('/api/current/feedback/info')
    .then(response => response.data)
    .catch(error => error);
  return res;
};

const createModel = async (info) => {
  info.modelInfo.createDate = new Date();
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

const prepareDataCancel = async () => {
  const res = await axios.post('/api/current/prepare/cancel')
    .then(response => response)
    .catch(error => error);
  return res;
};

export default {
  fetchFeedbackInfo,
  createModel,
  prepareDataStart,
  fetchPrepareInfo,
  prepareDataCancel,
};
