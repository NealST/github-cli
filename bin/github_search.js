#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var output_1 = require("../lib/tools/output");
var search_1 = require("../lib/action/search");
program
    .version(require('../package.json').version)
    .option('-h', 'get help')
    .parse(process.argv);
var commandTypeObject = {
    'r': 'search repositories',
    'c': 'search commits',
    'i': 'search issues',
    'u': 'search users'
};
program.on('--help', function () {
    output_1.mainTitle('Commands:');
    output_1.command();
    Object.keys(commandTypeObject).forEach(function (item) {
        output_1.command("$ gh sr " + item + " --- " + commandTypeObject[item]);
    });
    output_1.mainTitle('use examples:');
    output_1.example();
    output_1.describe('search repositories:');
    output_1.example('$ gh sr -r');
    output_1.example();
});
var paramArray = process.argv.slice(2);
var thecmd = paramArray[0]; // 命令类型
if (!thecmd || thecmd === '-h') {
    program.help();
}
if (!commandTypeObject.hasOwnProperty(thecmd)) {
    output_1.error('the option you input is invalid, you could get the surpported options through $ gh sr -h');
    process.exit();
}
search_1.searchStrategy[thecmd]();
