/* eslint-disable no-restricted-syntax,consistent-return,no-underscore-dangle */
const fileHelper = require('../../helpers/file');
const shell = require('shelljs');
const fs = require('fs-extra');
const { parsed } = require('dotenv').config();
const db = require('../../helpers/db');

const { BASE_PATH, ENV } = parsed;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const MODEL_DIR = BASE_PATH + parsed.MODEL_DIR;
const DOCKER_DIR = BASE_PATH + parsed.DOCKER_DIR;
const FLASK_PATH = BASE_PATH + parsed.FLASK_PATH;

let endCount = 0;
const _countProgress = (restartShell, startedText) => {
  restartShell.stdout.on('data', (data) => {
    if (data.indexOf(startedText) >= 0) {
      endCount += 1;
    }
    if (endCount === 2) {
      endCount = 0;
      db.setCurrentState(52);
    }
  });
};

const _changeCurrentModelInEnv = (currentModel) => {
  const FILENAME = `${BASE_PATH}${FLASK_PATH}/.env`;
  const readedArray = fs.readFileSync(FILENAME).toString().split('\n');
  fs.removeSync(FILENAME);

  readedArray.forEach((line) => {
    if (!line) return;
    const keyValue = line.split('=');
    const key = keyValue[0].trim();
    let value = keyValue[1].trim();
    if (key === 'CURRENT_MODEL') {
      value = currentModel;
    }
    fs.outputFile(FILENAME, `${key}=${value}\n`, { flag: 'a' });
  });
};

const restart = () => {
  db.setCurrentState(51);
  const sequence = fileHelper.getTrainingSequence(TRAINING_DIR);
  const modelDir = `${MODEL_DIR}/${sequence}/EnKo`;
  const currentModel = fileHelper.getLastModifiedFileNameInDir(modelDir);
  let currentModelPath = '20180717_2/EnKo/20180717_2_law-EnKo-model_epoch13_2.14_release.t7';
  if (ENV === 'prod') {
    currentModelPath = `${sequence}/EnKo/${currentModel}`;
  }

  shell.cd(DOCKER_DIR);
  const restartRestCommand = `export CURRENT_MODEL=${currentModelPath};
      docker-compose -f ${ENV}.server.en2ko.yml down;
      docker-compose -f ${ENV}.server.en2ko.yml up`;
  const restartRestShell = shell.exec(restartRestCommand, { async: true });
  _countProgress(restartRestShell, 'started on port(s) 6060');

  _changeCurrentModelInEnv(currentModelPath);

  shell.cd(`${DOCKER_DIR}`);
  const restartFlaskCommand = `docker-compose -f ${ENV}.yc.yml down; docker-compose -f ${ENV}.yc.yml up`;
  const restartFlaskShell = shell.exec(restartFlaskCommand, { async: true });
  _countProgress(restartFlaskShell, 'Running on http://0.0.0.0:10801/');
};

module.exports = {
  restart,
};
