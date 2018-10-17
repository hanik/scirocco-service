/* eslint-disable no-restricted-syntax */
const fs = require('fs-extra');
const shell = require('shelljs');
const fileHelper = require('../../helpers/file');
const { parsed } = require('dotenv').config();

const { BASE_PATH } = parsed;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const PREPROCESS_DIR = BASE_PATH + parsed.PREPROCESS_DIR;
const MODEL_DIR = BASE_PATH + parsed.MODEL_DIR;

const start = async () => {
  // TODO
  // sequence 뽑아내기
  const files = fs.readdirSync(TRAINING_DIR);
  let sequence = '';
  const reg = new RegExp(/DATA_(EN|KO)_[\d]{8}_[\d]{6}_TRAIN.txt/g);
  files.forEach((fileName) => {
    if (reg.test(fileName)) {
      sequence = fileName.match(/[\d]{8}_[\d]{6}/g);
    }
  });
  console.log(`SEQUENCE : ${sequence}`);
  // rawdata/training 에있는 텍스트를 토크나이저 실행
  // 실행후 프리프로세스 실행
  // 실행후 VOCAB_SIZE 변경하여 프리프로세스 재실행
  // 실행후 트레이닝 실행
};

module.exports = {
  start,
};

