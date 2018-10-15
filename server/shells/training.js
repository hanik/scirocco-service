const shell = require('shelljs');

const lsResult = shell.ls('-AL', './', './');
console.log(lsResult);

const dockerDir = '/Users/actmember/workspace/scirocco-base/docker-opennmt/';
shell.cd(dockerDir);

const dockerShell = 'docker-compose -f dev.train.yml up';

const dresult = shell.exec(dockerShell).stdout;

dresult.on('data', (data) => {
  console.log(dresult);
});

// kill -kill $(lsof -t -i :6060)
// vocabulary size: source = 7743; target = 8802
//
