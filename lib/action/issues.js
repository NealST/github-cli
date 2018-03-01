"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../tools/request");
var verification_1 = require("../tools/verification");
var askQuestion_1 = require("../tools/askQuestion");
var tableShow_1 = require("../tools/tableShow");
var promiseCompose_1 = require("../tools/promiseCompose");
var output_1 = require("../tools/output");
var acceptType = 'application/vnd.github.jean-grey-preview+json';
exports.issueActions = {
    // list issues
    listForUser: function (listOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/user/issues", 'get', listOptions, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': acceptType
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // create an issue
    create: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/issues", 'post', createOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': acceptType
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list issues for a repository
    listForRepos: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/issues", 'get', {}, {
            headers: {
                'Accept': acceptType
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // get a single issue
    getSingleIssue: function (getOptions) {
        return request_1.request("/repos/" + getOptions.ownername + "/" + getOptions.reposname + "/issues/" + getOptions.number, 'get', {}, {
            headers: {
                'Accept': acceptType
            }
        }).then(function (res) {
            console.log(res.data);
        });
    },
    // edit an issue
    editIssue: function (editOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + editOptions.ownername + "/" + editOptions.reposname + "/issues/" + editOptions.number, 'patch', editOptions.data, {
                    headers: {
                        'Accept': acceptType,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list assignees
    listAssignees: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/assignees", 'get', {}).then(function (res) {
            return res.data;
        });
    },
    // check if a user has permission to be assigned to an issue in this repository
    checkAssignee: function (checkOptions) {
        return request_1.request("/repos/" + checkOptions.ownername + "/" + checkOptions.reposname + "/assignees/" + checkOptions.assigneeName, 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    // add assignees to an issue
    addAssignees: function (addOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + addOptions.ownername + "/" + addOptions.reposname + "/issues/" + addOptions.number + "/assignees", 'post', addOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // delete an assignees from an issue
    deleteAssignees: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/issues/" + deleteOptions.number + "/assignees", 'delete', deleteOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                });
            }]);
    },
    // list comments on an issue
    listComments: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/issues/" + listOptions.number + "/comments", 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    // list comments in a repository
    listCommentsForRepo: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/issues/comments", 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    // create a comment
    createComment: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/issues/" + createOptions.number + "/comments", 'post', createOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': 'application/vnd.github.machine-man-preview'
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // edit a comment
    editComment: function (editOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + editOptions.ownername + "/" + editOptions.reposname + "/issues/comments/" + editOptions.id, 'patch', editOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': 'application/vnd.github.machine-man-preview'
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // delete a comment
    deleteComment: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(deleteOptions.ids.map(function (item) {
                    return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/issues/comments/" + item, 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken,
                            'Accept': 'application/vnd.github.machine-man-preview'
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    // add labels to an issue
    addLabelsForIssue: function (addOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + addOptions.ownername + "/" + addOptions.reposname + "/issues/" + addOptions.number + "/labels", 'post', addOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': acceptType
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // replace all labels for an issue
    replaceLabelsForIssue: function (replaceOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + replaceOptions.ownername + "/" + replaceOptions.reposname + "/issues/" + replaceOptions.number + "/labels", 'put', replaceOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': acceptType
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // list labels on an issue
    listLabelsForIssue: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/issues/" + listOptions.number + "/labels", 'get', {}, {
            headers: {
                'Accept': acceptType
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // remove a label from an issue
    removeLabelForIssue: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(deleteOptions.labelNames.map(function (item) {
                    return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/issues/" + deleteOptions.number + "/labels/" + item, 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken,
                            'Accept': acceptType
                        }
                    });
                })).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // remove all labels from an issue
    removeLabelsForIssue: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/issues/" + deleteOptions.number + "/labels", 'delete', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': acceptType
                    }
                });
            }]);
    }
};
var selectIssue = function (fn) {
    verification_1.selectReposWithMode(function (reposname, targetName) {
        exports.issueActions.listForRepos({
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
                        type: 'list',
                        name: 'issueItem',
                        message: 'please select a issue from this list:',
                        choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                            return [String(item.number), item.title, item.body || 'no content', item.html_url];
                        }))
                    }], function (answers) {
                    fn(targetName, reposname, answers.issueItem.split('│')[1].trim());
                });
            }
            else {
                output_1.info('no issues existed!please create it first');
            }
        });
    });
};
exports.issueStrategies = {
    'ls': {
        '-u': function () {
            askQuestion_1.default([{
                    type: 'list',
                    name: 'filter',
                    message: 'which type of issues you want to see:(default assigned)',
                    choices: ['assigned to you', 'created by you', 'mentioned you', 'subscribed by you', 'all of these']
                }, {
                    type: 'list',
                    name: 'state',
                    message: 'which state of issues you want to see:(default open)',
                    choices: ['open', 'closed', 'all']
                }, {
                    type: 'list',
                    name: 'sort',
                    message: 'which type of sort rule you want to display:(default created)',
                    choices: ['created', 'updated', 'comments']
                }], function (answers) {
                exports.issueActions.listForUser({
                    filter: answers.filter.split(' ')[0],
                    state: answers.state,
                    sort: answers.sort
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no issues existed!');
                    }
                    else {
                        var dataTable_1 = tableShow_1.default({
                            head: ['number', 'title', 'creator', 'state', 'detailUrl(cmd+click)'],
                            colWidths: [10, 20, 20, 10, 60]
                        });
                        resdata.forEach(function (item) {
                            dataTable_1.push([item.number, item.title, item.user.login, item.state, item.html_url]);
                        });
                        console.log(dataTable_1.toString());
                    }
                });
            });
        },
        '-r': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.issueActions.listForRepos({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no issues existed!');
                    }
                    else {
                        var dataTable_2 = tableShow_1.default({
                            head: ['title', 'state', 'content', 'creator', 'detailUr(cmd+click)'],
                            colWidths: [20, 10, 40, 10, 50],
                            wordWrap: true
                        });
                        resdata.forEach(function (item) {
                            dataTable_2.push([item.title, item.state, item.body || 'no content', item.user.login, item.html_url]);
                        });
                        console.log(dataTable_2.toString());
                    }
                });
            });
        },
        '-a': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.issueActions.listAssignees({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        var dataTable_3 = tableShow_1.default({
                            head: ['name', 'detailUrl(cmd+click)'],
                            colWidths: [20, 60]
                        });
                        resdata.forEach(function (item) {
                            dataTable_3.push([item.login, item.html_url]);
                        });
                        console.log(dataTable_3.toString());
                    }
                    else {
                        output_1.info('no assignees existed!');
                    }
                });
            });
        },
        '-c': function () {
            selectIssue(function (targetName, reposname, theIssueNumber) {
                exports.issueActions.listComments({
                    ownername: targetName,
                    reposname: reposname,
                    number: theIssueNumber,
                    data: {}
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no comments existed!');
                    }
                    else {
                        var dataTable_4 = tableShow_1.default({
                            head: ['id', 'author', 'content', 'detailUrl(cmd+click)'],
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
        },
        '-cr': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.issueActions.listCommentsForRepo({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length === 0) {
                        output_1.info('no comments existed!');
                    }
                    else {
                        var dataTable_5 = tableShow_1.default({
                            head: ['id', 'author', 'content', 'detailUrl(cmd+click)'],
                            colWidths: [10, 20, 40, 50],
                            wordWrap: true
                        });
                        resdata.forEach(function (item) {
                            dataTable_5.push([item.id, item.user.login, item.body, item.html_url]);
                        });
                        console.log(dataTable_5.toString());
                    }
                });
            });
        }
    },
    'cr': {
        '-r': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'title',
                        message: 'please input the title of this issue:'
                    }, {
                        type: 'editor',
                        name: 'content',
                        message: 'please input the content of this issue'
                    }], function (answers) {
                    exports.issueActions.create({
                        ownername: targetName,
                        reposname: reposname,
                        data: {
                            title: answers.title,
                            body: answers.content
                        }
                    }).then(function (resdata) {
                        output_1.success('create issues success!');
                        var dataTable = tableShow_1.default({
                            head: ['number', 'title', 'content', 'detailUrl(cmd+click)'],
                            colWidths: [10, 20, 20, 40, 40],
                            wordWrap: true
                        });
                        dataTable.push([resdata.number, resdata.title, resdata.body, resdata.html_url]);
                        console.log(dataTable.toString());
                    });
                });
            });
        },
        '-a': function () {
            selectIssue(function (ownername, reposname, issuenumber) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'assignees',
                        message: 'please input some assignees of this issue(split with space):'
                    }], function (answers) {
                    exports.issueActions.addAssignees({
                        ownername: ownername,
                        reposname: reposname,
                        number: issuenumber,
                        data: {
                            assignees: answers.assignees.split(' ')
                        }
                    }).then(function (resdata) {
                        output_1.success('add assignees success!');
                    });
                });
            });
        },
        '-c': function () {
            selectIssue(function (ownername, reposname, issuenumber) {
                askQuestion_1.default([{
                        type: 'editor',
                        name: 'content',
                        message: 'please input the content of this comment for the issue:'
                    }], function (answers) {
                    exports.issueActions.createComment({
                        ownername: ownername,
                        reposname: reposname,
                        number: issuenumber,
                        data: {
                            body: answers.content
                        }
                    }).then(function (resdata) {
                        output_1.success('create comment success!');
                        var dataTable = tableShow_1.default({
                            head: ['id', 'content', 'detailUrl(cmd+click)'],
                            colWidths: [20, 40, 60],
                            wordWrap: true
                        });
                        dataTable.push([resdata.id, resdata.body, resdata.html_url]);
                        console.log(dataTable.toString());
                    });
                });
            });
        },
        '-l': function () {
            selectIssue(function (ownername, reposname, issuenumber) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'labels',
                        message: 'please input the names of the labels to be added to this issue(split with space):'
                    }], function (answers) {
                    exports.issueActions.addLabelsForIssue({
                        ownername: ownername,
                        reposname: reposname,
                        number: issuenumber,
                        data: answers.labels.split(' ')
                    }).then(function (resdata) {
                        output_1.success('add labels to issue success!');
                        var dataTable = tableShow_1.default({
                            head: ['id', 'name', 'color'],
                            colWidths: [20, 20, 20]
                        });
                        resdata.forEach(function (item) {
                            dataTable.push([item.id, item.name, item.color]);
                        });
                        console.log(dataTable.toString());
                    });
                });
            });
        }
    },
    'et': {
        '-i': function () {
            selectIssue(function (ownername, reposname, issuenumber) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'title',
                        message: 'please edit the title of this issue'
                    }, {
                        type: 'editor',
                        name: 'content',
                        message: 'please edit the content of this issue'
                    }], function (answers) {
                    exports.issueActions.editIssue({
                        ownername: ownername,
                        reposname: reposname,
                        number: issuenumber,
                        data: {
                            title: answers.title,
                            body: answers.content
                        }
                    }).then(function (resdata) {
                        output_1.success('update issue success!');
                        var dataTable = tableShow_1.default({
                            head: ['number', 'title', 'content', 'detailUrl(cmd+click)'],
                            colWidths: [10, 20, 40, 60],
                            wordWrap: true
                        });
                        dataTable.push([resdata.number, resdata.title, resdata.body, resdata.html_url]);
                        console.log(dataTable.toString());
                    });
                });
            });
        },
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.issueActions.listCommentsForRepo({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
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
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.body, item.html_url];
                                }))
                            }, {
                                type: 'editor',
                                name: 'content',
                                message: 'please edit the content of this comment'
                            }], function (answers) {
                            exports.issueActions.editComment({
                                ownername: targetName,
                                reposname: reposname,
                                id: answers.comment.split('│')[1].trim(),
                                data: {
                                    body: answers.content
                                }
                            }).then(function (resdata) {
                                output_1.success('update this comment success!');
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
                    else {
                        output_1.info('no comments existed!you need create it first');
                    }
                });
            });
        },
        '-r': function () {
            selectIssue(function (ownername, reposname, issuenumber) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'labels',
                        message: 'please input some label names to replace those existed:'
                    }], function (answers) {
                    exports.issueActions.replaceLabelsForIssue({
                        ownername: ownername,
                        reposname: reposname,
                        number: issuenumber,
                        data: answers.labels.split(' ')
                    }).then(function (resdata) {
                        output_1.success('replace labels success!');
                        var dataTable = tableShow_1.default({
                            head: ['id', 'name', 'color'],
                            colWidths: [10, 20, 20]
                        });
                        resdata.forEach(function (item) {
                            dataTable.push([item.id, item.name, item.color]);
                        });
                        console.log(dataTable.toString());
                    });
                });
            });
        }
    },
    'rm': {
        '-a': function () {
            selectIssue(function (ownername, reposname, issuenumber) {
                exports.issueActions.listAssignees({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        askQuestion_1.default([{
                                type: 'checkbox',
                                name: 'assignees',
                                message: 'please select some assignees to be removed:',
                                choices: resdata.map(function (item) {
                                    return item.login;
                                })
                            }], function (answers) {
                            exports.issueActions.deleteAssignees({
                                ownername: ownername,
                                reposname: reposname,
                                number: issuenumber,
                                data: {
                                    assignees: answers.assignees
                                }
                            }).then(function (res) {
                                output_1.success('remove assignees success!');
                            });
                        });
                    }
                    else {
                        output_1.info('no assignees available to be removed!');
                    }
                });
            });
        },
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, targetName) {
                exports.issueActions.listCommentsForRepo({
                    ownername: targetName,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
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
                                    return [String(item.id), item.body, item.html_url];
                                }))
                            }], function (answers) {
                            exports.issueActions.deleteComment({
                                ownername: targetName,
                                reposname: reposname,
                                ids: answers.comments.map(function (item) {
                                    return item.split('│')[1].trim();
                                })
                            });
                        });
                    }
                    else {
                        output_1.info('no comments existed!you need create it first');
                    }
                });
            });
        },
        '-l': function () {
            selectIssue(function (ownername, reposname, issuenumber) {
                askQuestion_1.default([{
                        type: 'confirm',
                        name: 'removeall',
                        message: 'do you need remove all the labels?'
                    }], function (answers) {
                    if (answers.removeall) {
                        exports.issueActions.removeLabelsForIssue({
                            ownername: ownername,
                            reposname: reposname,
                            number: issuenumber
                        });
                    }
                    else {
                        exports.issueActions.listLabelsForIssue({
                            ownername: ownername,
                            reposname: reposname,
                            number: issuenumber
                        }).then(function (resdata) {
                            if (resdata.length > 0) {
                                var heads = [{
                                        value: 'id',
                                        type: 'number'
                                    }, {
                                        value: 'name',
                                        type: 'title'
                                    }, {
                                        value: 'detailUrl(cmd+click)',
                                        type: 'url'
                                    }];
                                askQuestion_1.default([{
                                        type: 'checkbox',
                                        name: 'labels',
                                        message: 'please select some labels to be removed:',
                                        choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                            return [String(item.id), item.name, item.html_url];
                                        }))
                                    }], function (answers) {
                                    exports.issueActions.removeLabelForIssue({
                                        ownername: ownername,
                                        reposname: reposname,
                                        number: issuenumber,
                                        labelNames: answers.labels.map(function (item) {
                                            return item.split('│')[2].trim();
                                        })
                                    });
                                });
                            }
                            else {
                                output_1.info('no labels existed! you have nothing to remove');
                            }
                        });
                    }
                });
            });
        }
    }
};
