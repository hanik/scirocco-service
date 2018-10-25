const db = require('../../helpers/db');
const training = require('./training');
const fileHelper = require('../../helpers/file');
const { parsed } = require('dotenv').config();

const { BASE_PATH } = parsed;
const TRAINING_DATA_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const MODEL_DIR = BASE_PATH + parsed.MODEL_DIR;

const confirm = () => {
  if (db.getCurrentState() === 40) {
    db.setCurrentState(41);
    return 'OK';
  }
  return 'FAIL';
};

const use = () => {
  if (db.getCurrentState() === 41) {
    const sequence = fileHelper.getTrainingSequence(TRAINING_DATA_DIR);
    const lang = training.getCurrentTrainingLanguage();
    const currentModelPath = `${MODEL_DIR}/${sequence}/${lang}`;

    const modelName = fileHelper.getLastModifiedFileNameInDir(currentModelPath);

    const model = db.getCurrentModel();
    model.path = `${currentModelPath.replace(`${MODEL_DIR}/`, '')}/${modelName}`;
    db.setCurrentModel(model);
    db.setCurrentState(50);
    return 'OK';
  }
  return 'FAIL';
};

module.exports = {
  confirm,
  use,
};
