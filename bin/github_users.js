#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var output_1 = require("../lib/tools/output");
var users_1 = require("../lib/action/users");
program
    .version(require('../package.json').version)
    .option('-h', 'get help')
    .parse(process.argv);
var commandTypeObject = {
    'ls': {
        message: 'get list data(获取列表数据操作)',
        childOptions: {
            '-m': 'list followers of a user',
            '-t': 'list the following of a user'
        }
    },
    'et': {
        message: 'edit user data(编辑用户数据)'
    },
    'fl': {
        message: 'add a following(follow某个用户)'
    },
    'rf': {
        message: 'unfollow users(unfollow某个用户)'
    }
};
program.on('--help', function () {
    output_1.mainTitle('Commands:');
    output_1.command();
    Object.keys(commandTypeObject).forEach(function (commandItem) {
        output_1.command("$ gh us " + commandItem + " --- " + commandTypeObject[commandItem].message);
        var childOptions = commandTypeObject[commandItem].childOptions;
        if (childOptions) {
            output_1.describe('the supported child options for this command as follows:');
            Object.keys(childOptions).forEach(function (item) {
                output_1.command("  " + item + " --- " + childOptions[item]);
            });
        }
    });
    output_1.mainTitle('use alert tips:');
    output_1.describe('The repository of all these command actions using is in your own github username space, so if you want to act at other username space, what you need to do is adding a -n option');
    output_1.mainTitle('use examples:');
    output_1.example();
    output_1.describe('list followers of yourself');
    output_1.example('$ gh us ls -m');
    output_1.describe('list followers of another user');
    output_1.example('$ gh us ls -m -n(username is optional)');
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
if (childOptions) {
    if (!theoption || !childOptions.hasOwnProperty(theoption)) {
        output_1.error('empty or invalid child option!');
        output_1.mainTitle('the supported child options as follows:');
        output_1.command();
        Object.keys(childOptions).forEach(function (item) {
            output_1.command(item + "  ---  " + childOptions[item]);
        });
        output_1.command();
        output_1.describe('list followers of yourself');
        output_1.example('$ gh us ls -m');
        output_1.describe('list followers of another user');
        output_1.example('$ gh us ls -m -n(username is optional)');
        process.exit();
    }
    else {
        users_1.userStrategy[thecmd][theoption]();
    }
}
else {
    users_1.userStrategy[thecmd]();
}
