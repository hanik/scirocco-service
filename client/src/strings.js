const COMMONS = {
  ERROR_MESSAGE_MEMORY: '메모리 에러가 발생했습니다.\n' +
    '재시작 버튼을 클릭해주세요.',
  ERROR_MESSAGE_GENERAL: '에러가 발생했습니다.\n' +
    '관리자에게 문의해주세요.',
  LABEL_BRAND: 'YC-Admin',
  LABEL_CURRENT: 'Current',
  LABEL_HISTORY: 'History',
  LABEL_PROFILE: 'Profile',
  LABEL_SINGOUT: 'Sign out',
};

const CURRENT = {
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
  FEEDBACK_TOTAL: '누적 피드백',
  FEEDBACK_CURRENT: '진행 중인 피드백',
  FEEDBACK_COUNT: '건',
  FEEDBACK_VALUE_ZERO: '0',
  FEEDBACK_VALUE_FIVE_THOUSAND: '5000',
  FEEDBACK_VALUE_TEN_THOUSAND: '10000',
  PREPARE_DATA_LABEL_FEEDBACK: '피드백',
  PREPARE_DATA_LABEL_PREPARING: '건을 준비중입니다.',
  PREPARE_DATA_LABEL_CHECKING: '준비된 피드백을 검증 중입니다.',
  PREPARE_DATA_LABEL_DATA_PREPARE: 'Data 준비중…',
  PREPARE_DATA_LABEL_DATA_CHECKING: 'Data 검증중…',
  LEARNING_TRANSLATE_KO_EN: '한국어 원문을 영어로 번역중입니다.',
  LEARNING_TRANSLATE_EN_KO: '영어 원문을 한국어로 번역중입니다.',
  LEARNING_TRANSLATING: '번역중…',
  LEARNING_DATA_LEARNING: '번역 data를 학습중입니다.',
  VERIFY_MODEL_RESULT: '모델을 검증한 결과',
  VERIFY_MODEL_WAITING_MESSAGE: '검증할 모델을 기다리고 있습니다.',
  VERIFY_WAITING: '대기중',
  VERIFY_USE_MODEL_QUEST: '모델이 저장되었습니다.\n' +
    '현재 모델을 서비스에서 사용하시겠습니까?',
  LEARNING_LEARNING: '학습중…',
  VERIFY_UPDATING_MESSAGE: '모델을 서비스에 사용할 수 있도록\n' +
    '업데이트 중입니다.',
  VERIFY_UPDATING: '업데이트중…',
  RESTART_LABEL_NEED: '서버 업데이트를 위해 재시작이 필요합니다.',
  RESTART_LABEL_RESTARTING: '서버 업데이트를 위해 재시작 중입니다.',
  RESTART_LABEL_COMPLETE: '재시작이 완료되었습니다.\n History 메뉴에서도 확인 가능합니다.',
  RESTART_LABEL_INFO_BEFORE: '재시작 이후',
  RESTART_LABEL_INFO_AFTER: '모델이 서비스에 적용 됩니다.',
  RESTART_WAITING: '대기중',
  RESTART_RESTARTING: '재시작중…',
  RESTART_COMPLETE: '완료',
  POPUP_MODEL_CREATE: '모델 생성',
  POPUP_MODEL_NAME: '모델명',
  POPUP_MODEL_CREATE_DATE: '생성일시',
  POPUP_ADMIN_IT: '관리자(IT)',
  POPUP_ADMIN_LEGAL: '관리자(Legal)',
};

const HISTORY = {
  LABEL_SERVICE_MODEL: '서비스 중인 모델',
  BUTTON_MOVE_ARCHIVE: '아카이브 이동',
  BUTTON_CHANGE_MODEL: '기준 모델 변경',
  TABLE_MODEL_NAME: 'modelName',
  TABLE_START_DATE: 'startDate',
  TABLE_END_DATE: 'endDate',
  TABLE_IMPROVE: 'improve',
  TABLE_FIX: 'fix',
  TABLE_BASE: 'base',
  TABLE_ADMIN: 'admin',
  TABLE_VOLUME: 'volume',
  TABLE_HISTORY: 'history',
};

export {
  COMMONS,
  CURRENT,
  HISTORY,
};
