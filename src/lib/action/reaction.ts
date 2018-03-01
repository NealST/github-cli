import {request} from '../tools/request'
import { getToken, getUserName, selectRepos, selectReposWithMode } from '../tools/verification';
import promiseCompose from '../tools/promiseCompose';
import askquestion from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import { reposActions } from './repos';
import { prActions } from './pullrequest';
import { issueActions } from './issues';
import { success, info } from '../tools/output';
import { createChoiceTable } from '../tools/askQuestion';
import { get, which } from 'node-emoji'
const acceptType = 'application/vnd.github.squirrel-girl-preview+json'

export const rtActions = {
  // list reactions for a commit comment
  listForCommitComment (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/comments/${listOptions.id}/reactions`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
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
        return res.data
      })
    }])
  }
}

const emojiMap: any = {
  '+1': '+1',
  '-1': '-1',
  'laugh': 'grinning', 
  'confused': 'confused', 
  'heart': 'heart', 
  'hooray': 'tada'
}
const getReaction = function (emoji: string) {
  return Object.keys(emojiMap).filter((item: string) => {
    return get(emojiMap[item]) === emoji
  })[0]
}

export const reactionStrategy: {[key: string]: any} = {
  'ls': {
    '-c': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listCommitComments({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length == 0) {
            info('no commit comments existed!')
          } else {
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
              message: 'please select a commit comment:',
              choices: createChoiceTable(heads, resdata.map((item: any) => {
                return [String(item.id), item.body, item.html_url]
              }))
            }], (answers: any) => {
              rtActions.listForCommitComment({
                ownername: ownername,
                reposname: reposname,
                id: answers.comment.split('│')[1].trim()
              }).then((resdata: any) => {
                if (resdata.length === 0) {
                  info('no reactions existed for this commit comment!')
                } else {
                  let dataTable: any = createTable({
                    head: ['id', 'reaction', 'creator', 'create_date'],
                    colWidths: [10, 10, 20, 40]
                  })
                  resdata.forEach((item: any) => {
                    dataTable.push([item.id, get(emojiMap[item.content]), item.user.login, item.created_at])
                  })
                  console.log(dataTable.toString())
                }
              })
            })
          }
        })
      })
    },
    '-i': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        issueActions.listForRepos({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no issues existed!')
          } else {
            let heads = [{
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
              rtActions.listForIssue({
                ownername: ownername,
                reposname: reposname,
                number: answers.issueItem.split('│')[1].trim()
              }).then((resdata: any) => {
                if (resdata.length > 0) {
                  let dataTable: any = createTable({
                    head: ['id', 'reaction', 'creator', 'create_date'],
                    colWidths: [10, 10, 20, 40]
                  })
                  resdata.forEach((item: any) => {
                    dataTable.push([item.id, get(emojiMap[item.content]), item.user.login, item.created_at])
                  })
                  console.log(dataTable.toString())
                } else {
                  info('no reactions existed for this issue')
                }
              })
            })
          }
        })
      })
    },
    '-ic': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        issueActions.listCommentsForRepo({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no issue comments existed!')
          } else {
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
                return [String(item.id), item.body || 'no content', item.html_url]
              }))
            }], (answers: any) => {
              rtActions.listForIssueComment({
                ownername: ownername,
                reposname: reposname,
                id: answers.comment.split('│')[1].trim()
              }).then((resdata: any) => {
                if (resdata.length > 0) {
                  let dataTable: any = createTable({
                    head: ['id', 'reaction', 'creator', 'create_date'],
                    colWidths: [10, 10, 20, 40]
                  })
                  resdata.forEach((item: any) => {
                    dataTable.push([item.id, get(emojiMap[item.content]), item.user.login, item.created_at])
                  })
                  console.log(dataTable.toString())
                } else {
                  info('no reactions existed for this issue comment')
                }
              })
            })
          }
        })
      })
    },
    '-p': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        prActions.listCommentsForRepo({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no pull request comments existed!')
          } else {
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
                return [String(item.id), item.body || 'no content', item.html_url]
              }))
            }], (answers: any) => {
              rtActions.listForPrReviewComment({
                ownername: ownername,
                reposname: reposname,
                id: answers.comment.split('│')[1].trim()
              }).then((resdata: any) => {
                if (resdata.length > 0) {
                  let dataTable: any = createTable({
                    head: ['id', 'reaction', 'creator', 'create_date'],
                    colWidths: [10, 10, 20, 40]
                  })
                  resdata.forEach((item: any) => {
                    dataTable.push([item.id, get(emojiMap[item.content]), item.user.login, item.created_at])
                  })
                  console.log(dataTable.toString())
                } else {
                  info('no reactions existed for this review comment')
                }
              })
            })
          }
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
          if (resdata.length === 0) {
            info('no commit comments existed!')
          } else {
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
              message: 'please select a commit comment:',
              choices: createChoiceTable(heads, resdata.map((item: any) => {
                return [String(item.id), item.body || 'no content', item.html_url]
              }))
            }, {
              type: 'list',
              name: 'reaction',
              message: 'please select a reaction type:',
              choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray'].map((item: any) => {
                return get(emojiMap[item])
              })
            }], (answers: any) => {
              rtActions.createForCommitComment({
                ownername: ownername,
                reposname: reposname,
                id: answers.comment.split('│')[1].trim(),
                data: {
                  content: getReaction(answers.reaction)
                }
              }).then((resdata: any) => {
                success('create reaction for commit comment success!')
                let dataTable: any = createTable({
                  head: ['id', 'creator', 'reaction', 'create_date'],
                  colWidths: [10, 20, 20, 40]
                })
                dataTable.push([resdata.id, resdata.user.login, get(emojiMap[resdata.content]), resdata.created_at])
                console.log(dataTable.toString())
              })
            })
          }
        })
      })
    },
    '-i': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        issueActions.listForRepos({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no issues existed!')
          } else {
            let heads = [{
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
            }, {
              type: 'list',
              name: 'reaction',
              message: 'please select a reaction type:',
              choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray'].map((item: any) => {
                return get(emojiMap[item])
              })
            }], function (answers: any) {
              rtActions.createForIssue({
                ownername: ownername,
                reposname: reposname,
                number: answers.issueItem.split('│')[1].trim(),
                data: {
                  content: getReaction(answers.reaction)
                }
              }).then((resdata: any) => {
                success('reaction for issue created success!')
                let dataTable: any = createTable({
                  head: ['id', 'creator', 'reaction', 'create_date'],
                  colWidths: [10, 20, 20, 40]
                })
                dataTable.push([resdata.id, resdata.user.login, get(emojiMap[resdata.content]), resdata.created_at])
                console.log(dataTable.toString())
              })
            })
          }
        })
      })
    },
    '-ic': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        issueActions.listCommentsForRepo({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no issue comments existed!')
          } else {
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
              choices: createChoiceTable(heads, resdata.forEach((item: any) => {
                return [String(item.id), item.body, item.html_url]
              }))
            }, {
              type: 'list',
              name: 'reaction',
              message: 'please select a reaction type:',
              choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray'].map((item: any) => {
                return get(emojiMap[item])
              })
            }], (answers: any) => {
              rtActions.createForIssueComment({
                ownername: ownername,
                reposname: reposname,
                id: answers.comment.split('│')[1].trim(),
                data: {
                  content: getReaction(answers.reaction)
                }
              }).then((resdata: any) => {
                success('reaction for issue comment created success!')
                let dataTable: any = createTable({
                  head: ['id', 'creator', 'reaction', 'create_date'],
                  colWidths: [10, 20, 20, 40]
                })
                dataTable.push([resdata.id, resdata.user.login, get(emojiMap[resdata.content]), resdata.created_at])
                console.log(dataTable.toString())
              })
            })
          }
        })
      })
    },
    '-p': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        prActions.listCommentsForRepo({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no pull request comments existed!')
          } else {
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
                return ([String(item.id), item.body, item.html_url])
              }))
            }, {
              type: 'list',
              name: 'reaction',
              message: 'please select a reaction type:',
              choices: ['+1', '-1', 'laugh', 'confused', 'heart', 'hooray'].map((item: any) => {
                return get(emojiMap[item])
              })
            }], (answers: any) => {
              rtActions.createForPrReviewComment({
                ownername: ownername,
                reposname: reposname,
                id: answers.comment.split('│')[1].trim(),
                data: {
                  content: getReaction(answers.reaction)
                }
              }).then((resdata: any) => {
                success('reaction for pull request review comment created success!')
                let dataTable: any = createTable({
                  head: ['id', 'creator', 'reaction', 'create_date'],
                  colWidths: [10, 20, 20, 40]
                })
                dataTable.push([resdata.id, resdata.user.login, get(emojiMap[resdata.content]), resdata.created_at])
                console.log(dataTable.toString())
              })
            })
          }
        })
      })
    }
  }
}
 