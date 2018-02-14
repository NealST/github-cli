import {request} from '../tools/request'
import { getToken, getUserName, selectRepos, selectReposWithMode } from '../tools/verification';
import promiseCompose from '../tools/promiseCompose';
import askquestion from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import getHyperlinkText from '../tools/hyperlinker';
import { reposActions } from './repos';
import { prActions } from './pullrequest';
import { issueActions } from './issues';
const acceptType = 'application/vnd.github.squirrel-girl-preview+json'

export const rtActions = {
  // list reactions for a commit comment
  listForCommitComment (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/comments/${listOptions.id}/reactions`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // create reaction for a commit comment
  createForCommitComment (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/comments/${createOptions.id}/reactions`, 'post', createOptions.data, {
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
  // list reactions for an issue
  listForIssue (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/${listOptions.number}/reactions`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // create reaction for an issue
  createForIssue (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/issues/${createOptions.number}/reactions`, 'post', createOptions.data, {
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
  // list reactions for an issue comment
  listForIssueComment (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/issues/comments/${listOptions.id}/reactions`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // create reaction for an issue comment
  createForIssueComment (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/issues/comments/${createOptions.id}/reactions`, 'post', createOptions.data, {
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
  // list reactions for a pull request review comment
  listForPrReviewComment (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/comments/${listOptions.id}/reactions`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // create reaction for a pull request review comment
  createForPrReviewComment (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls/comments/${createOptions.id}/reactions`, 'post', createOptions.data, {
        headers: {
          'Accept': acceptType,
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  }
}

export const reactionStrategy: {[key: string]: any} = {
  'ls': {
    '-c': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listCommitComments({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, getHyperlinkText(item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'comment',
            message: 'please select a commit comment:',
            choices: dataTable
          }], (answers: any) => {
            rtActions.listForCommitComment({
              ownername: ownername,
              reposname: reposname,
              id: answers.comment[0]
            })
          })
        })
      })
    },
    '-i': function () {
      selectReposWithMode((ownername: string, reposname: string) => {
        issueActions.listForRepos({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['title', 'content', 'number', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.title, item.body, item.number, getHyperlinkText(item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'issueItem',
            message: 'please select a issue from this list:',
            choices: dataTable
          }], function (answers: any) {
            rtActions.listForIssue({
              ownername: ownername,
              reposname: reposname,
              number: answers.issueItem[2]
            })
          })
        })
      })
    },
    '-ic': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        issueActions.listCommentsForRepo({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, getHyperlinkText(item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'comment',
            message: 'please select a comment:',
            choices: dataTable
          }], (answers: any) => {
            rtActions.listForIssueComment({
              ownername: ownername,
              reposname: reposname,
              id: answers.comment[0]
            })
          })
        })
      })
    },
    '-p': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        prActions.listCommentsForRepo({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, getHyperlinkText(item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'comment',
            message: 'please select a comment to be edited:',
            choices: dataTable
          }], (answers: any) => {
            rtActions.listForPrReviewComment({
              ownername: ownername,
              reposname: reposname,
              id: answers.comment[0]
            })
          })
        })
      })
    }
  },
  'cr': {
    '-c': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listCommitComments({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, getHyperlinkText(item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'comment',
            message: 'please select a commit comment:',
            choices: dataTable
          }, {
            type: 'list',
            name: 'reaction',
            message: 'please select a reaction type:',
            choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray']
          }], (answers: any) => {
            rtActions.createForCommitComment({
              ownername: ownername,
              reposname: reposname,
              id: answers.comment[0],
              data: {
                content: answers.reaction
              }
            })
          })
        })
      })
    },
    '-i': function () {
      selectReposWithMode((ownername: string, reposname: string) => {
        issueActions.listForRepos({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['title', 'content', 'number', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.title, item.body, item.number, getHyperlinkText(item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'issueItem',
            message: 'please select a issue from this list:',
            choices: dataTable
          }, {
            type: 'list',
            name: 'reaction',
            message: 'please select a reaction type:',
            choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray']
          }], function (answers: any) {
            rtActions.createForIssue({
              ownername: ownername,
              reposname: reposname,
              id: answers.issueItem[2],
              data: {
                content: answers.reaction
              }
            })
          })
        })
      })
    },
    '-ic': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        issueActions.listCommentsForRepo({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, getHyperlinkText(item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'comment',
            message: 'please select a comment:',
            choices: dataTable
          }, {
            type: 'list',
            name: 'reaction',
            message: 'please select a reaction type:',
            choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray']
          }], (answers: any) => {
            rtActions.createForIssueComment({
              ownername: ownername,
              reposname: reposname,
              id: answers.comment[0],
              data: {
                content: answers.reaction
              }
            })
          })
        })
      })
    },
    '-p': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        prActions.listCommentsForRepo({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, getHyperlinkText(item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'comment',
            message: 'please select a comment to be edited:',
            choices: dataTable
          }, {
            type: 'list',
            name: 'reaction',
            message: 'please select a reaction type:',
            choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray']
          }], (answers: any) => {
            rtActions.createForPrReviewComment({
              ownername: ownername,
              reposname: reposname,
              id: answers.comment[0],
              data: {
                content: answers.reaction
              }
            })
          })
        })
      })
    }
  }
}
 