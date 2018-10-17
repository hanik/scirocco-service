const fs = require('fs-extra');
const fileHelper = require('../../helpers/file');
const { parsed } = require('dotenv').config();

const { BASE_PATH } = parsed;
const FEEDBACK_DIR = BASE_PATH + parsed.FEEDBACK_DIR;
const TRAINING_DIR = BASE_PATH + parsed.DATA_TRAINING_DIR;
const DEFAULT_DIR = BASE_PATH + parsed.DATA_DEFAULT_DIR;

const info = async () => {
  let feedbackLogCount;
  let trainingCount;
  let defaultCount;
  try {
    feedbackLogCount = await fileHelper.sumOfLineCountInDir(FEEDBACK_DIR);
    trainingCount = await fileHelper.maxLineCountInDir(TRAINING_DIR);
    defaultCount = await fileHelper.maxLineCountInDir(DEFAULT_DIR);
  } catch (e) {
    console.log(e);
  }
  const progressCount = trainingCount - defaultCount;
  const counts = {
    progressCount,
    totalCount: progressCount + feedbackLogCount,
  };
  return counts;
};

const create = async (model) => {
  const logPath = `${process.env.PWD}/logs/model-create.log`;
  try {
    await fs.outputFile(logPath, `${JSON.stringify(model)}\n`, { flag: 'a' });
  } catch (e) {
    console.log(e);
  }
  return 'OK';
};

module.exports = {
  info,
  create,
};

