"use strict";
// 客户端请求模块
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var output_1 = require("./output");
exports.thedomain = 'https://api.github.com';
exports.previewAccept = 'application/vnd.github.mercy-preview+json';
// 客户端请求封装
exports.request = function (url, type, data, requestOptions) {
    var ajaxdata = type === 'get' ? { params: data } : { data: data, withCredentials: true };
    var configOptions = Object.assign(__assign({ url: "" + exports.thedomain + url, method: type, timeout: 5000 }, ajaxdata), requestOptions || {});
    // there are some problems with axios promise, so I wrapped a new promise
    return (new Promise(function (resolve, reject) {
        axios(configOptions).catch(function (err) {
            reject(err);
        }).then(function (res) {
            // 备注，star仓库等操作成功后也会返回204
            if (res.status === 204 && process.env.githubActionType === 'remove') {
                output_1.success('delete success!');
            }
            resolve(res);
        });
    })).catch(function (err) {
        if (err.response.status === 404 && process.argv.indexOf('ck') > 0) {
            output_1.error('this user is not a collaborator!');
            return;
        }
        if (err.response && err.response.data) {
            output_1.error(err.response.statusText);
            output_1.error(err.response.data.message);
            /*if (err.response.status === 401) {
              error('you are unauthorized')
            }
            if (err.response.status === 403) {
              error('your authentication is forbidden')
            }
            if (err.response.status === 410) {
              error('current action is disabled or deprecated')
            }
            if (err.response.status === 422) {
              error('unprocessable request,maybe the data you input is invalid')
            }
            if (err.response.status === 405)*/
            // 有些查看操作，checkcolloborators如果结果为否会返回404
        }
        if (err.message === 'timeout of 5000ms exceeded') {
            output_1.error('request timeout,please try again');
        }
        process.exit();
    });
};
