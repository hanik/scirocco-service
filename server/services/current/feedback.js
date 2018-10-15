const fs = require('fs-extra');
const shell = require('shelljs');
const { parsed } = require('dotenv').config();

const { BASE_PATH } = parsed;
const FEEDBACK_DIR = BASE_PATH + parsed.FEEDBACK_DIR;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const DEFAULT_DIR = BASE_PATH + parsed.DATA_DEFAULT_DIR;

const extractLine = (stdout) => {
  const lines = stdout.split('\n');

  const lined = lines.map((line) => {
    const trimed = line.trim().split(' ');
    if (trimed[1] && trimed[1] !== 'total' && trimed[1].indexOf('.tok.txt') === -1) {
      return trimed[0];
    }
    return '0';
  });

  console.log(lined.sort((a, b) => b - a));
  console.log(`lined.sort : ${lined.sort((a, b) => b - a)[0]}`);
  return parseInt(lined.sort((a, b) => b - a)[0], 10);
};

const info = () => {
  // TODO
  // 1. 현재 진행중인 녀석 : /rawdata/TRAINING - rawdata/DEFAULT
  // 2. 총 개수는 /feedback + 현재 진행중인 녀석
  console.log(FEEDBACK_DIR);
  const feedbackShell = shell.exec(`cd ${FEEDBACK_DIR}; wc -l *.log`).stdout;
  const feedbackLogCount = parseInt(feedbackShell.trim().split(' ')[0], 10);
  const trainingShell = shell.exec(`cd ${TRAINING_DIR}; wc -l *.txt`).stdout;
  const trainingCount = extractLine(trainingShell);
  const defaultShell = shell.exec(`cd ${DEFAULT_DIR}; wc -l *.txt`).stdout;
  const defaultCount = extractLine(defaultShell);

  const progressCount = trainingCount - defaultCount;

  const counts = {
    progressCount,
    totalCount: progressCount + feedbackLogCount,
  };
  return counts;
};

// const create
const create = () => {
  console.log('feedback service create.');
  return 'Ok';
};

module.exports = {
  info,
  create,
};

