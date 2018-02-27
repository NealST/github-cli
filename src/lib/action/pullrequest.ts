import { previewAccept, request } from '../tools/request';
import { getToken, selectRepos, selectReposWithMode, getUserName } from '../tools/verification';
import askquestion, {createChoiceTable} from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import getHyperlinkText from '../tools/hyperlinker';
import promiseCompose from '../tools/promiseCompose';
import { info, success } from '../tools/output';
import { userStrategy } from './users';
import { reposActions } from './repos';

export const prActions = {
  // list all the pull requests of a repository
  listForRepos (listOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': previewAccept
        }
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // create a pull request
  createPr (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls`, 'post', createOptions.data, {
        headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': 'application/vnd.github.jean-grey-preview+json'
          }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // edit a pull request
  updatePr (updateOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${updateOptions.ownername}/${updateOptions.reposname}/pulls/${updateOptions.number}`, 'post', updateOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': previewAccept
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // check whether a pull request is merged
  isPrMerged (infoOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${infoOptions.ownername}/${infoOptions.reposname}/pulls/${infoOptions.number}/merge`, 'get', {}, {
        headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': previewAccept
          }  
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // merge a pull request
  mergePr (mergeOptions: any, fn?: Function) {
    return promiseCompose([getToken, () => {
      return Promise.all(mergeOptions.numbers.map((item: any) => {
        return request(`/repos/${mergeOptions.ownername}/${mergeOptions.reposname}/pulls/${item}/merge`, 'put', mergeOptions.data, {
          headers: {
              'Authorization': `token ${process.env.githubToken}`,
              'Accept': previewAccept
            }  
          })
      }))
    }])
  },
  // list reviews of a pull request
  listPrReviews (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/${listOptions.number}/reviews`, 'get', {})
      .then((res: any) => {
        return res.data
      })
  },
  // delete reviews of a pull request
  deletePrReviews (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(deleteOptions.ids.map((item: any) => {
        return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/pulls/${deleteOptions.number}/reviews/${item}`, 'delete', {}, {
          headers: {
            'Authorization': `token ${process.env.githubToken}`
          } 
        })
      })).then((res: any) => {
        return res
      })
    }])
  },
  // get comments of a review of a pull request
  listCommentsForReview (getOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/pulls/${getOptions.number}/reviews/${getOptions.id}/comments`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // create a pull request review
  createPrReview (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls/${createOptions.number}/reviews`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // submit pull request review
  submitPrReview (submitOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${submitOptions.ownername}/${submitOptions.reposname}/pulls/${submitOptions.number}/reviews/${submitOptions.id}/events`, 'post', submitOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // dismiss a pull request review
  dismissPrReview (disOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${disOptions.ownername}/${disOptions.reposname}/pulls/${disOptions.number}/reviews/${disOptions.id}/dismissals`, disOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // list comments on a pull request
  listCommentsForPr (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/${listOptions.number}/comments`, 'get', {})
      .then((res: any) => {
        return res.data
      })
  },
  // list comments in a repository
  listCommentsForRepo (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/comments`, 'get', {}, {
      headers: {
        'Accept': 'application/vnd.github.squirrel-girl-preview'
      }
    }).then((res: any) => {
      return res.data
    })
  },
  // edit a comment for repository pulls
  editComment (editOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${editOptions.ownername}/${editOptions.reposname}/pulls/comments/${editOptions.id}`, 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // delete a comment of repository pulls
  deleteComment (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(deleteOptions.ids.map((item: any) => {
        return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/pulls/comments/${item}`, 'delete', {}, {
          headers: {
            'Authorization': `token ${process.env.githubToken}`
          }
        })
      }))
    }])
  },
  // list review requests
  listReviewRequests (listOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/${listOptions.number}/requested_reviewers`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.thor-preview+json'
        }  
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // create a review request for a pull request
  createReviewRequest (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls/${createOptions.number}/requested_reviewers`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.thor-preview+json'
        }  
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // delete review request of a pull request
  deleteReviewRequest (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/pulls/${deleteOptions.number}/requested_reviewers`, 'delete', deleteOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.thor-preview+json'
        }  
      })
    }])
  }
}

const selectPr = function (fn: Function, type: string = 'list') {
  selectReposWithMode(function (reposname: string, targetName: string) {
    prActions.listForRepos({
      ownername: targetName,
      reposname: reposname
    }).then(function (resdata: any) {
      if (resdata.length > 0) {
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
          type: type,
          name: 'thepr',
          message: 'please select the pull requests you want:',
          choices: createChoiceTable(heads, resdata.map((item: any) => {
            return [String(item.number), item.title, item.body || 'no content', item.html_url]
          }))
        }], function (answers: any) {
          let selectPrs = type === 'list' ? answers.thepr.split('│')[1].trim() : answers.thepr.map((item: any) => {
            return item.split('│')[1].trim()
          })
          fn(targetName, reposname, selectPrs)
        })
      } else {
        info('no pull requests existed!please create it first')
      }
    })
  })
}

export const prStrategies: {[key: string]: any} = {
  'ls': {
    '-r': function () {
      selectReposWithMode(function (reposname: string, targetName: string) {
        prActions.listForRepos({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no pull requests existed!')
          } else {
            let dataTable: any = createTable({
              head: ['number', 'title', 'state', 'content', 'detailUrl(cmd+click)'],
              colWidths: [10, 20, 10, 40, 60],
              wordWrap: true
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.number, item.title, item.state, item.body || 'no content', item.html_url])
            })
            console.log(dataTable.toString())
          }
        })
      })
    },
    '-v': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.listPrReviews({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no reviews existed for this pull request')
          } else {
            let dataTable: any = createTable({
              head: ['id', 'creator', 'content', 'state', 'detailUrl(cmd+click)'],
              colWidths: [10, 20, 40, 20, 60],
              wordWrap: true
            })
            resdata.forEach((item: any) => {
              dataTable.push([item.id, item.user.login, item.body || 'no content', item.state, item.html_url])
            })
            console.log(dataTable.toString())
          }
        })
      })
    },
    '-c': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.listCommentsForPr({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no comments existed for this pull request!')
          } else {
            let dataTable: any = createTable({
              head: ['id', 'creator', 'content', 'detailUrl(cmd+click)'],
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
    '-cw': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.listPrReviews({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no reviews existed for this pull request')
          } else {
            let heads = [{
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
            }]
            askquestion([{
              type: 'list',
              name: 'review',
              message: 'please select a review from this list:',
              choices: createChoiceTable(heads, resdata.map((item: any) => {
                return [String(item.id), item.state, item.body, item.html_url]
              }))
            }], function (answers: any) {
              prActions.listCommentsForReview({
                ownername: ownername,
                reposname: reposname,
                number: prnumber,
                id: answers.review.split('│')[1].trim()
              }).then((resdata: any) => {
                if (resdata.length === 0) {
                  info('no comments existed for this review!')
                } else {
                  let dataTable: any = createTable({
                    head: ['id', 'creator', 'content', 'detailUrl(cmd+click)'],
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
          }
        })
      })
    },
    '-cr': function () {
      selectReposWithMode(function (reposname: string, targetName: string) {
        prActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no comments existed for this repository!')
          } else {
            let dataTable: any = createTable({
              head: ['id', 'creator', 'content', 'detailUrl(cmd+click)'],
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
    '-rp': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.listReviewRequests({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['reviewers', 'team_reviewers'],
            colWidths: [20, 20]
          })
          let usersdata = resdata.users
          let teamdata = resdata.teams
          let thelength = Math.max(usersdata.length, teamdata.length)
          for (let i = 0;i < thelength; i++) {
            dataTable.push([(usersdata[i] && usersdata[i].login) || 'no user reviewers', (teamdata[i] && teamdata[i].name) || 'no team reviewers'])
          }
          console.log(dataTable.toString())
        })
      })
    }
  },
  'cr': {
    '-p': function () {
      selectReposWithMode(function (reposname: string, targetName: string) {
        function createPr (headBranches: any, baseBranches: any, reposInfo: any) {
          askquestion([{
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
          }], function (answers: any) {
            prActions.createPr({
              ownername: reposInfo.ownername,
              reposname: reposInfo.reposname,
              data: {
                title: answers.title,
                head: process.env.githubUserMode === 'target' ? `${reposInfo.ownname}:${answers.head}` : answers.head,
                base: answers.base
              }
            }).then((resdata: any) => {
              success('create pull request success!')
              let dataTable: any = createTable({
                head: ['number', 'title', 'state', 'description', 'detailUrl(cmd+click)'],
                colWidths: [10, 20, 20, 40, 60],
                wordWrap: true
              })
              dataTable.push([resdata.number, resdata.title, resdata.state, resdata.body || 'no description', resdata.html_url])
              console.log(dataTable.toString())
            })
          })
        }
        reposActions.getBranches({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          let branches = resdata.map((item: any) => {
            return item.name
          })
          if (process.env.githubUserMode === 'target') {
            getUserName((username: string) => {
              reposActions.getBranches({
                ownername: username,
                reposname: reposname
              }).then((resdata: any) => {
                let headBranches = resdata.map((item: any) => {
                  return item.name
                })
                createPr(headBranches, branches, {
                  ownername: targetName,
                  reposname: reposname,
                  ownname: username
                })
              })
            })
          } else {
            createPr(branches, branches, {
              ownername: targetName,
              reposname: reposname
            })
          }
        })
      })
    },
    '-pr': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        function successProcess (resdata: any) {
          success('create pull request review success!')
          let dataTable: any = createTable({
            head: ['id', 'content', 'state', 'detailUrl(cmd+click)'],
            colWidths: [10, 40, 20, 60],
            wordWrap: true
          })
          dataTable.push([resdata.id, resdata.body, resdata.state, resdata.html_url])
          console.log(dataTable.toString())
        }
        askquestion([{
          type: 'list',
          name: 'event',
          message: 'please select a review type:',
          choices: ['APPROVE', 'REQUEST_CHANGES', 'COMMENT']
        }], function (answers: any) {
          if (answers.event !== 'APPROVE') {
            askquestion([{
              type: 'editor',
              name: 'body',
              message: 'please input the content of review:'
            }], function (bodyanswers: any) {
              prActions.createPrReview({
                ownername: ownername,
                reposname: reposname,
                number: prnumber,
                data: {
                  body: bodyanswers.body,
                  event: answers.event
                }
              }).then((resdata: any) => {
                successProcess(resdata)
              })
            })
          } else {
            prActions.createPrReview({
              ownername: ownername,
              reposname: reposname,
              number: prnumber,
              data: {
                event: answers.event
              }
            }).then((resdata: any) => {
              successProcess(resdata)
            })
          }
        })
      })
    },
    '-rp': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        askquestion([{
          type: 'input',
          name: 'reviewers',
          message: 'please input the names of reviewers(split with space):'
        }, {
          type: 'confirm',
          name: 'needteam',
          message: 'Do you need add team reviewers?:'
        }], (firstanswers: any) => {
          if (firstanswers.needteam) {
            askquestion([{
              type: 'input',
              name: 'teamviewers',
              message: 'please input the names of team reviewers(split with space):'
            }], (answers: any) => {
              prActions.createReviewRequest({
                ownername: ownername,
                reposname: reposname,
                number: prnumber,
                data: {
                  reviewers: firstanswers.reviewers.split(' '),
                  team_reviewers: answers.teamviewers.split(' ')
                }
              }).then((resdata: any) => {
                success('create review request success!')
              })
            })
          } else {
            prActions.createReviewRequest({
              ownername: ownername,
              reposname: reposname,
              number: prnumber,
              data: {
                reviewers: firstanswers.reviewers.split(' ')
              }
            }).then((resdata: any) => {
              success('create review request success!')
            })
          }
        })
      })
    }
  },
  'et': {
    '-p': function () {
      let questionObject: {[key: string]: any} = {
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
      }
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        askquestion([{
          type: 'checkbox',
          name: 'changetypes',
          message: 'please select some items you want to update:',
          choices: ['title', 'body', 'state', 'base']
        }], function (answers: any) {
          let questionArray: any = []
          answers.changetypes.forEach((item: any) => {
            questionArray.push(questionObject[item])
          })
          askquestion(questionArray, function (editanswers: any) {
            prActions.updatePr({
              ownername: ownername,
              reposname: reposname,
              number: prnumber,
              data: editanswers
            }).then((resdata: any) => {
              success('update pull request success!')
              let dataTable: any = createTable({
                head: ['number', 'title', 'state', 'description', 'detailUrl(cmd+click)'],
                colWidths: [10, 20, 10, 40, 60],
                wordWrap: true
              })
              dataTable.push([resdata.number, resdata.title, resdata.state, resdata.body || 'no content', resdata.html_url])
              console.log(dataTable.toString())
            })
          })
        })
      })
    },
    '-c': function () {
      selectReposWithMode(function (reposname: string, targetName: string) {
        prActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no comments existed for this repository!you need create it first')
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
              message: 'please select a comment to be edited:',
              choices: createChoiceTable(heads, resdata.map((item: any) => {
                return [String(item.id), item.body || 'no content', item.html_url]
              }))
            }, {
              type: 'editor',
              name: 'body',
              message: 'please input the content of this comment:'
            }], function (answers: any) {
              prActions.editComment({
                ownername: targetName,
                reposname: reposname,
                id: answers.comment.split('│')[1].trim(),
                data: {
                  body: answers.body
                }
              }).then((resdata: any) => {
                success('update comment success!')
                let dataTable: any = createTable({
                  head: ['id', 'content', 'detailUrl(cmd+click)'],
                  colWidths: [10, 40, 60],
                  wordWrap: true
                })
                dataTable.push([resdata.id, resdata.body, resdata.html_url])
                console.log(dataTable.toString())
              })
            })
          }
        })
      })
    }
  },
  'rm': {
    '-v': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.listPrReviews({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no reviews existed for this pull request! you need create it first')
          } else {
            let heads = [{
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
            }]
            askquestion([{
              type: 'checkbox',
              name: 'reviewids',
              message: 'please select some reviews to be removed:',
              choices: createChoiceTable(heads, resdata.map((item: any) => {
                return [String(item.id), item.body, item.state, item.html_url]
              }))
            }], function (answers: any) {
              prActions.deletePrReviews({
                ownername: ownername,
                reposname: reposname,
                number: prnumber,
                ids: answers.reviewids.map((item: any) => {
                  return item.split('│')[1].trim()
                })
              }).then((res: any) => {
                success('delete reviews success!')
              })
            })
          }
        })
      })
    },
    '-c': function () {
      selectReposWithMode(function (reposname: string, targetName: string) {
        prActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.length === 0) {
            info('no comments existed!you need create it first')
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
              type: 'checkbox',
              name: 'comments',
              message: 'please select some comments to be removed:',
              choices: createChoiceTable(heads, resdata.map((item: any) => {
                return [String(item.id), item.body || 'no content', item.html_url]
              }))
            }], function (answers: any) {
              prActions.deleteComment({
                ownername: targetName,
                reposname: reposname,
                ids: answers.comments.map((item: any) => {
                  return item.split('│')[1].trim()
                })
              })
            })
          }
        })
      })
    },
    '-r': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.deleteReviewRequest({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        }).then((resdata: any) => {
          success('delete review request success!')
        })
      })
    }
  },
  'mr': function () {
    selectPr(function (ownername: string, reposname: string, prnumbers: any) {
      askquestion([{
        type: 'list',
        name: 'method',
        message: 'please select a merge type:',
        choices: ['merge', 'squash', 'rebase']
      }], function (answers: any) {
        prActions.mergePr({
          ownername: ownername,
          reposname: reposname,
          numbers: prnumbers,
          data: {
            merge_method: answers.method
          }
        }).then((resdata: any) => {
          success('Pull Request successfully merged!')
        })
      })
    }, 'checkbox')
  },
  'st': function () {
    selectPr(function (ownername: string, reposname: string, prnumber: number) {
      prActions.listPrReviews({
        ownername: ownername,
        reposname: reposname,
        number: prnumber
      }).then((resdata: any) => {
        if (resdata.length === 0) {
          info('no reviews existed for this pull request')
        } else {
          let heads = [{
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
          }]
          askquestion([{
            type: 'list',
            name: 'review',
            message: 'please select a review to be submitted:',
            choices: createChoiceTable(heads, resdata.map((item: any) => {
              return [String(item.id), item.body || 'no content', item.state, item.html_url]
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
          }], function (answers: any) {
            prActions.submitPrReview({
              ownername: ownername,
              reposname: reposname,
              number: prnumber,
              id: answers.review.split('│')[1].trim(),
              data: {
                body: answers.body,
                event: answers.event
              }
            }).then((resdata: any) => {
              success('submit a pull request review success!')
              let dataTable: any = createTable({
                head: ['id', 'content', 'state', 'detailUrl(cmd+click)'],
                colWidths: [10, 40, 20, 60],
                wordWrap: true
              })
              dataTable.push([resdata.id, resdata.body, resdata.state, resdata.html_ul])
              console.log(dataTable.toString())
            })
          })
        }   
      })
    })
  },
  'ds': function () {
    selectPr(function (ownername: string, reposname: string, prnumber: number) {
      prActions.listPrReviews({
        ownername: ownername,
        reposname: reposname,
        number: prnumber
      }).then((resdata: any) => {
        if (resdata.length === 0) {
          info('no reviews existed for this pull request')
        } else {
          let heads = [{
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
          }]
          askquestion([{
            type: 'list',
            name: 'review',
            message: 'please select a review to be dismissed:',
            choices: createChoiceTable(heads, resdata.map((item: any) => {
              return [String(item.id), item.body || 'no content', item.state, item.html_url]
            }))
          }, {
            type: 'input',
            name: 'message',
            message: 'please input the message for the pull request review dismissal'
          }], function (answers: any) {
            prActions.dismissPrReview({
              ownername: ownername,
              reposname: reposname,
              number: prnumber,
              id: answers.review.split('│')[1].trim(),
              data: {
                message: answers.message
              }
            }).then((resdata: any) => {
              success('pull request review dismissed success!')
              let dataTable: any = createTable({
                head: ['id', 'content', 'state', 'detailUrl(cmd+click)'],
                colWidths: [10, 40, 20, 60],
                wordWrap: true
              })
              dataTable.push([resdata.id, resdata.body || 'no content', resdata.state, resdata.html_url])
              console.log(dataTable.toString())
            })
          })
        }
      })
    })
  }
}
