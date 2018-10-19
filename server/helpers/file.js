/* eslint-disable no-underscore-dangle,no-restricted-syntax,no-cond-assign,consistent-return */
const fs = require('fs-extra');

async function* _chunksToLines(chunksAsync) {
  let previous = '';
  for await (const chunk of chunksAsync) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf('\n')) >= 0) {
      const line = previous.slice(0, eolIndex + 1);
      yield line;
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

async function _numberLines(linesAsync) {
  let counter = 1;
  for await (const line of linesAsync) {
    counter += 1;
  }
  return counter;
}

const _getLineCount = async (filePath) => {
  const readStream = fs.createReadStream(
    filePath,
    { encoding: 'utf8', highWaterMark: 1024 },
  );
  const lines = await _numberLines(_chunksToLines(readStream));
  return lines;
};

const maxLineCountInDir = async (dir) => {
  const files = fs.readdirSync(dir);
  let max = 0;
  for await (const fileName of files) {
    if (!fileName) return;
    if (fileName.endsWith('.log') || (fileName.endsWith('.txt') && !fileName.endsWith('.tok.txt'))) {
      const line = await _getLineCount(`${dir}/${fileName}`);
      if (max < line) {
        max = line;
      }
    }
  }
  return max - 1;
};

const sumOfLineCountInDir = async (dir) => {
  const files = fs.readdirSync(dir);
  let sum = 0;
  for await (const fileName of files) {
    if (!fileName) return;
    if (fileName.endsWith('.log') || (fileName.endsWith('.txt') && !fileName.endsWith('.tok.txt'))) {
      const line = await _getLineCount(`${dir}/${fileName}`);
      sum += line - 1;
    }
  }
  return sum;
};

const minLineCountInDirWithPattern = async (pattern, dir) => {
  const regex = new RegExp(pattern);
  const files = fs.readdirSync(dir);
  let min = 0;
  for await (const fileName of files) {
    if (!fileName) return;
    if (regex.test(fileName)) {
      const count = await _getLineCount(`${dir}/${fileName}`);
      if (min === 0 || min > count) {
        min = count;
      }
    }
    regex.lastIndex = 0;
  }
  return min - 1;
};

const getLastModifiedFileNameInDir = (dir) => {
  const files = fs.readdirSync(dir);
  let time = 0;
  let latest = '';
  files.forEach((file) => {
    const date = fs.statSync(`${dir}/${file}`).mtime;
    if (time < date.getTime()) {
      time = date.getTime();
      latest = file;
    }
  });
  return latest;
};

module.exports = {
  maxLineCountInDir,
  sumOfLineCountInDir,
  minLineCountInDirWithPattern,
  getLastModifiedFileNameInDir,
};
