"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
exports.mainTitle = function (message) {
    console.log(chalk.magentaBright('   ' + message));
};
exports.subTitle = function (message) {
    console.log('\n' + chalk.yellow('      ' + message));
};
exports.describe = function (message) {
    console.log(message ? chalk.blue('      ' + message) : '');
};
exports.command = function (message) {
    console.log(message ? chalk.cyan('      ' + message) : '');
};
exports.example = function (message) {
    console.log(message ? chalk.yellow('      ' + message) : '');
};
exports.success = function (message) {
    console.log(chalk.green(message));
};
exports.error = function (message) {
    console.log(chalk.red(message));
};
exports.info = function (message) {
    console.log(chalk.cyan(message));
};
