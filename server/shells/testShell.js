const shell = require('shelljs');
const fs = require('fs-extra');

const lsResult = shell.ls('-AL', './', './');
console.log(lsResult);

const baseDir = '/Users/actmember/workspace/scirocco-base/';
const feedbackDir = `${baseDir}feedback/`;
const logFile = 'review_2018-08-12.log';
const congifDir = `${baseDir}config-train/`;
const modelDir = `${baseDir}models/20181018_182435/EnKo`;
const preprocessDir = `${baseDir}preprocess/`;
const dataDefaultDir = `${baseDir}rawdata/DEFAULT/`;
const dataTrainingDir = `${baseDir}rawdata/TRAINING/`;

const files = fs.readdirSync(modelDir);
let time = 0;
let latest = '';
files.forEach((file) => {
  const date = fs.statSync(modelDir + '/' + file).mtime;
  console.log(modelDir + '/' + file);
  console.log(date.getTime());
  if (time < date.getTime()) {
    time = date.getTime();
    latest = file;
  }
});
console.log(time)
console.log(latest)
// kill -kill $(lsof -t -i :10801)
// vocabulary size: source = 7743; target = 8802
//
