const fs = require('fs-extra');
const readline = require('readline');
const luxon = require('luxon');
var shell = require('shelljs');

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

let exportData = 'export VOCAB_SIZE=7000;'
let variable = 'echo ${VOCAB_SIZE};'
let preprocessShell = 'docker-compose -f dev.preprocess.yml up'

let shellda = shell.exec('ls -al');
shell.exec('node --version');

let exportShell = shell.exec(exportData + variable);

// console.log(exportShell)

// let variableShell = shell.exec(variable);

// console.log(variableShell)

