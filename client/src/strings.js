const STRING_COMMONS = {
  ERROR_MESSAGE_MEMORY: '메모리 에러가 발생했습니다.\n' +
    '재시작 버튼을 클릭해주세요.',
  ERROR_MESSAGE_GENERAL: '에러가 발생했습니다.\n' +
    '관리자에게 문의해주세요.',

};

const STRING_CURRENT = {
  STEP_FEEDBACK: '피드백 수집',
  STEP_PREPARE_DATA: 'Data 준비 / 검증',
  STEP_LEARNING: '학습과 적용',
  STEP_VERIFY_MODEL: '모델 검증',
  STEP_RESTART_SERVICE: '서비스 재시작',
  STEP_FEEDBACK_DESCRIPTION: '플러그인을 통해 피드백을 수집하는 중입니다.\n' +
    '새로운 모델 생성 작업을 시작하시려면 ‘모델 생성’ 버튼을 클릭해 진행해주세요.',
  STEP_PREPARE_DATA_DESCRIPTION: '수집된 피드백을 정제된 data로 만드는 과정입니다.\n' +
    '작업 완료 후에는 자동으로 다음 프로세스를 진행합니다.',
  STEP_LEARNING_DESCRIPTION: '검증된 데이터를 엔진에 학습하고 적용하는 단계입니다.\n' +
    '작업 완료 후에는 담당자에게 알림 메일을 보냅니다.',
  STEP_VERIFY_MODEL_DESCRIPTION: '학습과 적용이 완료된 모델을 검증하는 단계입니다.',
  STEP_RESTART_SERVICE_DESCRIPTION: '새로운 모델을 서버에 업데이트 하기 위해 서비스를 재시작합니다.\n' +
    '작업 완료 후에는 담당자에게 알림을 보냅니다.',
};

const STRING_HISTORY = {

};

export {
  STRING_COMMONS,
  STRING_CURRENT,
  STRING_HISTORY,
};
