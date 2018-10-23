const fs = require('fs-extra');
const readline = require('readline');
const luxon = require('luxon');
const shell = require('shelljs');

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
const dockerDir = '/Users/actmember/workspace/scirocco-base/docker-opennmt/';
shell.cd(dockerDir);

const exportData = 'export VOCAB_SIZE=7743; export FILE_SEQUENCE=20181018_104653;';
const variable = 'echo ${VOCAB_SIZE};';
const preprocessShell = 'docker-compose -f dev.preprocess.yml up';

const dbUtil = require('./testDb');
// const exportShell = shell.exec(exportData + preprocessShell, { async: true });
// const exportShell = shell.exec('pwd', { async: true });

// exportShell.stdout.on('data', (data) => {
//   console.log(data);
// });

// let variableShell = shell.exec(variable);
// console.log(variableShell)


/* test */
// exportShell.stdout.on('end', () => {
//   dbUtil.setName('BBAM!');
//   console.log('-------------bbam!--------------');
// });

dbUtil.setName('BBAM!');
// const db = require('../helpers/db');
//
// db.setCurrentState(40);
