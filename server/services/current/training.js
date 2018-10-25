/* eslint-disable no-restricted-syntax,consistent-return,no-underscore-dangle */
const fs = require('fs-extra');
const shell = require('shelljs');
const fileHelper = require('../../helpers/file');
const db = require('../../helpers/db');
const { parsed } = require('dotenv').config();

const { BASE_PATH, ENV, END_EPOCH } = parsed;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const PREPROCESS_DIR = BASE_PATH + parsed.PREPROCESS_DIR;
const MODEL_DIR = BASE_PATH + parsed.MODEL_DIR;
const DOCKER_DIR = BASE_PATH + parsed.DOCKER_DIR;

const _training = (sequence) => {
  shell.cd(DOCKER_DIR);
  const trainingDownCommand = `export FILE_SEQUENCE=${sequence};
      docker-compose -f ${ENV}.train.enko.yml down;`;

  console.log('======== TRAINING DOWN ========');
  const trainingDown = shell.exec(trainingDownCommand, { async: true });
  trainingDown.stdout.on('end', () => {
    console.log('======== REMOVE OLD TRAINING FILE ========');
    const getLang = getCurrentTrainingLanguage();
    const path = `${MODEL_DIR}/${sequence}/${getLang}`;
    fileHelper.removeAllFilesInDirSync(path);
    console.log('======== TRAINING START ========');
    shell.cd(DOCKER_DIR);
    const trainingUpCommand = `export FILE_SEQUENCE=${sequence}; 
      docker-compose -f ${ENV}.train.enko.yml up;`;
    const trainingUp = shell.exec(trainingUpCommand, { async: true });
    trainingUp.stdout.on('end', () => {
      console.log('======== TRAINING END ========');
      db.setCurrentState(40);
    });
  });
};

const start = async () => {
  const sequence = fileHelper.getTrainingSequence(TRAINING_DIR);
  // 1. rawdata/training 에있는 텍스트에 토크나이저 실행
  // 2. 실행후 프리프로세스 실행
  shell.cd(DOCKER_DIR);
  const command = `export FILE_SEQUENCE=${sequence};
    docker-compose -f ${ENV}.tokenize.yml up;
    docker-compose -f ${ENV}.preprocess.yml up;`;
  const child = shell.exec(command, { async: true });

  child.stdout.on('end', async () => {
    // 3. 실행후 VOCAB_SIZE 변경하여 프리프로세스 재실행
    const path = `${PREPROCESS_DIR}/${sequence}`;
    const pattern = /DATA_(EN|KO)_[\d]{8}_[\d]{6}_.*\.(src|tgt)\.dict/g;
    const vocabSize = await fileHelper.minLineCountInDirWithPattern(pattern, path);

    const changeVocabCommand = `export FILE_SEQUENCE=${sequence};
      export VOCAB_SIZE=${vocabSize};
      docker-compose -f ${ENV}.preprocess.yml up;`;
    shell.exec(changeVocabCommand);

    // 4. 실행후 트레이닝 실행
    _training(sequence);
  });

  // TODO 로그 확인할 수 있도록 처리
  return 'OK';
};

const getCurrentTrainingLanguage = () => {
  const enko = 'EnKo';
  const koen = 'KoEn';
  const sequence = fileHelper.getTrainingSequence(TRAINING_DIR);
  const dir = `${MODEL_DIR}/${sequence}`;
  let lang = enko;
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(`${MODEL_DIR}/${sequence}`);
    if (files.length >= 2) {
      // TODO 두가지다인경우는 아직 감안하지 않음
      lang = enko;
    } else if (files.length === 1) {
      if (files.includes(enko)) lang = enko;
      else if (files.includes(koen)) lang = koen;
    }
  }
  return lang;
};

const state = () => {
  const sequence = fileHelper.getTrainingSequence(TRAINING_DIR);
  const getLang = getCurrentTrainingLanguage();
  const dir = `${MODEL_DIR}/${sequence}/${getLang}`;
  try {
    const lastFileName = fileHelper.getLastModifiedFileNameInDir(dir);
    const regex = new RegExp(/DATA_KO_[\d]{8}_[\d]{6}_(EnKo|KoEn)_data-model_epoch(\d){1,2}_.*.t7/g);
    if (regex.test(lastFileName)) {
      const number = lastFileName.match(/_epoch(\d){1,2}/g)[0].replace('_epoch', '');
      if (number === END_EPOCH) {
        return 'DONE';
      }
      return `${number}/${END_EPOCH}`;
    }
    return `0/${END_EPOCH}`;
  } catch (e) {
    console.log(e);
    return 'ERROR';
  }
};

const restart = () => {
  const sequence = fileHelper.getTrainingSequence(TRAINING_DIR);
  _training(sequence);
};

const cancel = async () => {
  // TODO : 학습단계에서 취소
  return 'OK';
};

module.exports = {
  start,
  state,
  restart,
  cancel,
  getCurrentTrainingLanguage,
};
