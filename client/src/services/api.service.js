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
  // TODO modelInfo 를 실제 정보와 동일하게 보내도록 정리하기
  // const  modelInfo = {
  //   modelName: 'Sirocco-YC-v3',
  //   createDate: new Date(),
  // };
  info.modelInfo.createDate = new Date();
  const res = await axios.post('/api/current/feedback/create', info)
    .then(response => response)
    .catch(error => error);
  console.log(res)
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

export default {
  fetchFeedbackInfo,
  createModel,
  prepareDataStart,
  fetchPrepareInfo,
};
