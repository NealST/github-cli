"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var fs_1 = require("fs");
var theHomeDir = os_1.homedir(); // home目录路径
var configFilePath = theHomeDir + "/githubUserInfo.json";
// 获取信息
exports.getInfo = function () {
    return (new Promise(function (resolve, reject) {
        fs_1.readFile(configFilePath, function (err, data) {
            if (err) {
                reject(err);
            }
            var filedata = data.toString();
            while (typeof filedata === 'string') {
                filedata = JSON.parse(filedata);
            }
            resolve(filedata);
        });
    })).catch(function (err) {
        console.log(err);
    });
};
// 存储信息
exports.saveInfo = function (saveOptions) {
    var writedata = JSON.stringify(saveOptions);
    return (new Promise(function (resolve, reject) {
        function filecb(err) {
            if (err) {
                reject(err);
            }
            resolve();
        }
        if (!fs_1.existsSync(configFilePath)) {
            fs_1.writeFile.call(this, configFilePath, writedata, filecb);
        }
        else {
            exports.getInfo().then(function (res) {
                var thewritedata = JSON.stringify(Object.assign(res, saveOptions));
                fs_1.writeFile.call(this, configFilePath, thewritedata, filecb);
            });
        }
    })).catch(function (err) {
        console.log(err);
    });
};
