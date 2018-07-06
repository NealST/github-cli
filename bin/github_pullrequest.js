#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var output_1 = require("../lib/tools/output");
var pullrequest_1 = require("../lib/action/pullrequest");
var commandTypeObject = {
    'ls': {
        message: 'get list data about pull request(获取pull request列表数据操作)',
        childOptions: {
            '-r': 'list pull requests for a repository',
            '-v': 'list all the reviews of a pull request',
            '-c': 'list comments on a pull request',
            '-cw': 'list comments of a review of a pull request',
            '-cr': 'list comments in a repository pulls',
            '-rp': 'list review requests of a pull request'
        }
    },
    'cr': {
        message: 'create actions about pull request(创建关于pull request数据的操作)',
        childOptions: {
            '-p': 'create a pull request',
            '-pr': 'create a pull request review',
            '-rp': 'create a review request for a pull request'
        }
    },
    'et': {
        message: 'edit pull request actions(编辑pull request数据)',
        childOptions: {
            '-p': 'edit a pull request',
            '-c': 'edit a comment for repository pulls'
        }
    },
    'rm': {
        message: 'delete pull request actions(删除pull request数据)',
        childOptions: {
            '-v': 'delete reviews of a pull request',
            '-c': 'delete a comment of repository pulls',
            '-r': 'delete review request of a pull request'
        }
    },
    'mr': {
        message: 'merge pull request actions(合并pull request请求)'
    },
    'st': {
        message: 'submit pull request review'
    },
    'ds': {
        message: 'dismiss a pull request review'
    }
};
program
    .version(require('../package.json').version)
    .option('-h', 'get help')
    .parse(process.argv);
program.on('--help', function () {
    output_1.mainTitle('Commands:');
    output_1.command();
    Object.keys(commandTypeObject).forEach(function (item) {
        output_1.command("$ gh pr " + item + " --- " + commandTypeObject[item].message);
        var childOptions = commandTypeObject[item].childOptions;
        if (childOptions) {
            output_1.describe('the supported child options for this command as follows:');
            Object.keys(childOptions).forEach(function (optionItem) {
                output_1.command("  " + optionItem + " --- " + childOptions[optionItem]);
            });
        }
    });
    output_1.mainTitle('use examples:');
    output_1.example();
    output_1.describe('list pull requests for a repository');
    output_1.example('gh pr ls -r');
    output_1.example();
});
var paramArray = process.argv.slice(2);
var thecmd = paramArray[0]; // 命令类型
var theoption = paramArray[1]; // 参数值
if (!thecmd || thecmd === '-h') {
    program.help();
}
if (!commandTypeObject.hasOwnProperty(thecmd)) {
    output_1.error('the command you input is invalid, you could get the surpported commands through $ gh pr -h');
}
var commandObject = commandTypeObject[thecmd];
var childOptions = commandObject.childOptions;
if (childOptions) {
    if (!theoption || !childOptions.hasOwnProperty(theoption)) {
        output_1.error('empty or invalid child option!');
        output_1.mainTitle('the supported child options as follows:');
        output_1.command();
        Object.keys(childOptions).forEach(function (item) {
            output_1.command(item + "  ---  " + childOptions[item]);
        });
        output_1.command();
        output_1.describe('list all the pull request of a repository');
        output_1.example('$ gh pr ls -r');
        process.exit();
    }
    else {
        pullrequest_1.prStrategies[thecmd][theoption]();
    }
}
else {
    pullrequest_1.prStrategies[thecmd]();
}
