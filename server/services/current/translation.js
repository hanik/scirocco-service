/* eslint-disable no-restricted-syntax,consistent-return,no-underscore-dangle */
const fileHelper = require('../../helpers/file');
const shell = require('shelljs');
const { parsed } = require('dotenv').config();

const { BASE_PATH } = parsed;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const MODEL_DIR = BASE_PATH + parsed.MODEL_DIR;
const DOCKER_DIR = BASE_PATH + parsed.DOCKER_DIR;

const restart = () => {
  const sequence = fileHelper.getTrainingSequence(TRAINING_DIR);
  const modelDir = `${MODEL_DIR}/${sequence}/EnKo`;
  const currentModel = fileHelper.getLastModifiedFileNameInDir(modelDir);
  // const currentModelPath = `${sequence}/EnKo/${currentModel}`;
  const currentModelPath = '20180717_2/EnKo/20180717_2_law-EnKo-model_epoch13_2.14_release.t7';
  shell.cd(DOCKER_DIR);
  const restartServiceCommand = `export CURRENT_MODEL=${currentModelPath};
      docker-compose -f dev.server.en2ko.yml down;
      docker-compose -f dev.server.en2ko.yml up`;
  const restartService = shell.exec(restartServiceCommand, { async: true });
  restartService.stdout.on('end', () => {
    console.log('============================= restart end');
  });
};

module.exports = {
  restart,
};
