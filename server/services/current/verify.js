/* eslint-disable no-underscore-dangle */
const db = require('../../helpers/db');
const training = require('./training');
const translation = require('./translation');
const fileHelper = require('../../helpers/file');
const { parsed } = require('dotenv').config();

const { BASE_PATH } = parsed;
const TRAINING_DATA_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const MODEL_DIR = BASE_PATH + parsed.MODEL_DIR;

const confirm = () => {
  if (db.getCurrentState() === 40) {
    // TODO: verifyResult > current model
    db.setCurrentState(41);
    return 'OK';
  }
  return 'FAIL';
};

const _setStateData = (serviceYn) => {
  if (db.getCurrentState() === 41) {
    if (serviceYn === 'Y') {
      translation.restartAfterVerify();
    } else {
      const sequence = fileHelper.getTrainingSequence(TRAINING_DATA_DIR);
      const lang = training.getCurrentTrainingLanguage();
      const currentModelPath = `${MODEL_DIR}/${sequence}/${lang}`;

      const modelName = fileHelper.getLastModifiedFileNameInDir(currentModelPath);
      const model = db.getCurrentModel();
      const path = `${sequence}/${lang}/${modelName}`;

      db.pushHistory(Object.assign(model, { path }));
      db.clearCurrentModel();
      db.setCurrentState(10);
    }
    return 'OK';
  }
  return 'FAIL';
};

const use = () => {
  _setStateData('Y');
};

const noUse = () => {
  _setStateData('N');
};

module.exports = {
  confirm,
  use,
  noUse,
};
