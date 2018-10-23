/* eslint-disable no-restricted-syntax,consistent-return,no-underscore-dangle */
const fileHelper = require('../../helpers/file');
const shell = require('shelljs');
const { parsed } = require('dotenv').config();

const { BASE_PATH, FLASK_PATH, ENV } = parsed;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const MODEL_DIR = BASE_PATH + parsed.MODEL_DIR;
const DOCKER_DIR = BASE_PATH + parsed.DOCKER_DIR;

const restart = () => {
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
  shell.exec(restartRestCommand, { async: true });

  shell.cd(`${BASE_PATH}${FLASK_PATH}`);
  // const restartFlaskCommand = 'kill -kill $(lsof -t -i :10801); python api.py';
  const restartFlaskCommand = 'curl -X POST http://localhost:10801/shutdown; python api.py';
  shell.exec(restartFlaskCommand, { async: true });
};

module.exports = {
  restart,
};
