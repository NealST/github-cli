"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../tools/request");
var verification_1 = require("../tools/verification");
var askQuestion_1 = require("../tools/askQuestion");
var tableShow_1 = require("../tools/tableShow");
var promiseCompose_1 = require("../tools/promiseCompose");
var output_1 = require("../tools/output");
var chalk_1 = require("chalk");
var acceptType = 'application/vnd.github.jean-grey-preview+json';
exports.reposActions = {
    create: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/user/repos", 'post', createOptions, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    delete: function (reposNameList) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(reposNameList.map(function (item) {
                    return request_1.request("/repos/" + process.env.githubUserName + "/" + item, 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    console.log(res);
                    return res;
                });
            }]);
    },
    getAll: function () {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/user/repos", 'get', {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    listCommitComments: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/comments", 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    getReposForUser: function (ownername) {
        return request_1.request("/users/" + ownername + "/repos", 'get', {}).then(function (res) {
            return res.data;
        });
    },
    getBranches: function (getOptions) {
        return request_1.request("/repos/" + getOptions.ownername + "/" + getOptions.reposname + "/branches", 'get', {}).then(function (res) {
            return res.data;
        });
    },
    getTopics: function (getOptions) {
        return request_1.request("/repos/" + getOptions.ownername + "/" + getOptions.reposname + "/topics", 'get', {}, {
            headers: {
                'Accept': request_1.previewAccept
            }
        }).then(function (res) {
            return res.data;
        });
    },
    replaceTopics: function (options) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + options.ownername + "/" + options.reposname + "/topics", 'put', options.data, {
                    headers: {
                        'Accept': request_1.previewAccept,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    getContributors: function (getOptions) {
        return request_1.request("/repos/" + getOptions.ownername + "/" + getOptions.reposname + "/contributors", 'get', {}).then(function (res) {
            return res.data;
        });
    },
    transfer: function (options) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(options.reposnamelist.map(function (item) {
                    return request_1.request("/repos/" + options.ownername + "/" + item + "/transfer", 'post', {
                        new_owner: options.newowner
                    }, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken,
                            'Accept': 'application/vnd.github.nightshade-preview+json'
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    getStarredRepos: function (getStarOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/user/starred", 'get', getStarOptions || {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    getStarredReposForUser: function (getOptions) {
        return request_1.request("/users/" + getOptions.ownername + "/starred", 'get', getOptions.data || {})
            .then(function (res) {
            return res.data;
        });
    },
    getWatchedRepos: function (getWatchOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/user/subscriptions", 'get', getWatchOptions || {}, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    getWatchedReposForUser: function (getWatchOptions) {
        return request_1.request("/users/" + getWatchOptions.ownername + "/subscriptions", 'get', getWatchOptions.data || {})
            .then(function (res) {
            return res.data;
        });
    },
    setRepoSubscription: function (setOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(setOptions.reposnamelist.map(function (item) {
                    return request_1.request("/repos/" + setOptions.ownername + "/" + item + "/subscription", 'put', setOptions.data || {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    starRepos: function (starOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(starOptions.reposnamelist.map(function (item) {
                    return request_1.request("/user/starred/" + starOptions.ownername + "/" + item, 'put', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    unStarRepos: function (starOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(starOptions.reposnamelist.map(function (item) {
                    return request_1.request("/user/starred/" + starOptions.ownername + "/" + item, 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    unWatchRepos: function (watchOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(watchOptions.reposnamelist.map(function (item) {
                    return request_1.request("/repos/" + watchOptions.ownername + "/" + item + "/subscription", 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    // compare the content of two different branch
    compareCommits: function (compareOptions) {
        return request_1.request("/repos/" + compareOptions.ownername + "/" + compareOptions.reposname + "/compare/" + compareOptions.base + "..." + compareOptions.head, 'get', {})
            .then(function (res) {
            console.log(res.data);
            return res.data;
        });
    },
    // fork a repository
    fork: function (forkOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(forkOptions.reposnamelist.map(function (item) {
                    return request_1.request("/repos/" + forkOptions.ownername + "/" + item + "/forks", 'post', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    // get the readme of a repository
    getReadme: function (getOptions) {
        return request_1.request("/repos/" + getOptions.ownername + "/" + getOptions.reposname + "/readme", 'get', {})
            .then(function (res) {
            console.log(res.data);
            return res.data;
        });
    },
    // get commits of a repository
    getCommits: function (getOptions) {
        return request_1.request("/repos/" + getOptions.ownername + "/" + getOptions.reposname + "/commits", 'get', {})
            .then(function (res) {
            return res.data;
        });
    },
    // get collaborators of a repository
    getCollaborators: function (getOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + getOptions.ownername + "/" + getOptions.reposname + "/collaborators", 'get', {}, {
                    headers: {
                        'Accept': request_1.previewAccept,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res && res.data;
                });
            }]);
    },
    // check whether a user is a collaborator
    checkCollaborator: function (checkOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + checkOptions.ownername + "/" + checkOptions.reposname + "/collaborators/" + checkOptions.username, 'get', {}, {
                    headers: {
                        'Accept': 'application/vnd.github.hellcat-preview+json',
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // check the permission level of a collaborator
    checkCollaboratorPermission: function (checkOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + checkOptions.ownername + "/" + checkOptions.reposname + "/collaborators/" + checkOptions.username + "/permission", 'get', {}, {
                    headers: {
                        'Accept': request_1.previewAccept,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // add collaborators for a repository
    addCollaborator: function (addOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + addOptions.ownername + "/" + addOptions.reposname + "/collaborators/" + addOptions.username, 'put', addOptions.data, {
                    headers: {
                        'Accept': request_1.previewAccept,
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // delete collaborators for a repository
    deleteCollaborators: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(deleteOptions.names.map(function (item) {
                    return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/collaborators/" + item, 'delete', {}, {
                        headers: {
                            'Accept': request_1.previewAccept,
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    // list milestones for a repository
    listMilestones: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/milestones", 'get', {}, {
            headers: {
                'Accept': 'application/vnd.github.jean-grey-preview+json'
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // create a milestone
    createMilestone: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/milestones", 'post', createOptions.data, {
                    headers: {
                        'Accept': 'application/vnd.github.jean-grey-preview+json',
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // update a milestone
    editMilestone: function (editOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + editOptions.ownername + "/" + editOptions.reposname + "/milestones/" + editOptions.number, 'patch', editOptions.data, {
                    headers: {
                        'Accept': 'application/vnd.github.jean-grey-preview+json',
                        'Authorization': "token " + process.env.githubToken
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // delete a milestone
    deleteMilestone: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(deleteOptions.numbers.map(function (item) {
                    return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/milestones/" + item, 'delete', {}, {
                        headers: {
                            'Accept': 'application/vnd.github.jean-grey-preview+json',
                            'Authorization': "token " + process.env.githubToken
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    },
    // list all labels for a repository
    listAllLabels: function (listOptions) {
        return request_1.request("/repos/" + listOptions.ownername + "/" + listOptions.reposname + "/labels", 'get', {}, {
            headers: {
                'Accept': acceptType
            }
        }).then(function (res) {
            return res.data;
        });
    },
    // create a label
    createLabel: function (createOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + createOptions.ownername + "/" + createOptions.reposname + "/labels", 'post', createOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': acceptType
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // update a label
    editLabel: function (editOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return request_1.request("/repos/" + editOptions.ownername + "/" + editOptions.reposname + "/labels/" + editOptions.labelname, 'patch', editOptions.data, {
                    headers: {
                        'Authorization': "token " + process.env.githubToken,
                        'Accept': acceptType
                    }
                }).then(function (res) {
                    return res.data;
                });
            }]);
    },
    // delete a label
    deleteLabels: function (deleteOptions) {
        return promiseCompose_1.default([verification_1.getToken, function () {
                return Promise.all(deleteOptions.names.map(function (item) {
                    return request_1.request("/repos/" + deleteOptions.ownername + "/" + deleteOptions.reposname + "/labels/" + item, 'delete', {}, {
                        headers: {
                            'Authorization': "token " + process.env.githubToken,
                            'Accept': acceptType
                        }
                    });
                })).then(function (res) {
                    return res;
                });
            }]);
    }
};
exports.reposStrategies = {
    'ls': {
        '-r': function () {
            function dataShow(showlist) {
                if (showlist.length > 0) {
                    var dataTable_1 = tableShow_1.default({
                        head: ['name', 'description', 'detailUrl(cmd+click)'],
                        colWidths: [30, 40, 60],
                        wordWrap: true
                    });
                    showlist.forEach(function (item) {
                        dataTable_1.push([item.name, item.description || 'no description', item.html_url]);
                    });
                    console.log(dataTable_1.toString());
                }
                else {
                    output_1.info('no repositories existed!');
                }
            }
            if (process.env.githubUserMode === 'target') {
                verification_1.getUserName(function (ownername) {
                    exports.reposActions.getReposForUser(ownername).then(function (resdata) {
                        dataShow(resdata);
                    });
                }, true);
            }
            else {
                exports.reposActions.getAll().then(function (resdata) {
                    dataShow(resdata);
                });
            }
        },
        '-b': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.getBranches({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        var dataTable_2 = tableShow_1.default({
                            head: ['name', 'latest commit sha'],
                            colWidths: [20, 60]
                        });
                        resdata.forEach(function (item) {
                            dataTable_2.push([item.name, item.commit.sha]);
                        });
                        console.log(dataTable_2.toString());
                    }
                    else {
                        output_1.info('no branches existed!');
                    }
                });
            });
        },
        '-t': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.getTopics({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.names.length === 0) {
                        output_1.info('the repository you select has no topics');
                    }
                    else {
                        var dataTable = tableShow_1.default();
                        dataTable.push({
                            'topics': resdata.names.map(function (item) {
                                return chalk_1.yellow(item);
                            })
                        });
                        console.log(dataTable.toString());
                    }
                });
            });
        },
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.getContributors({
                    ownername: ownername,
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
                        output_1.info('no contributors existed!');
                    }
                });
            });
        },
        '-s': function () {
            function dataShow(datalist) {
                if (datalist.length > 0) {
                    var dataTable_4 = tableShow_1.default({
                        head: ['name', 'ownername', 'description', 'detailUrl(cmd+click)'],
                        colWidths: [24, 20, 40, 60],
                        wordWrap: true
                    });
                    datalist.forEach(function (item) {
                        dataTable_4.push([item.name, item.owner.login, item.description || 'no description', item.html_url]);
                    });
                    console.log(dataTable_4.toString());
                }
                else {
                    output_1.info('no starred repositories existed!');
                }
            }
            if (process.env.githubUserMode === 'target') {
                verification_1.getUserName(function (targetName) {
                    exports.reposActions.getStarredReposForUser({
                        ownername: targetName
                    }).then(function (resdata) {
                        dataShow(resdata);
                    });
                }, true);
            }
            else {
                exports.reposActions.getStarredRepos().then(function (resdata) {
                    dataShow(resdata);
                });
            }
        },
        '-w': function () {
            function dataShow(datalist) {
                if (datalist.length > 0) {
                    var dataTable_5 = tableShow_1.default({
                        head: ['name', 'owner', 'description', 'detailUrl(cmd+click)'],
                        colWidths: [24, 20, 40, 60],
                        wordWrap: true
                    });
                    datalist.forEach(function (item) {
                        dataTable_5.push([item.name, item.owner.login, item.description || 'no description', item.html_url]);
                    });
                    console.log(dataTable_5.toString());
                }
                else {
                    output_1.info('no watching repositories existed!');
                }
            }
            if (process.env.githubUserMode === 'target') {
                verification_1.getUserName(function (targetName) {
                    exports.reposActions.getWatchedReposForUser({
                        ownername: targetName
                    }).then(function (resdata) {
                        dataShow(resdata);
                    });
                }, true);
            }
            else {
                exports.reposActions.getWatchedRepos().then(function (resdata) {
                    dataShow(resdata);
                });
            }
        },
        '-i': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.getCommits({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        var dataTable_6 = tableShow_1.default({
                            head: ['sha', 'author', 'commit message', 'commit date'],
                            colWidths: [15, 20, 40, 40],
                            wordWrap: true
                        });
                        resdata.forEach(function (item) {
                            dataTable_6.push([item.sha, item.commit.author.name, item.commit.message, item.commit.author.date]);
                        });
                        console.log(dataTable_6.toString());
                    }
                    else {
                        output_1.info('no commit history existed!');
                    }
                });
            });
        },
        '-o': function () {
            // 无法开启目标用户模式
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.getCollaborators({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        var dataTable_7 = tableShow_1.default({
                            head: ['name', 'permissions'],
                            colWidths: [20, 60]
                        });
                        resdata.forEach(function (item) {
                            dataTable_7.push([item.login, Object.keys(item.permissions).filter(function (keyItem) {
                                    return item.permissions[keyItem];
                                }).join(' ')]);
                        });
                        console.log(dataTable_7.toString());
                    }
                    else {
                        output_1.info('no collaborators existed!');
                    }
                });
            });
        },
        '-m': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.listMilestones({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        var dataTable_8 = tableShow_1.default({
                            head: ['title', 'state', 'description', 'detailUrl(cmd+click)'],
                            colWidths: [20, 10, 40, 60],
                            wordWrap: true
                        });
                        resdata.forEach(function (item) {
                            dataTable_8.push([item.title, item.state, item.description, item.html_url]);
                        });
                        console.log(dataTable_8.toString());
                    }
                    else {
                        output_1.info('no milestones existed!');
                    }
                });
            });
        },
        '-l': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.listAllLabels({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        var dataTable_9 = tableShow_1.default({
                            head: ['id', 'name', 'color'],
                            colWidths: [20, 20, 20]
                        });
                        resdata.forEach(function (item) {
                            dataTable_9.push([item.id, item.name, item.color]);
                        });
                        console.log(dataTable_9.toString());
                    }
                    else {
                        output_1.info('no labels existed!');
                    }
                });
            });
        },
        '-cm': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.listCommitComments({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    var dataTable = tableShow_1.default({
                        head: ['id', 'content', 'author', 'detailUrl(cmd+click)'],
                        colWidths: [10, 40, 20, 60],
                        wordWrap: true
                    });
                    if (resdata.length > 0) {
                        resdata.forEach(function (item) {
                            dataTable.push([item.id, item.body, item.user.login, item.html_url]);
                        });
                        console.log(dataTable.toString());
                    }
                    else {
                        output_1.info('this repository has no commit comments');
                    }
                });
            });
        }
    },
    'cr': {
        '-r': function () {
            askQuestion_1.default([{
                    type: 'input',
                    name: 'repos',
                    message: 'please input the name of the repository to be created:'
                }, {
                    type: 'editor',
                    name: 'description',
                    message: 'please input the description of the repository to be created:'
                }], function (answers) {
                exports.reposActions.create({
                    name: answers.repos,
                    description: answers.description
                }).then(function (resdata) {
                    output_1.success('repositories created sucess!');
                    var dataTable = tableShow_1.default({
                        head: ['name', 'description', 'detailUrl(cmd+click)'],
                        colWidths: [20, 40, 60],
                        wordWrap: true
                    });
                    dataTable.push([resdata.name, resdata.description, resdata.html_url]);
                    console.log(dataTable.toString());
                });
            });
        },
        '-a': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'username',
                        message: 'please input the username will be added as a collaborator:'
                    }, {
                        type: 'list',
                        name: 'permission',
                        message: 'please select a permission level for this collaborator:',
                        choices: ['pull', 'push', 'admin']
                    }], function (answers) {
                    if (!answers.username) {
                        output_1.info('you have not input the username,please try again!');
                        process.exit();
                    }
                    else {
                        exports.reposActions.addCollaborator({
                            ownername: ownername,
                            reposname: reposname,
                            username: answers.username,
                            data: {
                                permission: answers.permission
                            }
                        }).then(function (resdata) {
                            output_1.success('add collaborator success!');
                            var dataTable = tableShow_1.default({
                                head: ['repos', 'inviter', 'invitee', 'reposUrl(cmd+click)'],
                                colWidths: [20, 20, 20, 60]
                            });
                            var thereposInfo = resdata.repository;
                            dataTable.push([thereposInfo.name, resdata.inviter.login, resdata.invitee.login, thereposInfo.html_url]);
                            console.log(dataTable.toString());
                        });
                    }
                });
            });
        },
        '-m': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'title',
                        message: 'please input the title of this milestone:',
                    }, {
                        type: 'list',
                        name: 'state',
                        message: 'please select a state for this milestone:',
                        choices: ['open', 'closed']
                    }, {
                        type: 'editor',
                        name: 'description',
                        message: 'please input the description for this milestone:'
                    }], function (answers) {
                    exports.reposActions.createMilestone({
                        ownername: ownername,
                        reposname: reposname,
                        data: {
                            title: answers.title,
                            state: answers.state,
                            description: answers.description
                        }
                    }).then(function (resdata) {
                        output_1.success('create milestone success!');
                        var dataTable = tableShow_1.default({
                            head: ['title', 'state', 'description', 'detailUrl(cmd+click)'],
                            colWidths: [20, 10, 40, 60],
                            wordWrap: true
                        });
                        dataTable.push([resdata.title, resdata.state, resdata.description, resdata.html_url]);
                        console.log(dataTable.toString());
                    });
                });
            });
        },
        '-l': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'name',
                        message: 'please input the name of this label:'
                    }, {
                        type: 'input',
                        name: 'color',
                        message: 'please input the color hex code(6 character, without #):'
                    }], function (answers) {
                    exports.reposActions.createLabel({
                        ownername: ownername,
                        reposname: reposname,
                        data: {
                            name: answers.name,
                            color: answers.color
                        }
                    }).then(function (resdata) {
                        output_1.success('add label success!');
                    });
                });
            });
        }
    },
    'et': {
        '-t': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'names',
                        message: 'please input some names to replace existed topic names(split with space):'
                    }], function (answers) {
                    exports.reposActions.replaceTopics({
                        ownername: ownername,
                        reposname: reposname,
                        data: {
                            names: answers.names.split(' ')
                        }
                    }).then(function (resdata) {
                        output_1.success('replece labels success!');
                        var dataTable = tableShow_1.default();
                        dataTable.push({
                            labels: resdata.names.map(function (item) {
                                return chalk_1.yellow(item);
                            })
                        });
                        console.log(dataTable.toString());
                    });
                });
            });
        },
        '-m': function () {
            var questionObject = {
                title: {
                    type: 'input',
                    name: 'title',
                    message: 'please input the title of this milestone'
                },
                state: {
                    type: 'list',
                    name: 'state',
                    message: 'please select a state for this milestone',
                    choices: ['open', 'closed']
                },
                description: {
                    type: 'editor',
                    name: 'description',
                    message: 'please input the description for this milestone'
                }
            };
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.listMilestones({
                    ownername: ownername,
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
                                value: 'state',
                                type: 'title'
                            }, {
                                value: 'description',
                                type: 'description'
                            }];
                        askQuestion_1.default([{
                                type: 'list',
                                name: 'number',
                                message: 'please select a milestone:',
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.number), item.title, item.state, item.description];
                                }))
                            }, {
                                type: 'checkbox',
                                name: 'changes',
                                message: 'please select some items you want to change:',
                                choices: ['title', 'state', 'description']
                            }], function (selectAnswers) {
                            var questionArray = selectAnswers.changes.map(function (item) {
                                return questionObject[item];
                            });
                            askQuestion_1.default(questionArray, function (answers) {
                                exports.reposActions.editMilestone({
                                    ownername: ownername,
                                    reposname: reposname,
                                    number: selectAnswers.number.split('│')[1].trim(),
                                    data: answers
                                }).then(function (resdata) {
                                    output_1.success('update milestone success!');
                                    var dataTable = tableShow_1.default({
                                        head: ['number', 'title', 'state', 'description', 'detailUrl(cmd+click)'],
                                        colWidths: [10, 20, 10, 40, 60],
                                        wordWrap: true
                                    });
                                    dataTable.push([resdata.number, resdata.title, resdata.state, resdata.description, resdata.html_url]);
                                    console.log(dataTable.toString());
                                });
                            });
                        });
                    }
                    else {
                        output_1.info('no milestone existed!you need create it first');
                    }
                });
            });
        },
        '-l': function () {
            var questionObject = {
                name: {
                    type: 'input',
                    name: 'name',
                    message: 'please input the name for this label:'
                },
                color: {
                    type: 'input',
                    name: 'color',
                    message: 'please input the color for this label:'
                }
            };
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.listAllLabels({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        var heads = [{
                                value: 'id',
                                type: 'number'
                            }, {
                                value: 'name',
                                type: 'title'
                            }, {
                                value: 'color',
                                type: 'title'
                            }];
                        askQuestion_1.default([{
                                type: 'list',
                                name: 'labelname',
                                message: 'please select a label to change:',
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.id), item.name, item.color];
                                }))
                            }, {
                                type: 'checkbox',
                                name: 'changes',
                                message: 'please select change items you want to implement:',
                                choices: ['name', 'color']
                            }], function (answers) {
                            var questionArray = answers.changes.map(function (item) {
                                return questionObject[item];
                            });
                            askQuestion_1.default(questionArray, function (theanswers) {
                                exports.reposActions.editLabel({
                                    ownername: ownername,
                                    reposname: reposname,
                                    labelname: answers.labelname.split('│')[2].trim(),
                                    data: theanswers
                                }).then(function (resdata) {
                                    output_1.success('update label success!');
                                    var dataTable = tableShow_1.default({
                                        head: ['id', 'name', 'color'],
                                        colWidths: [20, 20, 20]
                                    });
                                    dataTable.push([resdata.id, resdata.name, resdata.color]);
                                    console.log(dataTable.toString());
                                });
                            });
                        });
                    }
                    else {
                        output_1.info('no labels existed!you need create it first');
                    }
                });
            });
        }
    },
    'rm': {
        '-r': function () {
            verification_1.getUserName(function (ownername) {
                exports.reposActions.getAll().then(function (resdata) {
                    if (resdata.length > 0) {
                        var heads = [{
                                value: 'name',
                                type: 'title'
                            }, {
                                value: 'description',
                                type: 'description'
                            }, {
                                value: '查看详情(cmd+click)',
                                type: 'url'
                            }];
                        askQuestion_1.default([{
                                type: 'checkbox',
                                name: 'repos',
                                message: 'please select some repositories to be removed:',
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [item.name, item.description || 'no description', item.html_url];
                                }))
                            }], function (answers) {
                            exports.reposActions.delete(answers.repos.map(function (item) {
                                return item.split('│')[1].trim();
                            }));
                        });
                    }
                    else {
                        output_1.info('no repositories existed!you need create it first');
                    }
                });
            });
        },
        '-m': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.listMilestones({
                    ownername: ownername,
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
                                value: 'state',
                                type: 'number'
                            }, {
                                value: 'description',
                                type: 'description'
                            }];
                        askQuestion_1.default([{
                                type: 'checkbox',
                                name: 'numbers',
                                message: 'please select some milestones:',
                                choices: askQuestion_1.createChoiceTable(heads, resdata.map(function (item) {
                                    return [String(item.number), item.title, item.state, item.description];
                                }))
                            }], function (selectAnswers) {
                            exports.reposActions.deleteMilestone({
                                ownername: ownername,
                                reposname: reposname,
                                numbers: selectAnswers.numbers.map(function (item) {
                                    return item.split('│')[1].trim();
                                })
                            });
                        });
                    }
                    else {
                        output_1.info('no milestones existed!you need create it first');
                    }
                });
            });
        },
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.getCollaborators({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        askQuestion_1.default([{
                                type: 'checkbox',
                                name: 'names',
                                message: 'please select some collaborators to be removed:',
                                choices: resdata.map(function (item) {
                                    return item.login;
                                })
                            }], function (answers) {
                            exports.reposActions.deleteCollaborators({
                                ownername: ownername,
                                reposname: reposname,
                                names: answers.names
                            });
                        });
                    }
                    else {
                        output_1.info('no collaborators existed!you need create it first');
                    }
                });
            });
        },
        '-l': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                exports.reposActions.listAllLabels({
                    ownername: ownername,
                    reposname: reposname
                }).then(function (resdata) {
                    if (resdata.length > 0) {
                        askQuestion_1.default([{
                                type: 'checkbox',
                                name: 'labels',
                                message: 'please select some labels to be removed:',
                                choices: resdata.map(function (item) {
                                    return item.name;
                                })
                            }], function (answers) {
                            exports.reposActions.deleteLabels({
                                ownername: ownername,
                                reposname: reposname,
                                names: answers.labels
                            });
                        });
                    }
                    else {
                        output_1.info('no labels existed!you need create it first');
                    }
                });
            });
        }
    },
    'st': {
        '-s': function () {
            verification_1.selectRepos(function (reposnamelist, ownername) {
                exports.reposActions.setRepoSubscription({
                    reposnamelist: reposnamelist,
                    ownername: ownername
                }).then(function (res) {
                    output_1.success('add subscription success!');
                });
            }, true);
        },
        '-r': function () {
            verification_1.selectRepos(function (reposnamelist, ownername) {
                exports.reposActions.starRepos({
                    reposnamelist: reposnamelist,
                    ownername: ownername
                }).then(function (res) {
                    output_1.success('star the repository success!');
                });
            }, true);
        },
        '-rn': function () {
            verification_1.selectRepos(function (reposnamelist, ownername) {
                exports.reposActions.unStarRepos({
                    reposnamelist: reposnamelist,
                    ownername: ownername
                }).then(function (res) {
                    output_1.success('unstar the repository success!');
                });
            }, true);
        },
        '-sn': function () {
            verification_1.selectRepos(function (reposnamelist, ownername) {
                exports.reposActions.unWatchRepos({
                    reposnamelist: reposnamelist,
                    ownername: ownername
                }).then(function (res) {
                    output_1.success('unwatch the repository success!');
                });
            }, true);
        }
    },
    'ck': {
        '-c': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'username',
                        message: 'please input the username to be checked:'
                    }], function (answers) {
                    exports.reposActions.checkCollaborator({
                        ownername: ownername,
                        reposname: reposname,
                        username: answers.username
                    }).then(function (res) {
                        output_1.success('this user is a collaborator!');
                    });
                });
            });
        },
        '-p': function () {
            verification_1.selectReposWithMode(function (reposname, ownername) {
                askQuestion_1.default([{
                        type: 'input',
                        name: 'username',
                        message: 'please input the username to be checked:'
                    }], function (answers) {
                    exports.reposActions.checkCollaboratorPermission({
                        ownername: ownername,
                        reposname: reposname,
                        username: answers.username
                    }).then(function (resdata) {
                        output_1.info(answers.username + " has the permission " + resdata.permission);
                    });
                });
            });
        }
    },
    'ts': function () {
        verification_1.selectReposWithMode(function (reposnamelist, ownername) {
            askQuestion_1.default([{
                    type: 'input',
                    name: 'newowner',
                    message: 'please input the name of new owner:'
                }], function (answers) {
                exports.reposActions.transfer({
                    ownername: ownername,
                    reposnamelist: reposnamelist,
                    newowner: answers.newowner
                }).then(function (res) {
                    output_1.success('transfer the repository success!');
                });
            });
        }, 'checkbox');
    },
    'fk': function () {
        verification_1.selectRepos(function (reposnamelist, ownername) {
            exports.reposActions.fork({
                ownername: ownername,
                reposnamelist: reposnamelist
            }).then(function (res) {
                output_1.success('fork the repository success!');
            });
        }, true);
    }
};
