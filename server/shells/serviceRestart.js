const fs = require('fs-extra');
const readline = require('readline');
const luxon = require('luxon');

const baseDir = '/Users/actmember/workspace/scirocco-base/';
const feedbackDir = `${baseDir}feedback/`;
const logFile = 'review_2018-08-12.log';
const congifDir = `${baseDir}config-train/`;
const modelDir = `${baseDir}models/`;
const preprocessDir = `${baseDir}preprocess/`;
const dataDefaultDir = `${baseDir}rawdata/DEFAULT/`;
const dataTrainingDir = `${baseDir}rawdata/TRAINING/`;

const sciroccoYcDir = '/Users/actmember/workspace/scirocco-yc/';
const opennmtDir = '/Users/actmember/workspace/OpenNMT/';


const today = luxon.DateTime.local().toFormat('yyyyMMdd_HHmmss');
const date = today.substring(0, 8);
const time = today.substring(9, 15);
console.log(`today : ${today}`);
console.log(`today date : ${date}`);
console.log(`today time : ${time}`);
fs.mkdirpSync(date);

const srcStream = fs.createWriteStream(`./${date}/output_src.txt`, { flags: 'w' });
const tgtStream = fs.createWriteStream(`./${date}/output_tgt.txt`, { flags: 'w' });

const rl = readline.createInterface({
  input: fs.createReadStream(feedbackDir + logFile),
  crlfDelay: Infinity,
});

rl.on('line', (line) => { 
  // console.log('===line===')
  // console.log(`Line from file: ${line}`);
  const lineobj = JSON.parse(line);
  // console.log(lineobj)
  srcStream.write(`${lineobj.src}\n`);
  tgtStream.write(`${lineobj.tgt_review}\n`);
});
