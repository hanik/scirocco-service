var shell = require('shelljs');

let lsResult = shell.ls('-AL', './', './');
console.log(lsResult)

// let changeDirectory = '/Users/actmember/workspace/OpenNMT'
// shell.cd(changeDirectory)
// let serverShell = 'th tools/rest_translation_server.lua \\\n' +
//     '-model /Users/actmember/workspace/scirocco-base/models/20180521/en2ko/_epoch26_4.23_release.t7 \\\n' +
//     '-gpuid 0 \\\n' +
//     '-host 0.0.0.0 \\\n' +
//     '-port 6060 \\\n' +
//     '-case_feature true \\\n' +
//     '-segment_case true \\\n' +
//     '-segment_numbers true \\\n' +
//     '-joiner_annotate true \\\n' +
//     '-mode aggressive \\\n' +
//     '-replace_unk_tagged true \\\n' +
//     '-length_norm 1 \\\n' +
//     '-beam_size 10 \\\n' +
//     '-batch_size 128 \\\n'
//
// let result = shell.exec(serverShell).stdout;
//
// result.on('data', function(data) {
//     console.log(result)
// });

let dockerDir = '/Users/actmember/workspace/scirocco-base/docker-opennmt/'
shell.cd(dockerDir)

let dockerShell = 'docker-compose -f dev.docker-compose.en2ko.yml up'

let dresult = shell.exec(dockerShell).stdout;

dresult.on('data', (data) => {
    console.log(dresult)
})

//kill -kill $(lsof -t -i :6060)
//vocabulary size: source = 7743; target = 8802
//