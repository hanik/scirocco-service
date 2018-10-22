const StatusCode = [
  {
    code: 10,
    name: 'GatherFeedback',
    step: 'step-feedback',
    value: 'feedback',
  },
  {
    code: 11,
    name: 'FinishGatherFeedback',
    step: 'step-feedback',
    value: 'feedback',
  },
  {
    code: 20,
    name: 'PrepareData',
    step: 'step-prepareData',
    value: 'prepareData',
  },
  {
    code: 21,
    name: 'StartPrepareData',
    step: 'step-prepareData',
    value: 'prepareData',
  },
  {
    code: 22,
    name: 'FinishPrepareData',
    step: 'step-prepareData',
    value: 'prepareData',
  },
  {
    code: 30,
    name: 'Learning',
    step: 'step-learning',
    value: 'learning',
  },
  {
    code: 31,
    name: 'StartPreprocessing',
    step: 'step-learning',
    value: 'learning',
  },
  {
    code: 32,
    name: 'FinishPreprocessing',
    step: 'step-learning',
    value: 'learning',
  },
  {
    code: 33,
    name: 'StartTraining',
    step: 'step-learning',
    value: 'learning',
  },
  {
    code: 34,
    name: 'FinishTraining',
    step: 'step-learning',
    value: 'learning',
  },
  {
    code: 40,
    name: 'VerifyModelReport',
    step: 'step-verifyModel',
    value: 'verifyModel',
  },
  {
    code: 41,
    name: 'SavedVerifyModelReport',
    step: 'step-verifyModel',
    value: 'verifyModel',
  },
  {
    code: 42,
    name: 'StartUpdateVerifyModel',
    step: 'step-verifyModel',
    value: 'verifyModel',
  },
  {
    code: 43,
    name: 'FinishUpdateVerifyModel',
    step: 'step-verifyModel',
    value: 'verifyModel',
  },
  {
    code: 50,
    name: 'RestartService',
    step: 'step-restartService',
    value: 'restartService',
  },
  {
    code: 51,
    name: 'StartRestartService',
    step: 'step-restartService',
    value: 'restartService',
  },
  {
    code: 52,
    name: 'FinishRestartService',
    step: 'step-restartService',
    value: 'restartService',
  },
];

const getCodeStep = (code) => {
  return StatusCode.find(item => item.code === code).step;
};

export default {
  StatusCode,
  getCodeStep,
};
