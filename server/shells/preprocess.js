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

const exportShell = shell.exec(exportData + preprocessShell, { async: true });

exportShell.stdout.on('data', (data) => {
  console.log(data);
});

exportShell.stdout.on('end', (data) => {
  console.log(`ENDENDLLLL ::: ${data}`);
});

// let variableShell = shell.exec(variable);

// console.log(variableShell)
