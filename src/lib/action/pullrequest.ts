import { previewAccept, request } from '../tools/request';
import { getToken, selectRepos } from '../tools/verification';
import askquestion from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import getHyperlinkText from '../tools/hyperlinker';
import promiseCompose from '../tools/promiseCompose';

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
        console.log(res.data)
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
            'Accept': previewAccept
          }  
      }).then((res: any) => {
        console.log(res.data)
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
        console.log(res.data)
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
      })).then((res: any) => {
        return res
      })
    }])
  },
  // list reviews of a pull request
  listPrReviews (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/${listOptions.number}/reviews`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
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
        console.log(res)
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
        console.log(res.data)
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
        console.log(res.data)
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
        console.log(res.data)
        return res.data
      })
    }])
  },
  // get a single pull request
  getSinglePr (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/pulls/${getOptions.number}`, 'get', {}, {
      headers: {
        'Accept': 'application/vnd.github.v3.diff'
      }  
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // dismiss a pull request review
  dismissPrReview (disOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${disOptions.ownername}/${disOptions.reposname}/pulls/${disOptions.number}/reviews/${disOptions.id}/dismissals`, disOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // list comments on a pull request
  listCommentsForPr (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/${listOptions.number}/comments`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
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
      console.log(res.data)
      return res.data
    })
  },
  // create a comment for a pull request
  createComment (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls/${createOptions.number}/comments`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // edit a comment for repository pulls
  editComment (editOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${editOptions.ownername}/${editOptions.reposname}/pulls/comments/${editOptions.id}`, 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
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
      })).then((res: any) => {
        console.log(res)
        return res.data
      })
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
        console.log(res.data)
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
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  }
}

const selectPr = function (fn: Function, type: string = 'list') {
  selectRepos(function (reposname: string, targetName: string) {
    prActions.listForRepos({
      ownername: targetName,
      reposname: reposname
    }).then(function (resdata: any) {
      let dataTable: any = createTable({
        head: ['number', 'state', 'title', 'body', 'detailUrl']
      })
      resdata.forEach((item: any) => {
        dataTable.push([item.number, item.state, item.title, item.body, item.html_url])
      })
      askquestion([{
        type: type,
        name: 'thepr',
        message: 'please select the pull requests you want:'
      }], function (answers: any) {
        let selectPrs = type === 'list' ? answers.thepr[0] : answers.thepr.map((item: any) => {
          return item[0]
        })
        fn(targetName, reposname, selectPrs)
      })
    })
  }, true, 'list')
}

export const prStrategies: {[key: string]: any} = {
  'ls': {
    '-r': function () {
      selectRepos(function (reposname: string, targetName: string) {
        prActions.listForRepos({
          ownername: targetName,
          reposname: reposname
        })
      }, true, 'list')
    },
    '-p': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.listPrReviews({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        })
      })
    },
    '-c': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.listCommentsForPr({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
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
          let dataTable: any = createTable({
            head: ['id', 'state', 'body', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.state, item.body, getHyperlinkText('点击获取该review详情', item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'review',
            message: 'please select a review from this list:',
            choices: dataTable
          }], function (answers: any) {
            prActions.listCommentsForReview({
              ownername: ownername,
              reposname: reposname,
              number: prnumber,
              id: answers.review[0]
            })
          })
        })
      })
    },
    '-cr': function () {
      selectRepos(function (reposname: string, targetName: string) {
        prActions.listCommentsForRepo({
          ownername: targetName,
          reposname: reposname
        }).then((resdata: any) => {
          console.log(resdata)
        })
      }, true, 'list')
    },
    '-rp': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.listReviewRequests({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        })
      })
    }
  },
  'cr': {
    '-p': function () {
      selectRepos(function (reposname: string, targetName: string) {
        askquestion([{
          type: 'input',
          name: 'title',
          message: 'please input the title of this pull request:'
        }, {
          type: 'input',
          name: 'head',
          message: 'please input the head branch name:'
        }, {
          type: 'input',
          name: 'base',
          message: 'please input the base branch name:'
        }], function (answers: any) {
          prActions.createPr({
            ownername: targetName,
            reposname: reposname,
            data: {
              title: answers.title,
              head: answers.head,
              base: answers.base
            }
          })
        })
      }, true, 'list')
    },
    '-pr': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
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
            })
          }
        })
      })
    },
    '-c': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.createComment({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
        })
      })
    },
    '－rp': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.createReviewRequest({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
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
            })
          })
        })
      })
    },
    '-c': function () {
      selectRepos(function (reposname: string, targetName: string) {
        prActions.listCommentsForRepo({
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
            message: 'please select a comment to be edited:',
            choices: dataTable
          }, {
            type: 'input',
            name: 'body',
            message: 'please input the content of this comment:'
          }], function (answers: any) {
            prActions.editComment({
              ownername: targetName,
              reposname: reposname,
              id: answers.comment[0],
              data: {
                body: answers.body
              }
            })
          })
        })
      }, true, 'list')
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
          let dataTable: any = createTable({
            head: ['id', 'body', 'state', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.body, item.state, getHyperlinkText('点击查看该review详情', item.html_url)])
          })
          askquestion([{
            type: 'checkbox',
            name: 'reviewids',
            message: 'please select some reviews to be removed:',
            choices: dataTable
          }], function (answers: any) {
            prActions.deletePrReviews({
              ownername: ownername,
              reposname: reposname,
              number: prnumber,
              ids: answers.reviewids.map((item: any) => {
                return item[0]
              })
            })
          })
        })
      })
    },
    '-c': function () {
      selectRepos(function (reposname: string, targetName: string) {
        prActions.listCommentsForRepo({
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
            prActions.deleteComment({
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
    '-r': function () {
      selectPr(function (ownername: string, reposname: string, prnumber: number) {
        prActions.deleteReviewRequest({
          ownername: ownername,
          reposname: reposname,
          number: prnumber
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
        let dataTable: any = createTable({
          head: ['id', 'content', 'state', 'detaiUrl']
        })
        resdata.forEach((item: any) => {
          dataTable.push([item.id, item.body, item.state, getHyperlinkText('点击查看该review详情', item.html_url)])
        })
        askquestion([{
          type: 'list',
          name: 'review',
          message: 'please select a review to be submitted:',
          choices: dataTable
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
            id: answers.review,
            data: {
              body: answers.body,
              event: answers.event
            }
          })
        })
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
        let dataTable: any = createTable({
          head: ['id', 'content', 'state', 'detaiUrl']
        })
        resdata.forEach((item: any) => {
          dataTable.push([item.id, item.body, item.state, getHyperlinkText('点击查看该review详情', item.html_url)])
        })
        askquestion([{
          type: 'list',
          name: 'review',
          message: 'please select a review to be dismissed:',
          choices: dataTable
        }, {
          type: 'input',
          name: 'message',
          message: 'please input the message for the pull request review dismissal'
        }], function (answers: any) {
          prActions.dismissPrReview({
            ownername: ownername,
            reposname: reposname,
            number: prnumber,
            id: answers.review,
            data: {
              message: answers.message
            }
          })
        })
      })
    })
  }
}
