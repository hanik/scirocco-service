/* eslint-disable no-restricted-syntax,consistent-return,no-underscore-dangle */
const shell = require('shelljs');
const fs = require('fs-extra');
const { parsed } = require('dotenv').config();
const db = require('../../helpers/db');

const { BASE_PATH, ENV } = parsed;
const DOCKER_DIR = BASE_PATH + parsed.DOCKER_DIR;
const FLASK_PATH = BASE_PATH + parsed.FLASK_PATH;

const REST_STARTED_OUTPUT = 'started on port(s) 6060';
const FLASK_STARTED_OUTPUT = 'Running on http://0.0.0.0:10801/';

let endCount = 0;
const _countProgress = (restartShell, startedText, modelInfo) => {
  restartShell.stdout.on('data', (data) => {
    if (data.indexOf(startedText) >= 0) {
      endCount += 1;
    }
    if (endCount === 2) {
      endCount = 0;
      const serviceModel = db.getServiceModel();
      if (!serviceModel || (modelInfo &&
        (modelInfo.seq !== serviceModel.seq
          || modelInfo.modelName !== serviceModel.modelName))) { // AV, CM
        _updateHistoryAndServiceInfo(modelInfo);
      }
    }
  });
};

const _updateHistoryAndServiceInfo = (modelInfo) => {
  Object.assign(modelInfo, { serviceYn: 'Y', serviceStartAt: new Date() });
  if (db.getCurrentState() === 51) {
    db.pushHistory(modelInfo);
    db.clearCurrentModel();
    db.setCurrentState(52);
  } else { // TODO: 이 경우에 대한 테스트가 필요함
    const { seq, modelName } = db.getServiceModel();
    db.updateHistory({ seq, modelName }, { serviceEndAt: new Date() });
  }
  db.setServiceModel(modelInfo);
};

const restart = (modelInfo) => {
  const modelPath = !modelInfo ? db.getServiceModel().path : modelInfo.path;

  shell.cd(DOCKER_DIR);
  const restartRestCommand = _getRestartRestCommand(modelPath);
  const restartRestShell = shell.exec(restartRestCommand, { async: true });
  _countProgress(restartRestShell, REST_STARTED_OUTPUT, modelInfo);

  shell.cd(DOCKER_DIR);
  const restartFlaskCommand = _getRestartFlaskCommand();
  const restartFlaskShell = shell.exec(restartFlaskCommand, { async: true });
  _countProgress(restartFlaskShell, FLASK_STARTED_OUTPUT, modelInfo);
};

const restartAfterVerify = () => {
  db.setCurrentState(51);
  const currentModel = db.getCurrentModel();
  _changeCurrentModelInEnv(currentModel.path);
  restart(currentModel);
};

// 모델이 변경되었을 때만 호출
const _changeCurrentModelInEnv = (currentModelPath) => {
  const FILENAME = `${FLASK_PATH}/.env`;
  const readedArray = fs.readFileSync(FILENAME).toString().split('\n');
  fs.removeSync(FILENAME);

  readedArray.forEach((line) => {
    if (!line) return;
    const keyValue = line.split('=');
    const key = keyValue[0].trim();
    let value = keyValue[1].trim();
    if (key === 'CURRENT_MODEL') {
      value = currentModelPath;
    }
    fs.outputFile(FILENAME, `${key}=${value}\n`, { flag: 'a' });
  });
};

const restartChangeModel = (modelInfo) => {
  _changeCurrentModelInEnv(modelInfo.path);
  restart(modelInfo);
};

function _getRestartRestCommand(currentModelPath) {
  return `export CURRENT_MODEL=${currentModelPath};
      docker-compose -f ${ENV}.server.enko.yml down;
      docker-compose -f ${ENV}.server.enko.yml up`;
}

function _getRestartFlaskCommand() {
  return `docker-compose -f ${ENV}.yc.yml down; docker-compose -f ${ENV}.yc.yml up`;
}

module.exports = {
  restart,
  restartChangeModel,
  restartAfterVerify,
};
