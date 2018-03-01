#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var output_1 = require("../lib/tools/output");
var issues_1 = require("../lib/action/issues");
program
    .version(require('../package.json').version)
    .option('-h', 'get help')
    .parse(process.argv);
var commandTypeObject = {
    'ls': {
        message: 'get issues list data actions(获取列表数据操作)',
        childOptions: {
            '-u': 'list issues for myself',
            '-r': 'list issues for repository',
            '-a': 'list all asignees of repository issues',
            '-c': 'list all comments of a issue',
            '-cr': 'list comments of a repository'
        }
    },
    'cr': {
        message: 'create actions(创建issues数据)',
        childOptions: {
            '-r': 'create an issue for a repository',
            '-a': 'create assignees for an issue',
            '-c': 'create a comment for an issue',
            '－l': 'create labels for an issue'
        }
    },
    'et': {
        message: 'edit issues actions(编辑issues数据)',
        childOptions: {
            '-i': 'edit an issue',
            '-c': 'edit a comment for an issue',
            '-r': 'replace labels for an issue'
        }
    },
    'rm': {
        message: 'delete issues actions(删除issues数据)',
        childOptions: {
            '-a': 'delete assignees for an issue',
            '-c': 'delete comments for issue',
            '-l': 'delete labels for an issue'
        }
    }
};
program.on('--help', function () {
    output_1.mainTitle('Commands:');
    output_1.command();
    Object.keys(commandTypeObject).forEach(function (commandItem) {
        output_1.command("$ gh iu " + commandItem + " --- " + commandTypeObject[commandItem].message);
        output_1.describe('the supported child options for this command as follows:');
        var childOptions = commandTypeObject[commandItem].childOptions;
        Object.keys(childOptions).forEach(function (item) {
            output_1.command("  " + item + " --- " + childOptions[item]);
        });
    });
    output_1.mainTitle('use alert tips:');
    output_1.describe('The repository of all these command actions using is in your own github username space, so if you want to act at other username space, what you need to do is adding a -n option');
    output_1.mainTitle('use examples:');
    output_1.example();
    output_1.describe('list all the issues of a repository');
    output_1.example('$ gh iu ls -r');
    output_1.describe('list all the issues of a repository of a new github user');
    output_1.example('$ gh iu ls -r -n username(username is optional)');
    output_1.example();
});
var paramArray = process.argv.slice(2);
var thecmd = paramArray[0]; // 命令类型
var theoption = paramArray[1]; // 参数值
if (!thecmd || thecmd === '-h') {
    program.help();
}
if (!commandTypeObject.hasOwnProperty(thecmd)) {
    output_1.error('the command you input is invalid, you could get the surpported commands through $ gh issues -h');
    process.exit();
}
var childOptions = commandTypeObject[thecmd].childOptions;
if (!theoption || !childOptions.hasOwnProperty(theoption)) {
    output_1.error('empty or invalid child option!');
    output_1.mainTitle('the supported child options as follows:');
    output_1.command();
    Object.keys(childOptions).forEach(function (item) {
        output_1.command(item + "  ---  " + childOptions[item]);
    });
    output_1.command();
    output_1.describe('list all the issues of a repository');
    output_1.example('$ gh iu ls -r');
    process.exit();
}
// execute the function corresponding to the command and the childoption
issues_1.issueStrategies[thecmd][theoption]();
