const StatusCode = {
  FinishGatherFeedback: {
    code: 20,
    step: 'step-prepateData',
    value: 'prepareData',
  },
  FinishPrepareData: {
    code: 21,
    step: 'step-prepareData',
    value: 'prepareData',
  },
  StartVerifyData: {
    code: 22,
    step: 'step-prepareData',
    value: 'prepareData',
  },
  FinishVerifyData: {
    code: 30,
    step: 'step-learning',
    value: 'learning',
  },
  StartPreprocessing: {
    code: 31,
    step: 'step-learning',
    value: 'learning',
  },
  FinishPreprocessing: {
    code: 32,
    step: 'step-learning',
    value: 'learning',
  },
  StartTraining: {
    code: 33,
    step: 'step-learning',
    value: 'learning',
  },
  FinishTraning: {
    code: 40,
    step: 'step-verifyModel',
    value: 'verifyModel',
  },
  SaveVerifyModel: {
    code: 41,
    step: '',
    value: '',
  },
  StartUpdateVerifiedModel: {
    code: 42,
    step: '',
    value: '',
  },
  FinishUpdateVerifiedModel: {
    code: 50,
    step: '',
    value: '',
  },
  StartRestartService: {
    code: 51,
    step: '',
    value: '',
  },
  FinishRestartService: {
    code: 52,
    step: '',
    value: '',
  },
};

export default StatusCode;
