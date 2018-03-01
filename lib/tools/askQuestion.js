"use strict";
// 提问交互模块
Object.defineProperty(exports, "__esModule", { value: true });
var inquire = require("inquirer");
var stringz_1 = require("stringz");
var wide_align_1 = require("wide-align");
var chalk_1 = require("chalk");
var width_rule = {
    number: 10,
    title: 20,
    description: 40,
    url: 60
};
exports.createChoiceTable = function (heads, datalist) {
    var tableWidth = 0;
    heads.forEach(function (item) {
        tableWidth += width_rule[item.type];
    });
    var header = "\u2502" + heads.map(function (item) {
        return wide_align_1.center(chalk_1.yellow(item.value), width_rule[item.type]);
    }).join('│') + "\u2502";
    var choices = [
        new inquire.Separator("" + stringz_1.limit('', tableWidth, '─')),
        new inquire.Separator(header),
        new inquire.Separator("" + stringz_1.limit('', tableWidth, '─'))
    ];
    datalist.forEach(function (item) {
        choices.push("\u2502" + item.map(function (item, index) {
            return wide_align_1.center(item, width_rule[heads[index].type]);
        }).join('│') + "\u2502");
        choices.push(new inquire.Separator("" + stringz_1.limit('', tableWidth, '─')));
    });
    return choices;
};
function askquestion(question, resolve) {
    return inquire.prompt(question).then(function (answers) {
        resolve(answers);
    }).catch(function (err) {
        console.log(err);
        process.exit();
    });
}
exports.default = askquestion;
