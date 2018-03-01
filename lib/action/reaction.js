"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../tools/request");
var verification_1 = require("../tools/verification");
var promiseCompose_1 = require("../tools/promiseCompose");
var askQuestion_1 = require("../tools/askQuestion");
var tableShow_1 = require("../tools/tableShow");
var repos_1 = require("./repos");
var pullrequest_1 = require("./pullrequest");
var issues_1 = require("./issues");
var output_1 = require("../tools/output");
var askQuestion_2 = require("../tools/askQuestion");
var node_emoji_1 = require("node-emoji");
var acceptType = 'application/vnd.github.squirrel-girl-preview+json';
exports.rtActions = {
    // list reactions for a commit comment
    listForCommitComment: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/comments/" + listOptions.id + "/reactions", 'get', {}, {
            headers: {
                'Accept': acceptType
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // create reaction for a commit comment
    createForCommitComment: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/comments/" + createOptions.id + "/reactions", 'post', createOptions.data, {
                    headers: {
                        'Accept': acceptType,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list reactions for an issue
    listForIssue: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/issues/" + listOptions.number + "/reactions", 'get', {}, {
            headers: {
                'Accept': acceptType
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // create reaction for an issue
    createForIssue: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/issues/" + createOptions.number + "/reactions", 'post', createOptions.data, {
                    headers: {
                        'Accept': acceptType,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list reactions for an issue comment
    listForIssueComment: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/issues/comments/" + listOptions.id + "/reactions", 'get', {}, {
            headers: {
                'Accept': acceptType
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // create reaction for an issue comment
    createForIssueComment: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/issues/comments/" + createOptions.id + "/reactions", 'post', createOptions.data, {
                    headers: {
                        'Accept': acceptType,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list reactions for a pull request review comment
    listForPrReviewComment: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/pulls/comments/" + listOptions.id + "/reactions", 'get', {}, {
            headers: {
                'Accept': acceptType
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // create reaction for a pull request review comment
    createForPrReviewComment: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/pulls/comments/" + createOptions.id + "/reactions", 'post', createOptions.data, {
                    headers: {
                        'Accept': acceptType,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    }
};
var emojiMap = {
    '+1': '+1',
    '-1': '-1',
    'laugh': 'grinning',
    'confused': 'confused',
    'heart': 'heart',
    'hooray': 'tada'
};
var getReaction = function (emoji) {
    return Object.keys(emojiMap).filter(function (item) {
        return node_emoji_1.get(emojiMap[item]) === emoji;
    })[0];
};
exports.reactionStrategy = {
    'ls': {
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                repos_1.reposActions.listCommitComments({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length == 0) {
                        output_1.info('no commit comments existed!');
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
                                message: 'please select a commit comment:',
                                choices: askQuestion_2.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.body, item.html_url];
                                }))
                            }], function (answers) {
                            exports.rtActions.listForCommitComment({
                                ownername: ownername,
                                reposname: reposname,
                                id: answers.comment.split('│')[1].trim()
                            }).then(function (resdata) {
                                if (resdata.length === 0) {
                                    output_1.info('no reactions existed for this commit comment!');
                                }
                                else {
                                    var dataTable_1 = tableShow_1.default({
                                        head: ['id', 'reaction', 'creator', 'create_date'],
                                        colWidths: [10, 10, 20, 40]
                                    });
                                    resdata.forEach(function (item) {
                                        dataTable_1.push([item.id, node_emoji_1.get(emojiMap[item.content]), item.user.login, item.created_at]);
                                    });
                                    console.log(dataTable_1.toString());
                                }
                            });
                        });
                    }
                });
            });
        },
        '-i': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                issues_1.issueActions.listForRepos({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no issues existed!');
                    }
                    else {
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
                                type: 'list',
                                name: 'issueItem',
                                message: 'please select a issue from this list:',
                                choices: askQuestion_2.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.number), item.title, item.body || 'no content', item.html_url];
                                }))
                            }], function (answers) {
                            exports.rtActions.listForIssue({
                                ownername: ownername,
                                reposname: reposname,
                                number: answers.issueItem.split('│')[1].trim()
                            }).then(function (resdata) {
                                if (resdata.length > 0) {
                                    var dataTable_2 = tableShow_1.default({
                                        head: ['id', 'reaction', 'creator', 'create_date'],
                                        colWidths: [10, 10, 20, 40]
                                    });
                                    resdata.forEach(function (item) {
                                        dataTable_2.push([item.id, node_emoji_1.get(emojiMap[item.content]), item.user.login, item.created_at]);
                                    });
                                    console.log(dataTable_2.toString());
                                }
                                else {
                                    output_1.info('no reactions existed for this issue');
                                }
                            });
                        });
                    }
                });
            });
        },
        '-ic': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                issues_1.issueActions.listCommentsForRepo({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no issue comments existed!');
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
                                message: 'please select a comment:',
                                choices: askQuestion_2.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.body || 'no content', item.html_url];
                                }))
                            }], function (answers) {
                            exports.rtActions.listForIssueComment({
                                ownername: ownername,
                                reposname: reposname,
                                id: answers.comment.split('│')[1].trim()
                            }).then(function (resdata) {
                                if (resdata.length > 0) {
                                    var dataTable_3 = tableShow_1.default({
                                        head: ['id', 'reaction', 'creator', 'create_date'],
                                        colWidths: [10, 10, 20, 40]
                                    });
                                    resdata.forEach(function (item) {
                                        dataTable_3.push([item.id, node_emoji_1.get(emojiMap[item.content]), item.user.login, item.created_at]);
                                    });
                                    console.log(dataTable_3.toString());
                                }
                                else {
                                    output_1.info('no reactions existed for this issue comment');
                                }
                            });
                        });
                    }
                });
            });
        },
        '-p': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                pullrequest_1.prActions.listCommentsForRepo({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no pull request comments existed!');
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
                                message: 'please select a comment:',
                                choices: askQuestion_2.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.body || 'no content', item.html_url];
                                }))
                            }], function (answers) {
                            exports.rtActions.listForPrReviewComment({
                                ownername: ownername,
                                reposname: reposname,
                                id: answers.comment.split('│')[1].trim()
                            }).then(function (resdata) {
                                if (resdata.length > 0) {
                                    var dataTable_4 = tableShow_1.default({
                                        head: ['id', 'reaction', 'creator', 'create_date'],
                                        colWidths: [10, 10, 20, 40]
                                    });
                                    resdata.forEach(function (item) {
                                        dataTable_4.push([item.id, node_emoji_1.get(emojiMap[item.content]), item.user.login, item.created_at]);
                                    });
                                    console.log(dataTable_4.toString());
                                }
                                else {
                                    output_1.info('no reactions existed for this review comment');
                                }
                            });
                        });
                    }
                });
            });
        }
    },
    'cr': {
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                repos_1.reposActions.listCommitComments({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no commit comments existed!');
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
                                message: 'please select a commit comment:',
                                choices: askQuestion_2.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.body || 'no content', item.html_url];
                                }))
                            }, {
                                type: 'list',
                                name: 'reaction',
                                message: 'please select a reaction type:',
                                choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray'].map(function (item) {
                                    return node_emoji_1.get(emojiMap[item]);
                                })
                            }], function (answers) {
                            exports.rtActions.createForCommitComment({
                                ownername: ownername,
                                reposname: reposname,
                                id: answers.comment.split('│')[1].trim(),
                                data: {
                                    content: getReaction(answers.reaction)
                                }
                            }).then(function (resdata) {
                                output_1.success('create reaction for commit comment success!');
                                var dataTable = tableShow_1.default({
                                    head: ['id', 'creator', 'reaction', 'create_date'],
                                    colWidths: [10, 20, 20, 40]
                                });
                                dataTable.push([resdata.id, resdata.user.login, node_emoji_1.get(emojiMap[resdata.content]), resdata.created_at]);
                                console.log(dataTable.toString());
                            });
                        });
                    }
                });
            });
        },
        '-i': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                issues_1.issueActions.listForRepos({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no issues existed!');
                    }
                    else {
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
                                type: 'list',
                                name: 'issueItem',
                                message: 'please select a issue from this list:',
                                choices: askQuestion_2.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.number), item.title, item.body || 'no content', item.html_url];
                                }))
                            }, {
                                type: 'list',
                                name: 'reaction',
                                message: 'please select a reaction type:',
                                choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray'].map(function (item) {
                                    return node_emoji_1.get(emojiMap[item]);
                                })
                            }], function (answers) {
                            exports.rtActions.createForIssue({
                                ownername: ownername,
                                reposname: reposname,
                                number: answers.issueItem.split('│')[1].trim(),
                                data: {
                                    content: getReaction(answers.reaction)
                                }
                            }).then(function (resdata) {
                                output_1.success('reaction for issue created success!');
                                var dataTable = tableShow_1.default({
                                    head: ['id', 'creator', 'reaction', 'create_date'],
                                    colWidths: [10, 20, 20, 40]
                                });
                                dataTable.push([resdata.id, resdata.user.login, node_emoji_1.get(emojiMap[resdata.content]), resdata.created_at]);
                                console.log(dataTable.toString());
                            });
                        });
                    }
                });
            });
        },
        '-ic': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                issues_1.issueActions.listCommentsForRepo({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no issue comments existed!');
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
                                message: 'please select a comment:',
                                choices: askQuestion_2.createChoiceTable(heads, resdata.forEach(function (item) {
                                    return [String(item.id), item.body, item.html_url];
                                }))
                            }, {
                                type: 'list',
                                name: 'reaction',
                                message: 'please select a reaction type:',
                                choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray'].map(function (item) {
                                    return node_emoji_1.get(emojiMap[item]);
                                })
                            }], function (answers) {
                            exports.rtActions.createForIssueComment({
                                ownername: ownername,
                                reposname: reposname,
                                id: answers.comment.split('│')[1].trim(),
                                data: {
                                    content: getReaction(answers.reaction)
                                }
                            }).then(function (resdata) {
                                output_1.success('reaction for issue comment created success!');
                                var dataTable = tableShow_1.default({
                                    head: ['id', 'creator', 'reaction', 'create_date'],
                                    colWidths: [10, 20, 20, 40]
                                });
                                dataTable.push([resdata.id, resdata.user.login, node_emoji_1.get(emojiMap[resdata.content]), resdata.created_at]);
                                console.log(dataTable.toString());
                            });
                        });
                    }
                });
            });
        },
        '-p': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                pullrequest_1.prActions.listCommentsForRepo({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no pull request comments existed!');
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
                                message: 'please select a comment:',
                                choices: askQuestion_2.createChoiceTable(heads, resdata.map(function (item) {
                                    return ([String(item.id), item.body, item.html_url]);
                                }))
                            }, {
                                type: 'list',
                                name: 'reaction',
                                message: 'please select a reaction type:',
                                choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray'].map(function (item) {
                                    return node_emoji_1.get(emojiMap[item]);
                                })
                            }], function (answers) {
                            exports.rtActions.createForPrReviewComment({
                                ownername: ownername,
                                reposname: reposname,
                                id: answers.comment.split('│')[1].trim(),
                                data: {
                                    content: getReaction(answers.reaction)
                                }
                            }).then(function (resdata) {
                                output_1.success('reaction for pull request review comment created success!');
                                var dataTable = tableShow_1.default({
                                    head: ['id', 'creator', 'reaction', 'create_date'],
                                    colWidths: [10, 20, 20, 40]
                                });
                                dataTable.push([resdata.id, resdata.user.login, node_emoji_1.get(emojiMap[resdata.content]), resdata.created_at]);
                                console.log(dataTable.toString());
                            });
                        });
                    }
                });
            });
        }
    }
};
