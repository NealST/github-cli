"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../tools/request");
var verification_1 = require("../tools/verification");
var promiseCompose_1 = require("../tools/promiseCompose");
var askQuestion_1 = require("../tools/askQuestion");
var tableShow_1 = require("../tools/tableShow");
var output_1 = require("../tools/output");
exports.userActions = {
    // update personal info about a user
    editUser: function (editOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request('/user', 'patch', editOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list followers of a user
    listFollowers: function (listOptions) {
        return request_1.request("/users/" + listOptions.username + "/followers", 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    // list own followers
    listOwnFollowers: function () {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request('/user/followers', 'get', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list who a user is following
    listFollowing: function (listOptions) {
        return request_1.request("/users/" + listOptions.username + "/following", 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    // list own following
    listOwnFollowing: function () {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request('/user/following', 'get', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // follow a user
    addFollower: function (options) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/user/following/" + options.username, 'put', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // unfollow a user
    deleteFollower: function (options) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(options.usernames.map(function (item) {
                    return request_1.request("/user/following/" + item, 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    }
};
exports.userStrategy = {
    'ls': {
        '-m': function () {
            function dataShow(datalist) {
                if (datalist.length > 0) {
                    var dataTable_1 = tableShow_1.default({
                        head: ['name', 'detailUrl(cmd+click)'],
                        colWidths: [20, 60]
                    });
                    datalist.forEach(function (item) {
                        dataTable_1.push([item.login, item.html_url]);
                    });
                    console.log(dataTable_1.toString());
                }
                else {
                    output_1.info('no followers existed!');
                }
            }
            if (process.env.githubUserMode === 'target') {
                verification_1.getUserName(function (ownername) {
                    exports.userActions.listFollowers({ username: ownername }).then(dataShow);
                }, true);
            }
            else {
                exports.userActions.listOwnFollowers().then(dataShow);
            }
        },
        '-t': function () {
            function dataShow(datalist) {
                if (datalist.length > 0) {
                    var dataTable_2 = tableShow_1.default({
                        head: ['name', 'detailUrl(cmd+click)'],
                        colWidths: [20, 60]
                    });
                    datalist.forEach(function (item) {
                        dataTable_2.push([item.login, item.html_url]);
                    });
                    console.log(dataTable_2.toString());
                }
                else {
                    output_1.info('no following existed!');
                }
            }
            if (process.env.githubUserMode === 'target') {
                verification_1.getUserName(function (ownername) {
                    exports.userActions.listFollowing({ username: ownername }).then(dataShow);
                }, true);
            }
            else {
                exports.userActions.listOwnFollowing().then(dataShow);
            }
        }
    },
    'et': function () {
        var questionObject = {
            name: {
                type: 'input',
                name: 'name',
                message: 'please input your new name:'
            },
            email: {
                type: 'input',
                name: 'email',
                message: 'please input your new email address:'
            },
            blog: {
                type: 'input',
                name: 'blog',
                message: 'please input your new blog url address:'
            },
            company: {
                type: 'input',
                name: 'company',
                message: 'please input your new company name:'
            },
            location: {
                type: 'input',
                name: 'location',
                message: 'please input your new location:'
            },
            hireable: {
                type: 'confirm',
                name: 'hireable',
                message: 'are you hireable?:'
            }
        };
        askQuestion_1.default([{
                type: 'checkbox',
                name: 'filter',
                message: 'please select items you want to update:',
                choices: Object.keys(questionObject)
            }], function (answers) {
            var questionArray = answers.filter.map(function (item) {
                return questionObject[item];
            });
            askQuestion_1.default(questionArray, function (theanswers) {
                exports.userActions.editUser({
                    data: theanswers
                }).then(function () {
                    output_1.success('update personal information success!');
                });
            });
        });
    },
    'fl': function () {
        verification_1.getUserName(function (username) {
            exports.userActions.addFollower({ username: username }).then(function (res) {
                output_1.success('add following success!');
            });
        }, true);
    },
    'rf': function () {
        exports.userActions.listOwnFollowing().then(function (resdata) {
            if (resdata.length > 0) {
                var heads = [{
                        value: 'name',
                        type: 'title'
                    }, {
                        value: 'detailUrl(cmd+click)',
                        type: 'url'
                    }];
                askQuestion_1.default([{
                        type: 'checkbox',
                        name: 'removers',
                        message: 'please select some following users to remove:',
                        choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                            return [item.login, item.html_url];
                        }))
                    }], function (answers) {
                    exports.userActions.deleteFollower({
                        usernames: answers.removers.map(function (item) {
                            return item.split('│')[1].trim();
                        })
                    });
                });
            }
            else {
                output_1.info('no following users existed!');
            }
        });
    }
};
