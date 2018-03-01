#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var output_1 = require("../lib/tools/output");
var repos_1 = require("../lib/action/repos");
program
    .version(require('../package.json').version)
    .option('-h', 'get help')
    .parse(process.argv);
var commandTypeObject = {
    'ls': {
        message: 'get repository list data actions(获取列表数据操作)',
        childOptions: {
            '-r': 'list repositories',
            '-b': 'list all branches of a repository',
            '-t': 'list all topics of a repositories',
            '-c': 'list all contributors of a repository',
            '-s': 'list all starred repositories',
            '-w': 'list all watching repositories',
            '-i': 'list commits of a repository',
            '-o': 'list all collaborators of a repository',
            '-m': 'list milestones of a repository',
            '-l': 'list all the labels of a repository',
            '-cm': 'list commit comments of a repository'
        }
    },
    'cr': {
        message: 'create actions(创建repository数据)',
        childOptions: {
            '-r': 'create new repositories',
            '-a': 'add collaborator for a repository',
            '-m': 'create a milestone for a repository',
            '-l': 'create labels for a repository'
        }
    },
    'et': {
        message: 'edit actions(编辑repository数据)',
        childOptions: {
            '-t': 'replace topics for a repository',
            '-m': 'edit a milestone for a repository',
            '-l': 'edit a label for a repository'
        }
    },
    'rm': {
        message: 'delete issues actions(删除repository数据)',
        childOptions: {
            '-r': 'delete repositories',
            '-m': 'delete milestones of a repository',
            '-c': 'delete collaborators of a repository',
            '-l': 'delete labels of a repository'
        }
    },
    'st': {
        message: 'set actions(设置repository数据)',
        childOptions: {
            '-s': 'set subscription for repositories',
            '-r': 'star repositories',
            '-rn': 'unstar repositories',
            '-sn': 'unwatch repositories'
        }
    },
    'ck': {
        message: 'check actions(查看数据)',
        childOptions: {
            '-c': 'check whether a user is a collaborator of a repository',
            '-p': 'check the permission level of a collaborator'
        }
    },
    'ts': {
        message: 'transfer repositories to another user'
    },
    'fk': {
        message: 'fork a repository'
    }
};
program.on('--help', function () {
    output_1.mainTitle('Commands:');
    output_1.command();
    Object.keys(commandTypeObject).forEach(function (item) {
        output_1.command("$ gh rs " + item + " --- " + commandTypeObject[item].message);
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
    output_1.describe('list the repositories of yourself:');
    output_1.example('$ gh rs ls -r');
    output_1.describe('list the repositories of another user:');
    output_1.example('$ gh rs ls -r -n');
    output_1.example();
});
var paramArray = process.argv.slice(2);
var thecmd = paramArray[0]; // 命令类型
var theoption = paramArray[1]; // 参数值
if (!thecmd || thecmd === '-h') {
    program.help();
}
if (!commandTypeObject.hasOwnProperty(thecmd)) {
    output_1.error('the command you input is invalid, you could get the supported command through $ gh rs -h');
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
        output_1.describe('list the repositories of yourself:');
        output_1.example('$ gh rs ls -r');
        output_1.describe('list the repositories of another user:');
        output_1.example('$ gh rs ls -r -n');
        output_1.example();
        process.exit();
    }
    else {
        repos_1.reposStrategies[thecmd][theoption]();
    }
}
else {
    repos_1.reposStrategies[thecmd]();
}
