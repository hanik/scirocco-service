var shell = require('shelljs');

let lsResult = shell.ls('-AL', './', './');
console.log(lsResult)

let dockerDir = '/Users/actmember/workspace/scirocco-base/docker-opennmt/'
shell.cd(dockerDir)

let dockerShell = 'docker-compose -f dev.train.yml up'

let dresult = shell.exec(dockerShell).stdout;

dresult.on('data', (data) => {
    console.log(dresult)
})

//kill -kill $(lsof -t -i :6060)
//vocabulary size: source = 7743; target = 8802
//