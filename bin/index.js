#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var child_process_1 = require("child_process");
var path = require("path");
var fs = require("fs");
var output_1 = require("../lib/tools/output");
var cfonts_1 = require("../lib/tools/cfonts");
var updateNotifier = require("update-notifier");
var pkg = require('../package.json');
updateNotifier({ pkg: pkg }).notify();
// 支持的命令类型
var commandTypeObject = {
    'iu': {
        message: 'issues action(issues操作)',
        fontstext: 'issues'
    },
    'pr': {
        message: 'pull request action(pull request操作)',
        fontstext: 'pullReq'
    },
    'rt': {
        message: 'emojis action(表情回应)',
        fontstext: 'reaction'
    },
    'rs': {
        message: 'repository action(仓库操作)',
        fontstext: 'repos'
    },
    'sr': {
        message: 'search action(搜索操作)',
        fontstext: 'search'
    },
    'us': {
        message: 'personal user action(个人用户操作)',
        fontstext: 'users'
    }
};
program
    .version(pkg.version)
    .option('-h', 'get help')
    .parse(process.argv);
program.on('--help', function () {
    output_1.mainTitle('Commands:');
    output_1.command();
    Object.keys(commandTypeObject).forEach(function (item) {
        output_1.command("$ gh " + item + " --- " + commandTypeObject[item].message);
    });
    output_1.command();
    output_1.mainTitle('Examples:');
    output_1.example();
    Object.keys(commandTypeObject).forEach(function (item) {
        output_1.describe("# look help for " + item + " action");
        output_1.example("$ gh " + item + " -h");
    });
});
var args = process.argv.slice(3);
var thecommand = program.args[0];
if (!thecommand || thecommand === '-h') {
    program.help();
}
if (!commandTypeObject.hasOwnProperty(thecommand)) {
    output_1.error('the command you input is invalid,you could look for surpported commands through $ gh');
    process.exit();
}
if (args.indexOf('-n') > 0) {
    // if -n option exist, it indicate that you want do actions at another github user namespace
    process.env.githubUserMode = 'target';
}
if (args.indexOf('rm') > 0) {
    process.env.githubActionType = 'remove';
}
// 子命令标题
cfonts_1.default(commandTypeObject[thecommand].fontstext);
var bin = "gh_" + thecommand;
var binFilePath = path.join(__dirname, bin);
var exists = fs.existsSync;
if (exists(binFilePath)) {
    bin = binFilePath;
}
else {
    bin = process.env.PATH.split(':').reduce(function (binary, p) {
        p = path.resolve(p, bin);
        return exists(p) && fs.statSync(p).isFile() ? p : binary;
    }, bin);
}
var task = child_process_1.spawn(bin, args, {
    stdio: 'inherit'
});
task.on('close', function (code) {
    process.exit(code);
});
task.on('error', function (err) {
    console.log(err);
});
