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

const exportData = 'export VOCAB_SIZE=7000;';
const variable = 'echo ${VOCAB_SIZE};';
const preprocessShell = 'docker-compose -f dev.preprocess.yml up';

const shellda = shell.exec('ls -al');
shell.exec('node --version');

const exportShell = shell.exec(exportData + variable);

// console.log(exportShell)

// let variableShell = shell.exec(variable);

// console.log(variableShell)

