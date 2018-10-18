/* eslint-disable no-underscore-dangle */
const fs = require('fs-extra');
const readline = require('readline');
const fileHelper = require('../../helpers/file');
const db = require('../../helpers/db');
const luxon = require('luxon');
const { parsed } = require('dotenv').config();

const { BASE_PATH } = parsed;
const FEEDBACK_DIR = BASE_PATH + parsed.FEEDBACK_DIR;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const DEFAULT_DIR = BASE_PATH + parsed.DATA_DEFAULT_DIR;
const OLD_DIR = BASE_PATH + parsed.DATA_OLD_DIR;

const _backupOldTrainingRaws = () => {
  const files = fs.readdirSync(TRAINING_DIR);
  files.forEach((fileName) => {
    if (!fileName.startsWith('.')) {
      fs.moveSync(`${TRAINING_DIR}/${fileName}`, `${OLD_DIR}/${fileName}`);
    }
  });
};

const _moveDefaultToTrainingDir = () => {
  const sequence = luxon.DateTime.local().toFormat('yyyyMMdd_HHmmss');
  const files = fs.readdirSync(DEFAULT_DIR);
  files.forEach((fileName) => {
    if (!fileName.startsWith('.')) {
      fs.copySync(`${DEFAULT_DIR}/${fileName}`, `${TRAINING_DIR}/${fileName.replace('DEFAULT', sequence)}`);
    }
  });
  return sequence;
};

const _moveAndAddFeedBackToTrainingDir = (sequence) => {
  const enFileName = `${TRAINING_DIR}/DATA_EN_${sequence}_TRAIN.txt`;
  const koFileName = `${TRAINING_DIR}/DATA_KO_${sequence}_TRAIN.txt`;
  const enStream = fs.createWriteStream(enFileName, { flags: 'a' });
  const koStream = fs.createWriteStream(koFileName, { flags: 'a' });

  const files = fs.readdirSync(FEEDBACK_DIR);
  files.forEach((fileName) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(`${FEEDBACK_DIR}/${fileName}`),
      crlfDelay: Infinity,
    });
    rl.on('line', (line) => {
      const lineobj = JSON.parse(line);
      const currentModel = lineobj.current_model;
      if (currentModel && currentModel.indexOf('EnKo') > -1) {
        enStream.write(`${lineobj.src}\n`);
        koStream.write(`${lineobj.tgt_review}\n`);
      } else if (currentModel && currentModel.indexOf('EnKo') === -1) {
        koStream.write(`${lineobj.src}\n`);
        enStream.write(`${lineobj.tgt_review}\n`);
      }
    });
  });
};

const start = () => {
  try {
    _backupOldTrainingRaws();
    const sequence = _moveDefaultToTrainingDir();
    _moveAndAddFeedBackToTrainingDir(sequence);
  } catch (e) {
    console.log(e);
  }
  return 'OK';
};

const state = async () => {
  const longTraining = await fileHelper.maxLineCountInDir(TRAINING_DIR);
  const longDefault = await fileHelper.maxLineCountInDir(DEFAULT_DIR);
  const sumLog = await fileHelper.sumOfLineCountInDir(FEEDBACK_DIR);
  if (longTraining <= longDefault + sumLog) {
    db.setCurrentState(30);
    return 'DONE';
  }
  return 'NOTYET';
};

const info = async () => {
  const totalCount = await fileHelper.maxLineCountInDir(TRAINING_DIR);
  return {
    totalCount,
  };
};

module.exports = {
  start,
  state,
  info,
};

