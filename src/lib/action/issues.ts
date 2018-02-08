import {request} from '../tools/request'
import { getToken, selectRepos } from '../tools/verification';
import askquestion from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import getHyperlinkText from '../tools/hyperlinker';
import promiseCompose from '../tools/promiseCompose';
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
        console.log(res.data)
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
          console.log(res.data)
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
      console.log(res.data)
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
        console.log(res.data)
        return res.data
      })
    }])
  },
  // list assignees
  listAssignees (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/assignees`, 'get', {}).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // check if a user has permission to be assigned to an issue in this repository
  checkAssignee (checkOptions: any) {
    return request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/assignees/${checkOptions.assigneeName}`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
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
        console.log(res.data)
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
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // list comments on an issue
  listComments (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/${listOptions.number}/comments`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  // list comments in a repository
  listCommentsForRepo (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/comments`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
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
        console.log(res.data)
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
        console.log(res.data)
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
        console.log(res.data)
        return res.data
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
        console.log(res.data)
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
        console.log(res.data)
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
      console.log(res.data)
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
        console.log(res)
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
      }).then((res: any) => {
        console.log(res)
      })
    }])
  }
}

const selectIssue = function (fn: Function) {
  selectRepos((reposname: string, targetName: string) => {
    issueActions.listForRepos({
      ownername: targetName,
      reposname: reposname
    }).then((res: any) => {
      let dataTable: any = createTable({
        head: ['title', 'content', 'number', 'detailUrl']
      })
      res[0].forEach((item: any) => {
        dataTable.push([item.title, item.body, item.number, getHyperlinkText('点击查看该issue详情', item.html_url)])
      })
      askquestion([{
        type: 'list',
        name: 'issueItem',
        message: 'please select a issue from this list:',
        choices: dataTable
      }], function (answers: any) {
        fn(targetName, reposname, answers.issueItem[2])
      })
    })
  }, true, 'list')
}

export const issueStrategies: any = {
  'ls': {
    '-u': function () {
      askquestion([{
        type: 'list',
        name: 'filter',
        message: 'what type of issues you want to see:(default assigned)',
        choices: ['assigned to you', 'created by you', 'mentioned you', 'subscribed by you', 'all of these']  
      }, {
        type: 'list',
        name: 'state',
        message: 'what state of issues you want to see:(default open)',
        choices: ['open', 'closed', 'all']
      }, {
        type: 'list',
        name: 'sort',
        message: 'what type of sort rule you want to display:(default created)',
        choices: ['created', 'updated', 'comments']
      }], function (answers: any) {
        issueActions.listForUser({
          filter: answers.filter.split(' ')[0],
          state: answers.state,
          sort: answers.sort
        })
      })
    },
    '-r': function () {
      selectRepos((reposlist: Array<string>, targetName: string) => {
        issueActions.listForRepos(targetName, reposlist, {})
      }, true)
    },
    '-a': function () {
      selectRepos((reposname: string, targetName: string) => {
        issueActions.listAssignees({
          ownername: targetName,
          reposname: reposname
        })
      }, true, 'list')
    },
    '-c': function () {
      selectIssue(function (targetName: string, reposname: string, theIssueNumber: number) {
        issueActions.listComments({
          ownername: targetName,
          reposname: reposname,
          number: theIssueNumber,
          data: {}
        })
      })
    },
    '-cr': function () {
      selectRepos((reposname: string, targetName: string) => {
        issueActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        })
      }, true, 'list')
    }
  },
  'cr': {
    '-r': function () {
      selectRepos((reposname: string, targetName: string) => {
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
              content: answers.content
            }
          })
        }) 
      }, true, 'list')
    },
    '-a': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'input',
          name: 'assignees',
          message: 'please input some assignees of this issue'
        }], function (answers: any) {
          issueActions.addAssignees({
            ownername: ownername,
            reposname: reposname,
            number: issuenumber,
            data: {
              assignees: answers.assignees.split(' ')
            }
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
          })
        })
      })
    },
    '－l': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'input',
          name: 'labels',
          message: 'please input some labels for this issue:'
        }], function (answers: any) {
          issueActions.addLabelsForIssue({
            ownername: ownername,
            reposname: reposname,
            number: issuenumber,
            data: answers.labels.split(' ')
          })
        })
      })
    }
  },
  'et': {
    '-s': function () {
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
          })
        })
      })
    },
    '-c': function () {
      selectRepos((reposname: string, targetName: string) => {
        issueActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, getHyperlinkText('点击查看该comment详情', item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'comment',
            message: 'please select a comment:',
            choices: dataTable
          }, {
            type: 'input',
            name: 'content',
            message: 'please edit the content of this comment'
          }], function (answers: any) {
            issueActions.editComment({
              ownername: targetName,
              reposname: reposname,
              id: answers.comment[0],
              data: {
                body: answers.content
              }
            })
          })
        })
      }, true, 'list')
    },
    '-r': function () {
      selectIssue(function (ownername: string, reposname: string, issuenumber: number) {
        askquestion([{
          type: 'input',
          name: 'labels',
          message: 'please input some labels to replace those existed:'
        }], function (answers: any) {
          issueActions.replaceLabelsForIssue({
            ownername: ownername,
            reposname: reposname,
            number: issuenumber,
            data: answers.labels.split(' ')
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
          askquestion([{
            type: 'checkbox',
            name: 'assignees',
            message: 'please select some assignees to be removed:',
            choices: resdata.map((item: any) => {
              return item.login
            })
          }], function (answers: any) {
            issueActions.removeLabelsForIssue({
              ownername: ownername,
              reposname: reposname,
              number: issuenumber,
              data: {
                assignees: answers.assignees
              }
            })
          })
        })
      })
    },
    '-c': function () {
      selectRepos(function (reposname: string, targetName: string) {
        issueActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, getHyperlinkText('点击查看该comment详情', item.html_url)])
          })
          askquestion([{
            type: 'checkbox',
            name: 'comments',
            message: 'please select some comments to be removed:',
            choices: dataTable
          }], function (answers: any) {
            issueActions.deleteComment({
              ownername: targetName,
              reposname: reposname,
              ids: answers.comments.map((item: any) => {
                return item[0]
              })
            })
          })
        })
      }, true, 'list')
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
              let dataTable: any = createTable({
                head: ['id', 'name', 'detailUrl']
              })
              resdata.forEach((item: any) => {
                dataTable.push([item.id, item.name, item.url])
              })
              askquestion([{
                type: 'checkbox',
                name: 'labels',
                message: 'please select some labels to be removed:',
                choices: dataTable
              }], function (answers: any) {
                issueActions.removeLabelForIssue({
                  ownername: ownername,
                  reposname: reposname,
                  number: issuenumber,
                  labelNames: answers.labels.map((item: any) => {
                    return item[1]
                  })
                })
              })
            })
          }
        })
      })
    }
  }
}
