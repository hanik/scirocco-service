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
    .then((response) => {
      // console.log('response: ', response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
  // TODO
  /*
  보낼거
    token
  받을거
      totalCount: '29,300',
      progressCount: '5,000',
   */
  return res;
};

const createModel = async () => {
  const res = await axios.post('/api/current/feedback/create');
  // TODO
  /* 보낼거
  modelName 모델명: Sirocco-YC-v3
  createDate 생성일시:2018-09-17 20:00
  itAdmin 관리자(IT):icebar2002@gmail.com(service),
  legalAdmin 관리자 (legal): yclaw01@gmail.com,
   */
  return res;
};


export default {
  fetchFeedbackInfo,
  createModel,
};
