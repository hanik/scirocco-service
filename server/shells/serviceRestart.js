const fs = require('fs-extra');
const readline = require('readline');
const luxon = require('luxon');

let baseDir = '/Users/actmember/workspace/scirocco-base/'
let feedbackDir = baseDir + 'feedback/';
let logFile = 'review_2018-08-12.log';
let congifDir = baseDir + 'config-train/';
let modelDir = baseDir + 'models/';
let preprocessDir = baseDir + 'preprocess/'
let dataDefaultDir = baseDir + 'rawdata/DEFAULT/';
let dataTrainingDir = baseDir + 'rawdata/TRAINING/';

let sciroccoYcDir = '/Users/actmember/workspace/scirocco-yc/'
let opennmtDir = '/Users/actmember/workspace/OpenNMT/'


let today = luxon.DateTime.local().toFormat('yyyyMMdd_HHmmss');
let date = today.substring(0,8)
let time = today.substring(9,15)
console.log(`today : ${today}`)
console.log(`today date : ${date}`)
console.log(`today time : ${time}`)
fs.mkdirpSync(date)

var srcStream = fs.createWriteStream(`./${date}/output_src.txt`, {flags: 'w'});
var tgtStream = fs.createWriteStream(`./${date}/output_tgt.txt`, {flags: 'w'});

const rl = readline.createInterface({
    input: fs.createReadStream(feedbackDir + logFile),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    // console.log('===line===')
    // console.log(`Line from file: ${line}`);
    let lineobj = JSON.parse(line)
    // console.log(lineobj)
    srcStream.write(lineobj.src + '\n')
    tgtStream.write(lineobj.tgt_review + '\n')
});
