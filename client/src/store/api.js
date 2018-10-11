import axios from 'axios';

const getFeedbackInfo = async () => {
  const returnValue = await axios.post('/api/current/feedback/info');
  // TODO
  /*
  보낼거
    token
  받을거
      totalCount: '29,300',
      currentCount: '5,000',
   */
  return returnValue;
};

const createModel = async () => {
  const returnValue = await axios.post('/api/current/feedback/create');
  // TODO
  /* 보낼거
  modelName 모델명: Sirocco-YC-v3
  createAt 생성일시:2018-09-17 20:00
  itAdmin 관리자(IT):icebar2002@gmail.com(service),
  legalAdmin 관리자 (legal): yclaw01@gmail.com,
   */
  return returnValue;
};


export default {
  getFeedbackInfo,
  createModel,
};
