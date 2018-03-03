#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var output_1 = require("../lib/tools/output");
var reaction_1 = require("../lib/action/reaction");
program
    .version(require('../package.json').version)
    .option('-h', 'get help')
    .parse(process.argv);
var commandTypeObject = {
    'ls': {
        message: 'get list data action(获取列表数据)',
        childOptions: {
            '-c': 'list reactions for a commit comment',
            '-i': 'list reactions for an issue',
            '-ic': 'list reactions for an issue comment',
            '-p': 'list reactions for a pull request review comment'
        }
    },
    'cr': {
        message: 'create reaction action(创建数据)',
        childOptions: {
            '-c': 'create reaction for a commit comment',
            '-i': 'create reaction for an issue',
            '-ic': 'create reaction for an issue comment',
            '-p': 'create reaction for a pull request review comment'
        }
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
    output_1.describe('list reactions for a commit comment:');
    output_1.example('$ gh rt ls -c');
    output_1.describe('list the repositories of another user:');
    output_1.example('$ gh rt ls -c -n');
    output_1.example();
});
var paramArray = process.argv.slice(2);
var thecmd = paramArray[0]; // 命令类型
var theoption = paramArray[1]; // 参数值
if (!thecmd || thecmd === '-h') {
    program.help();
}
if (!commandTypeObject.hasOwnProperty(thecmd)) {
    output_1.error('the command you input is invalid, you could get the surpported commands through $ gh rt -h');
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
    output_1.describe('list all the reactions of an issue');
    output_1.example('$ gh rt ls -i');
    output_1.describe('list all the reactions of an issue of a repository of other user');
    output_1.example('$ gh rt ls -i -n');
    process.exit();
}
reaction_1.reactionStrategy[thecmd][theoption]();
