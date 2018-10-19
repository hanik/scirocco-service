/* eslint-disable no-restricted-syntax,consistent-return,no-underscore-dangle */
const fs = require('fs-extra');
const shell = require('shelljs');
const fileHelper = require('../../helpers/file');
const db = require('../../helpers/db');
const { parsed } = require('dotenv').config();

const { BASE_PATH } = parsed;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const PREPROCESS_DIR = BASE_PATH + parsed.PREPROCESS_DIR;
const MODEL_DIR = BASE_PATH + parsed.MODEL_DIR;
const DOCKER_DIR = BASE_PATH + parsed.DOCKER_DIR;

const _getTrainingSequence = () => {
  const files = fs.readdirSync(TRAINING_DIR);
  let sequence = '';
  const reg = new RegExp(/DATA_(EN|KO)_[\d]{8}_[\d]{6}_TRAIN.txt/g);
  files.forEach((fileName) => {
    if (reg.test(fileName)) {
      sequence = fileName.match(/[\d]{8}_[\d]{6}/g);
    }
  });
  return sequence;
};

const start = async () => {
  const sequence = _getTrainingSequence();
  // 1. rawdata/training 에있는 텍스트에 토크나이저 실행
  // 2. 실행후 프리프로세스 실행
  shell.cd(DOCKER_DIR);
  const command = `export FILE_SEQUENCE=${sequence};
    docker-compose -f dev.tokenize.yml up;
    docker-compose -f dev.preprocess.yml up;`;
  const child = shell.exec(command, { async: true });

  child.stdout.on('end', async (data) => {
    // 3. 실행후 VOCAB_SIZE 변경하여 프리프로세스 재실행
    const path = `${PREPROCESS_DIR}/${sequence}`;
    const pattern = /DATA_(EN|KO)_[\d]{8}_[\d]{6}_.*\.(src|tgt)\.dict/g;
    const vocabSize = await fileHelper.minLineCountInDirWithPattern(pattern, path);

    const changeVocabCommand = `export FILE_SEQUENCE=${sequence};
      export VOCAB_SIZE=${vocabSize};
      docker-compose -f dev.preprocess.yml up;`;
    shell.exec(changeVocabCommand);

    // 4. 실행후 트레이닝 실행
    const trainingCommand = `export FILE_SEQUENCE=${sequence};
      docker-compose -f dev.train.enko.yml up;`;

    console.log('======== TRAINGING START ========');
    const training = shell.exec(trainingCommand, { async: true });
    training.stdout.on('end', () => {
      console.log('======== TRAINING END ========');
      db.setCurrentState(40);
    });
  });

  // TODO 로그 확인할 수 있도록 처리
  return 'OK';
};

const _getCurrentTrainingLanguage = () => {
  const enko = 'EnKo';
  const koen = 'KoEn';
  const sequence = _getTrainingSequence();
  const files = fs.readdirSync(`${MODEL_DIR}/${sequence}`);
  let lang = 'NONE';
  if (files.length === 2) {
    // TODO 두가지다인경우는 아직 감안하지 않음
    lang = enko;
  } if (files.length === 1) {
    if (files.includes(enko)) lang = enko;
    else if (files.includes(koen)) lang = koen;
  }
  return lang;
};

const state = () => {
  const sequence = _getTrainingSequence();
  const getLang = _getCurrentTrainingLanguage();
  const dir = `${MODEL_DIR}/${sequence}/${getLang}`;
  console.log(dir);
  try {
    const lastFileName = fileHelper.getLastModifiedFileNameInDir(dir);
    console.log(lastFileName);
    const regex = new RegExp(/DATA_KO_[\d]{8}_[\d]{6}_(EnKo|KoEn)_data-model_epoch(\d){1,2}_.*.t7/g);
    if (regex.test(lastFileName)) {
      const number = lastFileName.match(/_epoch(\d){1,2}/g)[0].replace('_epoch', '');
      console.log(number);
      return number;
    }
  } catch (e) {
    console.log(e);
    return 'NOTYET';
  }
  return 'NOTYET';
};

module.exports = {
  start,
  state,
};
