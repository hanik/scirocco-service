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


/**
 * TODO Prepare training data
 * 1. make today dir
 * 2. move data feedback to training today
 * 3. 파일 개수 확인, 한글영어 합치기.
 *      gsort = 'gsort -R -u '+input_filename+'>'+output_filename
 * 4. Valid set 분리
 *      head -n 200 5.AllInOne_EN_KR_UNIQUE.txt > 7.AllInOne_EN_KR_VALID.txt
 *      sed 1,200d 5.AllInOne_EN_KR_UNIQUE.txt  > 7.AllInOne_EN_KR_TRAIN.txt
 * 5. 한영 분리
 *      cut -d "ꂉ" -f1 7.AllInOne_EN_KR_TRAIN.txt > 8.AllInOne_EN_20180719_TRAIN.txt
 *      cut -d "ꂉ" -f2 7.AllInOne_EN_KR_TRAIN.txt > 8.AllInOne_KO_20180719_TRAIN.txt
 *      cut -d "ꂉ" -f1 7.AllInOne_EN_KR_VALID.txt > 8.AllInOne_EN_20180719_VALID.txt
 *      cut -d "ꂉ" -f2 7.AllInOne_EN_KR_VALID.txt > 8.AllInOne_KO_20180719_VALID.txt
 * 6. Trim
 *      cut -d "ꂉ" -f1 7.AllInOne_EN_KR_TRAIN.txt > 8.AllInOne_EN_20180719_TRAIN.txt
 *      cut -d "ꂉ" -f2 7.AllInOne_EN_KR_TRAIN.txt > 8.AllInOne_KO_20180719_TRAIN.txt
 *      cut -d "ꂉ" -f1 7.AllInOne_EN_KR_VALID.txt > 8.AllInOne_EN_20180719_VALID.txt
 *      cut -d "ꂉ" -f2 7.AllInOne_EN_KR_VALID.txt > 8.AllInOne_KO_20180719_VALID.txt
 * 7. Default 와 합치기
 *      cat a.txt >> b.txt
 *
 */
