import {request} from '../tools/request'
import { getToken, getUserName, selectRepos } from '../tools/verification';
import askquestion from '../tools/askQuestion';
import createTabale from '../tools/tableShow';
import getHyperlinkText from '../tools/hyperlinker';
const acceptType = 'application/vnd.github.jean-grey-preview+json'

export const issueActions = {
  // list issues
  listForUser (listOptions: any) {
    getToken(function () {
      request(`/user/issues`, 'get', listOptions, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // create an issue
  create (createOptions: any) {
    getToken(function () {
      request(`/repos/${createOptions.ownername}/${createOptions.reposname}/issues`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
           'Accept': acceptType
          }  
      }).then((res: any) => {
          console.log(res.data)
      })
    })
  },
  // list issues for a repository
  listForRepos (ownername: string, reposlist: Array<string>, requestdata: any) {
    return Promise.all(reposlist.map((item: string) => {
      return request(`/repos/${ownername}/${item}/issues`, 'get', requestdata, {
        headers: {
          'Accept': acceptType
        }  
      })
    }))
  },
  // get a single issue
  getSingleIssue (getOptions: any) {
    request(`/repos/${getOptions.ownername}/${getOptions.reposname}/issues/${getOptions.number}`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // edit an issue
  editIssue (editOptions: any) {
    getToken(() => {
      request(`/repos/${editOptions.ownername}/${editOptions.reposname}/issues/${editOptions.number}`, 'patch', editOptions.data, {
        headers: {
          'Accept': acceptType
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // list assignees
  listAssignees (ownername: string, reposlist: Array<string>) {
    Promise.all(reposlist.map((item) => {
      return request(`/repos/${ownername}/${item}/assignees`, 'get', {})
    })).then((res: any) => {
      console.log(res.data)
    })
  },
  // check if a user has permission to be assigned to an issue in this repository
  checkAssignee (checkOptions: any) {
    request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/assignees/${checkOptions.assigneeName}`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // add assignees to an issue
  addAssignees (addOptions: any) {
    getToken(() => {
      request(`/repos/${addOptions.ownername}/${addOptions.reposname}/issues/${addOptions.number}/assignees`, 'post', addOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // delete an assignees from an issue
  deleteAssignees (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/issues/${deleteOptions.number}/assignees`, 'delete', deleteOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // list comments on an issue
  listComments (listOptions: any) {
    request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/${listOptions.number}/comments`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // list comments in a repository
  listCommentsForRepo (listOptions: any) {
    request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/comments`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // create a comment
  createComment (createOptions: any) {
    getToken(() => {
      request(`/repos/${createOptions.ownername}/${createOptions.reposname}/issues/${createOptions.number}/comments`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.machine-man-preview'
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // edit a comment
  editComment (editOptions: any) {
    getToken(() => {
      request(`/repos/${editOptions.ownername}/${editOptions.reposname}/issues/comments/${editOptions.id}`, 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.machine-man-preview'
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // delete a comment
  deleteComment (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/issues/comments/${deleteOptions.id}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.machine-man-preview'
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // add labels to an issue
  addLabelsForIssue (addOptions: any) {
    getToken(() => {
      request(`/repos/${addOptions.ownername}/${addOptions.reposname}/issues/${addOptions.number}/labels`, 'post', addOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }  
      }).then((res: any) => {
        console.log(res.data) 
      })
    })
  },
  // remove a label from an issue
  deleteLabelForIssue (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/issues/${deleteOptions.number}/labels/${deleteOptions.labelname}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // replace all labels for an issue
  replaceLabelsForIssue (replaceOptions: any) {
    getToken(() => {
      request(`/repos/${replaceOptions.ownername}/${replaceOptions.reposname}/issues/${replaceOptions.number}/labels`, 'put', replaceOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // remove all labels from an issue
  removeLabelsForIssue (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/issues/${deleteOptions.number}/labels`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  }
}

const selectIssue = function (fn: Function) {
  selectRepos((reposname: string, targetName: string) => {
    issueActions.listForRepos(targetName, [reposname], {}).then((res: any) => {
      let dataTable: any = createTabale({
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

export const issueStrategies = {
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
      selectRepos((reposlist: Array<string>, targetName: string) => {
        issueActions.listAssignees(targetName, reposlist)
      }, true)
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
      })
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
  }
}
