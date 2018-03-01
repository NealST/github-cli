"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("./request");
var askQuestion_1 = require("./askQuestion");
var spinner_1 = require("./spinner");
var saveInfo_1 = require("./saveInfo");
var output_1 = require("./output");
var repos_1 = require("../action/repos");
// 获取想要操作的Github用户名
var getTargetUserName = function (message, fn, isNeedAsk) {
    if (isNeedAsk === void 0) { isNeedAsk = true; }
    function verifyName(username) {
        spinner_1.default.start('verifing the username you input');
        request_1.request("/users/" + username, 'get', {}).then(function (res) {
            spinner_1.default.succeed('username verify success');
            process.env.githubTargetUserName = username;
            // add those used names to an array to record some names used frequently
            saveInfo_1.getInfo().then(function (res) {
                var githubTargetUserNames = (Array.isArray(res.githubTargetUserNames) && res.githubTargetUserNames) || [];
                if (githubTargetUserNames.indexOf(username) < 0) {
                    githubTargetUserNames.push(username);
                    saveInfo_1.saveInfo({ githubTargetUserNames: githubTargetUserNames });
                }
            });
            fn && fn(username);
        }).catch(function (err) {
            getTargetUserName('the username you input is invalid,please input again:', fn);
        });
    }
    // if user do not input a username
    if (isNeedAsk) {
        askQuestion_1.default([{
                type: 'input',
                name: 'username',
                message: message
            }], function (answers) {
            var theInputName = answers.username;
            verifyName(theInputName);
        });
    }
    else {
        // if user has inputed a username
        verifyName(process.env.githubTargetUserName);
    }
};
// 获取当前主用户的Github用户名
var getSelfUserName = function (fn, isNeedGet) {
    if (isNeedGet === void 0) { isNeedGet = true; }
    function validateProcess(data) {
        if (!data.githubUserName) {
            getTargetUserName('please input your github username', function (validName) {
                process.env.githubUserName = validName;
                saveInfo_1.saveInfo({ githubUserName: validName });
                fn && fn(validName);
            });
        }
        else {
            process.env.githubUserName = data.githubUserName;
            fn && fn(data.githubUserName);
        }
    }
    if (isNeedGet) {
        saveInfo_1.getInfo().then(function (res) {
            validateProcess(res);
        });
    }
    else {
        validateProcess(process.env);
    }
};
// choose githubTargetUserName or githubUserName
exports.getUserName = function (fn, isNeedTarget) {
    if (isNeedTarget === void 0) { isNeedTarget = false; }
    if (isNeedTarget) {
        saveInfo_1.getInfo().then(function (res) {
            var githubTargetUserNames = res.githubTargetUserNames;
            if (githubTargetUserNames && githubTargetUserNames.length > 0) {
                askQuestion_1.default([{
                        type: 'list',
                        name: 'targetname',
                        message: 'you may want to select one from these usernames:',
                        choices: githubTargetUserNames.concat('no one matched')
                    }], function (answers) {
                    if (answers.targetname === 'no one matched') {
                        getTargetUserName('please input the target gihub username:', fn);
                    }
                    else {
                        fn(answers.targetname);
                    }
                });
            }
            else {
                getTargetUserName('please input the target gihub username:', fn);
            }
        });
    }
    else {
        if (!process.env.githubUserName) {
            saveInfo_1.getInfo().then(function (res) {
                if (!res.githubUserName) {
                    getSelfUserName(fn, false);
                }
                else {
                    process.env.githubUserName = res.githubUserName;
                    fn(res.githubUserName);
                }
            });
        }
        else {
            fn(process.env.githubUserName);
        }
    }
};
// check whether the repository name that user input is invalid
exports.validateRepos = function (username, reposname, fn) {
    function askRepos(message) {
        askQuestion_1.default([{
                type: 'input',
                name: 'reposname',
                message: message
            }], function (answers) {
            verifyRepo(answers.reposname);
        });
    }
    function verifyRepo(reposname) {
        spinner_1.default.start('verifying the repos name you input');
        request_1.request("/repos/" + username + "/" + reposname, 'get', {}).then(function (res) {
            spinner_1.default.succeed('repository verify success');
            fn(reposname);
        }).catch(function (err) {
            // 如果仓库校验失败，则提示用户重新操作
            spinner_1.default.fail('repository verify error');
            askRepos('the repo name you input is invalid, please input again:');
            console.log(err);
        });
    }
};
// get repositories of a github user to help user select
exports.selectRepos = function (fn, isNeedTarget, type) {
    if (isNeedTarget === void 0) { isNeedTarget = false; }
    if (type === void 0) { type = 'checkbox'; }
    function selectReposList(reposdataList, targetName) {
        if (reposdataList.length > 0) {
            var thereposNameList = reposdataList.map(function (item) {
                return item.name;
            });
            askQuestion_1.default([{
                    type: type,
                    name: 'reposlist',
                    message: 'please select the repository you need:',
                    choices: thereposNameList
                }], function (answers) {
                fn(answers.reposlist, targetName);
            });
        }
        else {
            output_1.info('no repositories existed!please create it first');
        }
    }
    if (isNeedTarget) {
        exports.getUserName(function (targetName) {
            repos_1.reposActions.getReposForUser(targetName).then(function (reposdataList) {
                selectReposList(reposdataList, targetName);
            });
        }, true);
    }
    else {
        repos_1.reposActions.getAll().then(function (reposdataList) {
            selectReposList(reposdataList);
        });
    }
};
// selectrepos
exports.selectReposWithMode = function (fn, type) {
    if (type === void 0) { type = 'list'; }
    if (process.env.githubUserMode === 'target') {
        exports.selectRepos(function (reposname, targetName) {
            fn(reposname, targetName);
        }, true, type);
    }
    else {
        exports.getUserName(function (ownername) {
            exports.selectRepos(function (reposname) {
                fn(reposname, ownername);
            }, false, type);
        });
    }
};
// 获取个人的access-token
exports.getToken = function () {
    return (new Promise(function (resolve, reject) {
        if (process.env.githubToken) {
            resolve();
        }
        else {
            saveInfo_1.getInfo().then(function (res) {
                if (!res.githubToken) {
                    askQuestion_1.default([{
                            type: 'input',
                            name: 'accesstoken',
                            message: 'please input your github access token:'
                        }], function (answers) {
                        var thetoken = answers.accesstoken;
                        process.env.githubToken = thetoken;
                        saveInfo_1.saveInfo({ githubToken: thetoken });
                        resolve();
                    });
                }
                else {
                    process.env.githubToken = res.githubToken;
                    resolve();
                }
            });
        }
    })).catch(function (err) {
        console.log(err);
    });
};
