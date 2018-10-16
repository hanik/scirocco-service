const fs = require('fs-extra');
const readline = require('readline');
const shell = require('shelljs');
const { parsed } = require('dotenv').config();

const baseDir = '/Users/actmember/workspace/scirocco-base/';
const feedbackDir = `${baseDir}feedback/`;
const logFile = 'review_2018-08-12.log';
const congifDir = `${baseDir}config-train/`;
const modelDir = `${baseDir}models/`;
const preprocessDir = `${baseDir}preprocess/`;
const dataDefaultDir = `${baseDir}rawdata/DEFAULT/`;
const dataTrainingDir = `${baseDir}rawdata/TRAINING/`;

async function* chunksToLines(chunksAsync) {
  let previous = '';
  for await (const chunk of chunksAsync) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf('\n')) >= 0) {
      // line includes the EOL
      const line = previous.slice(0, eolIndex + 1);
      yield line;
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

async function numberLines(linesAsync) {
  let counter = 1;
  for await (const line of linesAsync) {
    counter += 1;
  }
  return counter;
}
const getLineCount = async (filePath) => {
  const readStream = fs.createReadStream(
    filePath,
    { encoding: 'utf8', highWaterMark: 1024 },
  );
  const lines = await numberLines(chunksToLines(readStream));
  // console.log(lines);
  return lines;
};

const maxLineCountInDir = async (dir) => {
  const files = fs.readdirSync(dir);
  let max = 0;
  // eslint-disable-next-line no-restricted-syntax
  for await (const fileName of files) {
    if (!fileName) return;
    if (fileName.endsWith('.txt') && !fileName.endsWith('.tok.txt')) {
      const line = await getLineCount(dir + fileName);
      console.log(`LINECOUNT : ${line}`);
      if (max < line) {
        max = line;
      }
    }
  }
  // eslint-disable-next-line consistent-return
  return max;
};

async function main() {
  const count = await maxLineCountInDir(dataTrainingDir);
  console.log(`MAX : ${count}`);
}

main();
