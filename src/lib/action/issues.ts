import {request} from '../tools/request'
import { getToken, selectRepos, selectReposWithMode } from '../tools/verification';
import askquestion, {createChoiceTable} from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import promiseCompose from '../tools/promiseCompose';
import { info, success } from '../tools/output';
const acceptType = 'application/vnd.github.jean-grey-preview+json'

export const issueActions = {
  // list issues
  listForUser (listOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/issues`, 'get', listOptions, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // create an issue
  create (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/issues`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // list issues for a repository
  listForRepos (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      return res.data
    })
  },
  // get a single issue
  getSingleIssue (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/issues/${getOptions.number}`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // edit an issue
  editIssue (editOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${editOptions.ownername}/${editOptions.reposname}/issues/${editOptions.number}`, 'patch', editOptions.data, {
        headers: {
          'Accept': acceptType,
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // list assignees
  listAssignees (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/assignees`, 'get', {}).then((res: any) => {
      return res.data
    })
  },
  // check if a user has permission to be assigned to an issue in this repository
  checkAssignee (checkOptions: any) {
    return request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/assignees/${checkOptions.assigneeName}`, 'get', {})
      .then((res: any) => {
        return res.data
      })
  },
  // add assignees to an issue
  addAssignees (addOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${addOptions.ownername}/${addOptions.reposname}/issues/${addOptions.number}/assignees`, 'post', addOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // delete an assignees from an issue
  deleteAssignees (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/issues/${deleteOptions.number}/assignees`, 'delete', deleteOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      })
    }])
  },
  // list comments on an issue
  listComments (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/${listOptions.number}/comments`, 'get', {})
      .then((res: any) => {
        return res.data
      })
  },
  // list comments in a repository
  listCommentsForRepo (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/comments`, 'get', {})
      .then((res: any) => {
        return res.data
      })
  },
  // create a comment
  createComment (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/issues/${createOptions.number}/comments`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.machine-man-preview'
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // edit a comment
  editComment (editOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${editOptions.ownername}/${editOptions.reposname}/issues/comments/${editOptions.id}`, 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.machine-man-preview'
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // delete a comment
  deleteComment (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(deleteOptions.ids.map((item: any) => {
        return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/issues/comments/${item}`, 'delete', {}, {
          headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': 'application/vnd.github.machine-man-preview'
          }  
        })
      })).then((res: any) => {
        return res
      })
    }])
  },
  // add labels to an issue
  addLabelsForIssue (addOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${addOptions.ownername}/${addOptions.reposname}/issues/${addOptions.number}/labels`, 'post', addOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // replace all labels for an issue
  replaceLabelsForIssue (replaceOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${replaceOptions.ownername}/${replaceOptions.reposname}/issues/${replaceOptions.number}/labels`, 'put', replaceOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // list labels on an issue
  listLabelsForIssue (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/${listOptions.number}/labels`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      return res.data
    })
  },
  // remove a label from an issue
  removeLabelForIssue (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(deleteOptions.labelNames.map((item: any) => {
        return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/issues/${deleteOptions.number}/labels/${item}`, 'delete', {}, {
          headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': acceptType
          }
        })
      })).then((res: any) => {
        return res.data
      })
    }])
  },
  // remove all labels from an issue
  removeLabelsForIssue (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/issues/${deleteOptions.number}/labels`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }
      })
    }])
  }
}

const selectIssue = function (fn: Function) {
  selectReposWithMode((reposname: string, targetName: string) => {
    issueActions.listForRepos({
      ownername: targetName,
      reposname: reposname
    }).then((resdata: any) => {
      if (resdata.length > 0) {
        let heads: any = [{
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
        }]
        askquestion([{
          type: 'list',
          name: 'issueItem',
          message: 'please select a issue from this list:',
          choices: createChoiceTable(heads, resdata.map((item: any) => {                                                 
            return [String(item.number), item.title, item.body || 'no content', item.html_url]
          }))
        }], function (answers: any) {
          fn(targetName, reposname, answers.issueItem.split('│')[1].trim())
        })
      } else {
        info('no issues existed!please create it first')
      }
    })
  })
}

export const issueStrategies: any = {
  'ls': {
    '-u': function () {
      askquestion([{
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
      }], function (answers: any) {
        issueActions.listForUser({
          filter: answers.filter.split(' ')[0],
          state: answers.state,
          sort: answers.sort
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no issues existed!')
          } else {
            let dataTable: any = createTable({
              head: ['number', 'title', 'creator', 'state', 'detailUrl(cmd+click)'],
              colWidths: [10, 20, 20, 10, 60]
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.number, item.title, item.user.login, item.state, item.html_url])
            })
            console.log(dataTable.toString())
          }
        })
      })
    },
    '-r': function () {
      selectReposWithMode((reposname: string, targetName: string) => {
        issueActions.listForRepos({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no issues existed!')
          } else {
            let dataTable: any = createTable({
              head: ['title', 'state', 'content', 'creator', 'detailUr(cmd+click)'],
              colWidths: [20, 10, 40, 10, 50],
              wordWrap: true
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.title, item.state, item.body || 'no content', item.user.login, item.html_url])
            })
            console.log(dataTable.toString())
          }
        })
      })
    },
    '-a': function () {
      selectReposWithMode((reposname: string, targetName: string) => {
        issueActions.listAssignees({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length > 0) {
            let dataTable: any = createTable({
              head: ['name', 'detailUrl(cmd+click)'],
              colWidths: [20, 60]
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.login, item.html_url])
            })
            console.log(dataTable.toString())
          } else {
            info('no assignees existed!')
          }
        })
      })
    },
    '-c': function () {
      selectIssue(function (targetName: string, reposname: string, theIssueNumber: number) {
        issueActions.listComments({
          ownername: targetName,
          reposname: reposname,
          number: theIssueNumber,
          data: {}
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no comments existed!')
          } else {
            let dataTable: any = createTable({
              head: ['id', 'author', 'content', 'detailUrl(cmd+click)'],
              colWidths: [10, 20, 40, 60],
              wordWrap: true
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.id, item.user.login, item.body, item.html_url])
            })
            console.log(dataTable.toString())
          }
        })
      })
    },
    '-cr': function () {
      selectReposWithMode((reposname: string, targetName: string) => {
        issueActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no comments existed!')
          } else {
            let dataTable: any = createTable({
              head: ['id', 'author', 'content', 'detailUrl(cmd+click)'],
              colWidths: [10, 20, 40, 50],
              wordWrap: true
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.id, item.user.login, item.body, item.html_url])
            })
            console.log(dataTable.toString())
          }
        })
      })
    }
  },
  'cr': {
    '-r': function () {
      selectReposWithMode((reposname: string, targetName: string) => {
        askquestion([{
          type: 'input',
          name: 'title',
          message: 'please input the title of this issue:'
        }, {
          type: 'editor',
          name: 'content',
          message: 'please input the content of this issue'
        }], function (answers: any) {
          issueActions.create({
            ownername: targetName,
            reposname: reposname,
            data: {
              title: answers.title,
              body: answers.content
            }
          }).then((resdata: any) => {
            success('create issues success!')
            let dataTable: any = createTable({
              head: ['number', 'title', 'content', 'detailUrl(cmd+click)'],
              colWidths: [10, 20, 20, 40, 40],
              wordWrap: true
            })
            dataTable.push([resdata.number, resdata.title, resdata.body, resdata.html_url])
            console.log(dataTable.toString())
          })
        }) 
      })
    },
    '-a': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'input',
          name: 'assignees',
          message: 'please input some assignees of this issue(split with space):'
        }], function (answers: any) {
          issueActions.addAssignees({
            ownername: ownername,
            reposname: reposname,
            number: issuenumber,
            data: {
              assignees: answers.assignees.split(' ')
            }
          }).then((resdata: any) => {
            success('add assignees success!')
          })
        })
      })
    },
    '-c': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'editor',
          name: 'content',
          message: 'please input the content of this comment for the issue:'
        }], function (answers: any) {
          issueActions.createComment({
            ownername: ownername,
            reposname: reposname,
            number: issuenumber,
            data: {
              body: answers.content
            }
          }).then((resdata: any) => {
            success('create comment success!')
            let dataTable: any = createTable({
              head: ['id', 'content', 'detailUrl(cmd+click)'],
              colWidths: [20, 40, 60],
              wordWrap: true
            })
            dataTable.push([resdata.id, resdata.body, resdata.html_url])
            console.log(dataTable.toString())
          })
        })
      })
    },
    '-l': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'input',
          name: 'labels',
          message: 'please input the names of the labels to be added to this issue(split with space):'
        }], function (answers: any) {
          issueActions.addLabelsForIssue({
            ownername: ownername,
            reposname: reposname,
            number: issuenumber,
            data: answers.labels.split(' ')
          }).then((resdata: any) => {
            success('add labels to issue success!')
            let dataTable: any = createTable({
              head: ['id', 'name', 'color'],
              colWidths: [20, 20, 20]
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.id, item.name, item.color])
            })
            console.log(dataTable.toString())
          })
        })
      })
    }
  },
  'et': {
    '-i': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'input',
          name: 'title',
          message: 'please edit the title of this issue'
        }, {
          type: 'editor',
          name: 'content',
          message: 'please edit the content of this issue'
        }], function (answers: any) {
          issueActions.editIssue({
            ownername: ownername,
            reposname: reposname,
            number: issuenumber,
            data: {
              title: answers.title,
              body: answers.content
            }
          }).then((resdata: any) => {
            success('update issue success!')
            let dataTable: any = createTable({
              head: ['number', 'title', 'content', 'detailUrl(cmd+click)'],
              colWidths: [10, 20, 40, 60],
              wordWrap: true
            })
            dataTable.push([resdata.number, resdata.title, resdata.body, resdata.html_url])
            console.log(dataTable.toString())
          })
        })
      })
    },
    '-c': function () {
      selectReposWithMode((reposname: string, targetName: string) => {
        issueActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length > 0) {
            let heads = [{
              value: 'id',
              type: 'number'
            }, {
              value: 'content',
              type: 'description'
            }, {
              value: 'detailUrl(cmd+click)',
              type: 'url'
            }]
            askquestion([{
              type: 'list',
              name: 'comment',
              message: 'please select a comment:',
              choices: createChoiceTable(heads, resdata.map((item: any) => {
                return [String(item.id), item.body, item.html_url]
              }))
            }, {
              type: 'editor',
              name: 'content',
              message: 'please edit the content of this comment'
            }], function (answers: any) {
              issueActions.editComment({
                ownername: targetName,
                reposname: reposname,
                id: answers.comment.split('│')[1].trim(),
                data: {
                  body: answers.content
                }
              }).then((resdata: any) => {
                success('update this comment success!')
                let dataTable: any = createTable({
                  head: ['id', 'content', 'detailUrl(cmd+click)'],
                  colWidths: [10, 40, 60],
                  wordWrap: true
                })
                dataTable.push([resdata.id, resdata.body, resdata.html_url])
                console.log(dataTable.toString())
              })
            })
          } else {
            info('no comments existed!you need create it first')
          }
        })
      })
    },
    '-r': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'input',
          name: 'labels',
          message: 'please input some label names to replace those existed:'
        }], function (answers: any) {
          issueActions.replaceLabelsForIssue({
            ownername: ownername,
            reposname: reposname,
            number: issuenumber,
            data: answers.labels.split(' ')
          }).then((resdata: any) => {
            success('replace labels success!')
            let dataTable: any = createTable({
              head: ['id', 'name', 'color'],
              colWidths: [10, 20, 20]
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.id, item.name, item.color])
            })
            console.log(dataTable.toString())
          })
        })
      })
    }
  },
  'rm': {
    '-a': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        issueActions.listAssignees({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length > 0) {
            askquestion([{
              type: 'checkbox',
              name: 'assignees',
              message: 'please select some assignees to be removed:',
              choices: resdata.map((item: any) => {
                return item.login
              })
            }], function (answers: any) {
              issueActions.deleteAssignees({
                ownername: ownername,
                reposname: reposname,
                number: issuenumber,
                data: {
                  assignees: answers.assignees
                }
              }).then((res: any) => {
                success('remove assignees success!')
              })
            })
          } else {
            info('no assignees available to be removed!')
          }
        })
      })
    },
    '-c': function () {
      selectReposWithMode(function (reposname: string, targetName: string) {
        issueActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length > 0) {
            let heads = [{
              value: 'id',
              type: 'number'
            }, {
              value: 'content',
              type: 'description'
            }, {
              value: 'detailUrl(cmd+click)',
              type: 'url'
            }]
            askquestion([{
              type: 'checkbox',
              name: 'comments',
              message: 'please select some comments to be removed:',
              choices: createChoiceTable(heads, resdata.map((item: any) => {
                return [String(item.id), item.body, item.html_url]
              }))
            }], function (answers: any) {
              issueActions.deleteComment({
                ownername: targetName,
                reposname: reposname,
                ids: answers.comments.map((item: any) => {
                  return item.split('│')[1].trim()
                })
              })
            })
          } else {
            info('no comments existed!you need create it first')
          }
        })
      })
    },
    '-l': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'confirm',
          name: 'removeall',
          message: 'do you need remove all the labels?'
        }], function (answers: any) {
          if (answers.removeall) {
            issueActions.removeLabelsForIssue({
              ownername: ownername,
              reposname: reposname,
              number: issuenumber
            })
          } else {
            issueActions.listLabelsForIssue({
              ownername: ownername,
              reposname: reposname,
              number: issuenumber
            }).then((resdata: any) => {
              if (resdata.length > 0) {
                let heads = [{
                  value: 'id',
                  type: 'number'
                }, {
                  value: 'name',
                  type: 'title'
                }, {
                  value: 'detailUrl(cmd+click)',
                  type: 'url'
                }]
                askquestion([{
                  type: 'checkbox',
                  name: 'labels',
                  message: 'please select some labels to be removed:',
                  choices: createChoiceTable(heads, resdata.map((item: any) => {
                    return [String(item.id), item.name, item.html_url]
                  }))
                }], function (answers: any) {
                  issueActions.removeLabelForIssue({
                    ownername: ownername,
                    reposname: reposname,
                    number: issuenumber,
                    labelNames: answers.labels.map((item: any) => {
                      return item.split('│')[2].trim()
                    })
                  })
                })
              } else {
                info('no labels existed! you have nothing to remove')
              }
            })
          }
        })
      })
    }
  }
}
