const fs = require('fs-extra');

const BASE_PATH = '/Users/actmember/workspace/scirocco-base';
const FLASK_PATH = '/scirocco-yc';
const FILENAME = `${BASE_PATH}${FLASK_PATH}/.env.org`;

const currentModel = 'KATE! Move! Move! GoGoGo!!';

const readed = fs.readFileSync(FILENAME);
const readedArray = readed.toString().split('\n');

fs.removeSync(FILENAME);

readedArray.forEach((line) => {
  if (!line) return;
  const trim = line.split('=');
  const key = trim[0].trim();
  let value = trim[1].trim();
  if (key === 'CURRENT_MODEL') {
    value = currentModel;
  }
  fs.outputFile(FILENAME, `${key}=${value}\n`, { flag: 'a' });
});
