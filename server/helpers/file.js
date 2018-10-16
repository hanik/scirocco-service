/* eslint-disable no-underscore-dangle,no-restricted-syntax,no-cond-assign */
const fs = require('fs-extra');

async function* _chunksToLines(chunksAsync) {
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
  // eslint-disable-next-line no-restricted-syntax
  for await (const fileName of files) {
    if (!fileName) return;
    if (fileName.endsWith('.log') || (fileName.endsWith('.txt') && !fileName.endsWith('.tok.txt'))) {
      const line = await _getLineCount(`${dir}/${fileName}`);
      if (max < line) {
        max = line;
      }
    }
  }
  // eslint-disable-next-line consistent-return
  return max - 1;
};

const sumOfLineCountInDir = async (dir) => {
  const files = fs.readdirSync(dir);
  let sum = 0;
  // eslint-disable-next-line no-restricted-syntax
  for await (const fileName of files) {
    if (!fileName) return;
    if (fileName.endsWith('.log') || (fileName.endsWith('.txt') && !fileName.endsWith('.tok.txt'))) {
      const line = await _getLineCount(`${dir}/${fileName}`);
      sum += line - 1;
    }
  }
  // eslint-disable-next-line consistent-return
  return sum;
};

module.exports = {
  maxLineCountInDir,
  sumOfLineCountInDir,
};
