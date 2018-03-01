"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../tools/request");
var verification_1 = require("../tools/verification");
var askQuestion_1 = require("../tools/askQuestion");
var tableShow_1 = require("../tools/tableShow");
var promiseCompose_1 = require("../tools/promiseCompose");
var output_1 = require("../tools/output");
var repos_1 = require("./repos");
exports.prActions = {
    // list all the pull requests of a repository
    listForRepos: function (listOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/pulls", 'get', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': request_1.previewAccept
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // create a pull request
    createPr: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/pulls", 'post', createOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': 'application/vnd.github.jean-grey-preview+json'
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // edit a pull request
    updatePr: function (updateOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + updateOptions.ownername + "/" + updateOptions.reposname + "/pulls/" + updateOptions.number, 'post', updateOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': request_1.previewAccept
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // check whether a pull request is merged
    isPrMerged: function (infoOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + infoOptions.ownername + "/" + infoOptions.reposname + "/pulls/" + infoOptions.number + "/merge", 'get', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': request_1.previewAccept
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // merge a pull request
    mergePr: function (mergeOptions, fn) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(mergeOptions.numbers.map(function (item) {
                    return request_1.request("/repos/" + mergeOptions.ownername + "/" + mergeOptions.reposname + "/pulls/" + item + "/merge", 'put', mergeOptions.data, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken,
                            'Accept': request_1.previewAccept
                        }
                    });
                }));
            }]);
    },
    // list reviews of a pull request
    listPrReviews: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/pulls/" + listOptions.number + "/reviews", 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    // delete reviews of a pull request
    deletePrReviews: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(deleteOptions.ids.map(function (item) {
                    return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/pulls/" + deleteOptions.number + "/reviews/" + item, 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    // get comments of a review of a pull request
    listCommentsForReview: function (getOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + getOptions.ownername + "/" + getOptions.reposname + "/pulls/" + getOptions.number + "/reviews/" + getOptions.id + "/comments", 'get', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // create a pull request review
    createPrReview: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/pulls/" + createOptions.number + "/reviews", 'post', createOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // submit pull request review
    submitPrReview: function (submitOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + submitOptions.ownername + "/" + submitOptions.reposname + "/pulls/" + submitOptions.number + "/reviews/" + submitOptions.id + "/events", 'post', submitOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // dismiss a pull request review
    dismissPrReview: function (disOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + disOptions.ownername + "/" + disOptions.reposname + "/pulls/" + disOptions.number + "/reviews/" + disOptions.id + "/dismissals", disOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list comments on a pull request
    listCommentsForPr: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/pulls/" + listOptions.number + "/comments", 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    // list comments in a repository
    listCommentsForRepo: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/pulls/comments", 'get', {}, {
            headers: {
                'Accept': 'application/vnd.github.squirrel-girl-preview'
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // edit a comment for repository pulls
    editComment: function (editOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + editOptions.ownername + "/" + editOptions.reposname + "/pulls/comments/" + editOptions.id, 'patch', editOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // delete a comment of repository pulls
    deleteComment: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(deleteOptions.ids.map(function (item) {
                    return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/pulls/comments/" + item, 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                }));
            }]);
    },
    // list review requests
    listReviewRequests: function (listOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/pulls/" + listOptions.number + "/requested_reviewers", 'get', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': 'application/vnd.github.thor-preview+json'
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // create a review request for a pull request
    createReviewRequest: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/pulls/" + createOptions.number + "/requested_reviewers", 'post', createOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': 'application/vnd.github.thor-preview+json'
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // delete review request of a pull request
    deleteReviewRequest: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/pulls/" + deleteOptions.number + "/requested_reviewers", 'delete', deleteOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': 'application/vnd.github.thor-preview+json'
                    }
                });
            }]);
    }
};
var selectPr = function (fn, type) {
    if (type === void 0) { type = 'list'; }
    verification_1.selectReposWithMode(function (reposname, targetName) {
        exports.prActions.listForRepos({
            ownername: targetName,
            reposname: reposname
        }).then(function (resdata) {
            if (resdata.length > 0) {
                var heads = [{
                        value: 'number',
                        type: 'number'
                    }, {
                        value: 'title',
                        type: 'title'
                    }, {
                        value: 'content',
                        type: 'description'
                    }, {
                        value: 'detailUrl(cmd+click)',
                        type: 'url'
                    }];
                askQuestion_1.default([{
                        type: type,
                        name: 'thepr',
                        message: 'please select the pull requests you want:',
                        choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                            return [String(item.number), item.title, item.body || 'no content', item.html_url];
                        }))
                    }], function (answers) {
                    var selectPrs = type === 'list' ? answers.thepr.split('│')[1].trim() : answers.thepr.map(function (item) {
                        return item.split('│')[1].trim();
                    });
                    fn(targetName, reposname, selectPrs);
                });
            }
            else {
                output_1.info('no pull requests existed!please create it first');
            }
        });
    });
};
exports.prStrategies = {
    'ls': {
        '-r': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.prActions.listForRepos({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no pull requests existed!');
                    }
                    else {
                        var dataTable_1 = tableShow_1.default({
                            head: ['number', 'title', 'state', 'content', 'detailUrl(cmd+click)'],
                            colWidths: [10, 20, 10, 40, 60],
                            wordWrap: true
                        });
                        resdata.forEach(function (item) {
                            dataTable_1.push([item.number, item.title, item.state, item.body || 'no content', item.html_url]);
                        });
                        console.log(dataTable_1.toString());
                    }
                });
            });
        },
        '-v': function () {
            selectPr(function (ownername, reposname, prnumber) {
                exports.prActions.listPrReviews({
                    ownername: ownername,
                    reposname: reposname,
                    number: prnumber
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no reviews existed for this pull request');
                    }
                    else {
                        var dataTable_2 = tableShow_1.default({
                            head: ['id', 'creator', 'content', 'state', 'detailUrl(cmd+click)'],
                            colWidths: [10, 20, 40, 20, 60],
                            wordWrap: true
                        });
                        resdata.forEach(function (item) {
                            dataTable_2.push([item.id, item.user.login, item.body || 'no content', item.state, item.html_url]);
                        });
                        console.log(dataTable_2.toString());
                    }
                });
            });
        },
        '-c': function () {
            selectPr(function (ownername, reposname, prnumber) {
                exports.prActions.listCommentsForPr({
                    ownername: ownername,
                    reposname: reposname,
                    number: prnumber
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no comments existed for this pull request!');
                    }
                    else {
                        var dataTable_3 = tableShow_1.default({
                            head: ['id', 'creator', 'content', 'detailUrl(cmd+click)'],
                            colWidths: [10, 20, 40, 60],
                            wordWrap: true
                        });
                        resdata.forEach(function (item) {
                            dataTable_3.push([item.id, item.user.login, item.body, item.html_url]);
                        });
                        console.log(dataTable_3.toString());
                    }
                });
            });
        },
        '-cw': function () {
            selectPr(function (ownername, reposname, prnumber) {
                exports.prActions.listPrReviews({
                    ownername: ownername,
                    reposname: reposname,
                    number: prnumber
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no reviews existed for this pull request');
                    }
                    else {
                        var heads = [{
                                value: 'id',
                                type: 'number'
                            }, {
                                value: 'state',
                                type: 'title'
                            }, {
                                value: 'content',
                                type: 'description'
                            }, {
                                value: 'detailUrl(cmd+click)',
                                type: 'url'
                            }];
                        askQuestion_1.default([{
                                type: 'list',
                                name: 'review',
                                message: 'please select a review from this list:',
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.state, item.body, item.html_url];
                                }))
                            }], function (answers) {
                            exports.prActions.listCommentsForReview({
                                ownername: ownername,
                                reposname: reposname,
                                number: prnumber,
                                id: answers.review.split('│')[1].trim()
                            }).then(function (resdata) {
                                if (resdata.length === 0) {
                                    output_1.info('no comments existed for this review!');
                                }
                                else {
                                    var dataTable_4 = tableShow_1.default({
                                        head: ['id', 'creator', 'content', 'detailUrl(cmd+click)'],
                                        colWidths: [10, 20, 40, 60],
                                        wordWrap: true
                                    });
                                    resdata.forEach(function (item) {
                                        dataTable_4.push([item.id, item.user.login, item.body, item.html_url]);
                                    });
                                    console.log(dataTable_4.toString());
                                }
                            });
                        });
                    }
                });
            });
        },
        '-cr': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.prActions.listCommentsForRepo({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no comments existed for this repository!');
                    }
                    else {
                        var dataTable_5 = tableShow_1.default({
                            head: ['id', 'creator', 'content', 'detailUrl(cmd+click)'],
                            colWidths: [10, 20, 40, 60],
                            wordWrap: true
                        });
                        resdata.forEach(function (item) {
                            dataTable_5.push([item.id, item.user.login, item.body, item.html_url]);
                        });
                        console.log(dataTable_5.toString());
                    }
                });
            });
        },
        '-rp': function () {
            selectPr(function (ownername, reposname, prnumber) {
                exports.prActions.listReviewRequests({
                    ownername: ownername,
                    reposname: reposname,
                    number: prnumber
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        var dataTable = tableShow_1.default({
                            head: ['reviewers', 'team_reviewers'],
                            colWidths: [20, 20]
                        });
                        var usersdata = resdata.users;
                        var teamdata = resdata.teams;
                        var thelength = Math.max(usersdata.length, teamdata.length);
                        for (var i = 0; i < thelength; i++) {
                            dataTable.push([(usersdata[i] && usersdata[i].login) || 'no user reviewers', (teamdata[i] && teamdata[i].name) || 'no team reviewers']);
                        }
                        console.log(dataTable.toString());
                    }
                    else {
                        output_1.info('no review request existed!');
                    }
                });
            });
        }
    },
    'cr': {
        '-p': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                function createPr(headBranches, baseBranches, reposInfo) {
                    askQuestion_1.default([{
                            type: 'input',
                            name: 'title',
                            message: 'please input the title of this pull request:'
                        }, {
                            type: 'editor',
                            name: 'description',
                            message: 'please input the description for this pull request:'
                        }, {
                            type: 'list',
                            name: 'head',
                            message: 'please select the head branch name:',
                            choices: headBranches
                        }, {
                            type: 'list',
                            name: 'base',
                            message: 'please select the base branch name:',
                            choices: baseBranches
                        }], function (answers) {
                        exports.prActions.createPr({
                            ownername: reposInfo.ownername,
                            reposname: reposInfo.reposname,
                            data: {
                                title: answers.title,
                                head: process.env.githubUserMode === 'target' ? reposInfo.ownname + ":" + answers.head : answers.head,
                                base: answers.base
                            }
                        }).then(function (resdata) {
                            output_1.success('create pull request success!');
                            var dataTable = tableShow_1.default({
                                head: ['number', 'title', 'state', 'description', 'detailUrl(cmd+click)'],
                                colWidths: [10, 20, 10, 40, 60],
                                wordWrap: true
                            });
                            dataTable.push([resdata.number, resdata.title, resdata.state, resdata.body || 'no description', resdata.html_url]);
                            console.log(dataTable.toString());
                        });
                    });
                }
                repos_1.reposActions.getBranches({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    var branches = resdata.map(function (item) {
                        return item.name;
                    });
                    if (process.env.githubUserMode === 'target') {
                        verification_1.getUserName(function (username) {
                            repos_1.reposActions.getBranches({
                                ownername: username,
                                reposname: reposname
                            }).then(function (resdata) {
                                var headBranches = resdata.map(function (item) {
                                    return item.name;
                                });
                                createPr(headBranches, branches, {
                                    ownername: targetName,
                                    reposname: reposname,
                                    ownname: username
                                });
                            });
                        });
                    }
                    else {
                        createPr(branches, branches, {
                            ownername: targetName,
                            reposname: reposname
                        });
                    }
                });
            });
        },
        '-pr': function () {
            selectPr(function (ownername, reposname, prnumber) {
                function successProcess(resdata) {
                    output_1.success('create pull request review success!');
                    var dataTable = tableShow_1.default({
                        head: ['id', 'content', 'state', 'detailUrl(cmd+click)'],
                        colWidths: [10, 40, 20, 60],
                        wordWrap: true
                    });
                    dataTable.push([resdata.id, resdata.body, resdata.state, resdata.html_url]);
                    console.log(dataTable.toString());
                }
                askQuestion_1.default([{
                        type: 'list',
                        name: 'event',
                        message: 'please select a review type:',
                        choices: ['APPROVE', 'REQUEST_CHANGES', 'COMMENT']
                    }], function (answers) {
                    if (answers.event !== 'APPROVE') {
                        askQuestion_1.default([{
                                type: 'editor',
                                name: 'body',
                                message: 'please input the content of review:'
                            }], function (bodyanswers) {
                            exports.prActions.createPrReview({
                                ownername: ownername,
                                reposname: reposname,
                                number: prnumber,
                                data: {
                                    body: bodyanswers.body,
                                    event: answers.event
                                }
                            }).then(function (resdata) {
                                successProcess(resdata);
                            });
                        });
                    }
                    else {
                        exports.prActions.createPrReview({
                            ownername: ownername,
                            reposname: reposname,
                            number: prnumber,
                            data: {
                                event: answers.event
                            }
                        }).then(function (resdata) {
                            successProcess(resdata);
                        });
                    }
                });
            });
        },
        '-rp': function () {
            selectPr(function (ownername, reposname, prnumber) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'reviewers',
                        message: 'please input the names of reviewers(reviewers must be a collaborator, split with space):'
                    }, {
                        type: 'confirm',
                        name: 'needteam',
                        message: 'Do you need add team reviewers?:'
                    }], function (firstanswers) {
                    if (firstanswers.needteam) {
                        askQuestion_1.default([{
                                type: 'input',
                                name: 'teamviewers',
                                message: 'please input the names of team reviewers(split with space):'
                            }], function (answers) {
                            exports.prActions.createReviewRequest({
                                ownername: ownername,
                                reposname: reposname,
                                number: prnumber,
                                data: {
                                    reviewers: firstanswers.reviewers.split(' '),
                                    team_reviewers: answers.teamviewers.split(' ')
                                }
                            }).then(function (resdata) {
                                output_1.success('create review request success!');
                            });
                        });
                    }
                    else {
                        exports.prActions.createReviewRequest({
                            ownername: ownername,
                            reposname: reposname,
                            number: prnumber,
                            data: {
                                reviewers: firstanswers.reviewers.split(' ')
                            }
                        }).then(function (resdata) {
                            output_1.success('create review request success!');
                        });
                    }
                });
            });
        }
    },
    'et': {
        '-p': function () {
            var questionObject = {
                title: {
                    type: 'input',
                    name: 'title',
                    message: 'please input the title of this pull request:'
                },
                body: {
                    type: 'editor',
                    name: 'body',
                    message: 'please input the content of this pull request:'
                },
                state: {
                    type: 'list',
                    name: 'state',
                    message: 'please select a new state for this pull request:',
                    choices: ['open', 'closed']
                },
                base: {
                    type: 'input',
                    name: 'base',
                    message: 'please input the base branch name:'
                }
            };
            selectPr(function (ownername, reposname, prnumber) {
                askQuestion_1.default([{
                        type: 'checkbox',
                        name: 'changetypes',
                        message: 'please select some items you want to update:',
                        choices: ['title', 'body', 'state', 'base']
                    }], function (answers) {
                    var questionArray = [];
                    answers.changetypes.forEach(function (item) {
                        questionArray.push(questionObject[item]);
                    });
                    askQuestion_1.default(questionArray, function (editanswers) {
                        exports.prActions.updatePr({
                            ownername: ownername,
                            reposname: reposname,
                            number: prnumber,
                            data: editanswers
                        }).then(function (resdata) {
                            output_1.success('update pull request success!');
                            var dataTable = tableShow_1.default({
                                head: ['number', 'title', 'state', 'description', 'detailUrl(cmd+click)'],
                                colWidths: [10, 20, 10, 40, 60],
                                wordWrap: true
                            });
                            dataTable.push([resdata.number, resdata.title, resdata.state, resdata.body || 'no content', resdata.html_url]);
                            console.log(dataTable.toString());
                        });
                    });
                });
            });
        },
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.prActions.listCommentsForRepo({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no comments existed for this repository!you need create it first');
                    }
                    else {
                        var heads = [{
                                value: 'id',
                                type: 'number'
                            }, {
                                value: 'content',
                                type: 'description'
                            }, {
                                value: 'detailUrl(cmd+click)',
                                type: 'url'
                            }];
                        askQuestion_1.default([{
                                type: 'list',
                                name: 'comment',
                                message: 'please select a comment to be edited:',
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.body || 'no content', item.html_url];
                                }))
                            }, {
                                type: 'editor',
                                name: 'body',
                                message: 'please input the content of this comment:'
                            }], function (answers) {
                            exports.prActions.editComment({
                                ownername: targetName,
                                reposname: reposname,
                                id: answers.comment.split('│')[1].trim(),
                                data: {
                                    body: answers.body
                                }
                            }).then(function (resdata) {
                                output_1.success('update comment success!');
                                var dataTable = tableShow_1.default({
                                    head: ['id', 'content', 'detailUrl(cmd+click)'],
                                    colWidths: [10, 40, 60],
                                    wordWrap: true
                                });
                                dataTable.push([resdata.id, resdata.body, resdata.html_url]);
                                console.log(dataTable.toString());
                            });
                        });
                    }
                });
            });
        }
    },
    'rm': {
        '-v': function () {
            selectPr(function (ownername, reposname, prnumber) {
                exports.prActions.listPrReviews({
                    ownername: ownername,
                    reposname: reposname,
                    number: prnumber
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no reviews existed for this pull request! you need create it first');
                    }
                    else {
                        var heads = [{
                                value: 'id',
                                type: 'number'
                            }, {
                                value: 'content',
                                type: 'description'
                            }, {
                                value: 'state',
                                type: 'title'
                            }, {
                                value: 'detailUrl(cmd+click)',
                                type: 'url'
                            }];
                        askQuestion_1.default([{
                                type: 'checkbox',
                                name: 'reviewids',
                                message: 'please select some reviews to be removed:',
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.body, item.state, item.html_url];
                                }))
                            }], function (answers) {
                            exports.prActions.deletePrReviews({
                                ownername: ownername,
                                reposname: reposname,
                                number: prnumber,
                                ids: answers.reviewids.map(function (item) {
                                    return item.split('│')[1].trim();
                                })
                            }).then(function (res) {
                                output_1.success('delete reviews success!');
                            });
                        });
                    }
                });
            });
        },
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.prActions.listCommentsForRepo({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no comments existed!you need create it first');
                    }
                    else {
                        var heads = [{
                                value: 'id',
                                type: 'number'
                            }, {
                                value: 'content',
                                type: 'description'
                            }, {
                                value: 'detailUrl(cmd+click)',
                                type: 'url'
                            }];
                        askQuestion_1.default([{
                                type: 'checkbox',
                                name: 'comments',
                                message: 'please select some comments to be removed:',
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.body || 'no content', item.html_url];
                                }))
                            }], function (answers) {
                            exports.prActions.deleteComment({
                                ownername: targetName,
                                reposname: reposname,
                                ids: answers.comments.map(function (item) {
                                    return item.split('│')[1].trim();
                                })
                            });
                        });
                    }
                });
            });
        },
        '-r': function () {
            selectPr(function (ownername, reposname, prnumber) {
                exports.prActions.deleteReviewRequest({
                    ownername: ownername,
                    reposname: reposname,
                    number: prnumber
                }).then(function (resdata) {
                    output_1.success('delete review request success!');
                });
            });
        }
    },
    'mr': function () {
        selectPr(function (ownername, reposname, prnumbers) {
            askQuestion_1.default([{
                    type: 'list',
                    name: 'method',
                    message: 'please select a merge type:',
                    choices: ['merge', 'squash', 'rebase']
                }], function (answers) {
                exports.prActions.mergePr({
                    ownername: ownername,
                    reposname: reposname,
                    numbers: prnumbers,
                    data: {
                        merge_method: answers.method
                    }
                }).then(function (resdata) {
                    output_1.success('Pull Request successfully merged!');
                });
            });
        }, 'checkbox');
    },
    'st': function () {
        selectPr(function (ownername, reposname, prnumber) {
            exports.prActions.listPrReviews({
                ownername: ownername,
                reposname: reposname,
                number: prnumber
            }).then(function (resdata) {
                if (resdata.length === 0) {
                    output_1.info('no reviews existed for this pull request');
                }
                else {
                    var heads = [{
                            value: 'id',
                            type: 'number'
                        }, {
                            value: 'content',
                            type: 'description'
                        }, {
                            value: 'state',
                            type: 'title'
                        }, {
                            value: 'detailUrl(cmd+click)',
                            type: 'url'
                        }];
                    askQuestion_1.default([{
                            type: 'list',
                            name: 'review',
                            message: 'please select a review to be submitted:',
                            choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                return [String(item.id), item.body || 'no content', item.state, item.html_url];
                            }))
                        }, {
                            type: 'input',
                            name: 'body',
                            message: 'please input the content of this review'
                        }, {
                            type: 'list',
                            name: 'event',
                            message: 'please select a reaction type:',
                            choices: ['APPROVE', 'REQUEST_CHANGES', 'COMMENT']
                        }], function (answers) {
                        exports.prActions.submitPrReview({
                            ownername: ownername,
                            reposname: reposname,
                            number: prnumber,
                            id: answers.review.split('│')[1].trim(),
                            data: {
                                body: answers.body,
                                event: answers.event
                            }
                        }).then(function (resdata) {
                            output_1.success('submit a pull request review success!');
                            var dataTable = tableShow_1.default({
                                head: ['id', 'content', 'state', 'detailUrl(cmd+click)'],
                                colWidths: [10, 40, 20, 60],
                                wordWrap: true
                            });
                            dataTable.push([resdata.id, resdata.body, resdata.state, resdata.html_ul]);
                            console.log(dataTable.toString());
                        });
                    });
                }
            });
        });
    },
    'ds': function () {
        selectPr(function (ownername, reposname, prnumber) {
            exports.prActions.listPrReviews({
                ownername: ownername,
                reposname: reposname,
                number: prnumber
            }).then(function (resdata) {
                if (resdata.length === 0) {
                    output_1.info('no reviews existed for this pull request');
                }
                else {
                    var heads = [{
                            value: 'id',
                            type: 'number'
                        }, {
                            value: 'content',
                            type: 'description'
                        }, {
                            value: 'state',
                            type: 'title'
                        }, {
                            value: 'detailUrl(cmd+click)',
                            type: 'url'
                        }];
                    askQuestion_1.default([{
                            type: 'list',
                            name: 'review',
                            message: 'please select a review to be dismissed:',
                            choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                return [String(item.id), item.body || 'no content', item.state, item.html_url];
                            }))
                        }, {
                            type: 'input',
                            name: 'message',
                            message: 'please input the message for the pull request review dismissal'
                        }], function (answers) {
                        exports.prActions.dismissPrReview({
                            ownername: ownername,
                            reposname: reposname,
                            number: prnumber,
                            id: answers.review.split('│')[1].trim(),
                            data: {
                                message: answers.message
                            }
                        }).then(function (resdata) {
                            output_1.success('pull request review dismissed success!');
                            var dataTable = tableShow_1.default({
                                head: ['id', 'content', 'state', 'detailUrl(cmd+click)'],
                                colWidths: [10, 40, 20, 60],
                                wordWrap: true
                            });
                            dataTable.push([resdata.id, resdata.body || 'no content', resdata.state, resdata.html_url]);
                            console.log(dataTable.toString());
                        });
                    });
                }
            });
        });
    }
};
