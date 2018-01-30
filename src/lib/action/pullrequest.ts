import { previewAccept, request } from '../tools/request';
import { getToken, validateName } from '../tools/verification';

export default {
  // 列出所有的pull request
  listAll (listOptions: any, fn?: Function) {
    getToken(function () {
      request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': previewAccept
        }  
      }).then((res: any) => {
        console.log(res.data)
        fn && fn(res.data)
      }).catch((err: any) => {
        console.log(err)
      })
    })
  },
  // 创建一个pull request
  create (createOptions: any) {
    getToken(function () {
      request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls`, 'post', createOptions.data, {
        headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': previewAccept
          }  
      }).then((res: any) => {
        console.log(res.data)
      }).catch((err: any) => {
        console.log(err)
      })
    })
  },
  // 更新pull request
  update (updateOptions: any) {
    getToken(function () {
      request(`/repos/${updateOptions.ownername}/${updateOptions.reposname}/pulls/${updateOptions.number}`, 'post', updateOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': previewAccept
        }  
      }).then((res: any) => {
        console.log(res.data)
      }).catch((err: any) => {
        console.log(err)
      })
    })
  },
  // 判断是否合并了pull request
  isPrMerged (infoOptions: any, fn?: Function) {
    getToken(function () {
      request(`/repos/${infoOptions.ownername}/${infoOptions.reposname}/pulls/${infoOptions.number}/merge`, 'get', {}, {
        headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': previewAccept
          }  
        }).then((res: any) => {
          console.log(res.data)
          fn && fn(res.data)
        }).catch((err: any) => {
          console.log(err)
      })
    })
  },
  // 合并一个pull request
  mergePr (mergeOptions: any, fn?: Function) {
    getToken(function () {
      request(`/repos/${mergeOptions.ownername}/${mergeOptions.reposname}/pulls/${mergeOptions.number}/merge`, 'put', mergeOptions.data, {
        headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': previewAccept
          }  
        }).then((res: any) => {
          console.log(res.data)
          fn && fn(res.data)
        }).catch((err: any) => {
          console.log(err)
      })
    })
  },
  // 列出pull request的所有review
  listPrReviews (listOptions: any) {
    request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/${listOptions.number}/reviews`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // 删除一个review
  deletePrReviews (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/pulls/${deleteOptions.number}/reviews/${deleteOptions.id}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        } 
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // 获取某个review的评论
  getCommentsForReview (getOptions: any) {
    getToken(() => {
      request(`/repos/${getOptions.ownername}/${getOptions.reposname}/pulls/${getOptions.number}/reviews/${getOptions.id}/comments`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // create a pull request review
  createPrReview (createOptions: any) {
    getToken(() => {
      request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls/${createOptions.number}/reviews`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // submit pull request review
  submitPrReview (submitOptions: any) {
    getToken(() => {
      request(`/repos/${submitOptions.ownername}/${submitOptions.reposname}/pulls/${submitOptions.number}/reviews/${submitOptions.id}/events`, 'post', submitOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // get a single pull request
  getSinglePr (getOptions: any) {
    request(`/repos/${getOptions.ownername}/${getOptions.reposname}/pulls/${getOptions.number}`, 'get', {}, {
      headers: {
        'Accept': 'application/vnd.github.v3.diff'
      }  
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // dismiss a pull request review
  dismissPrReview (disOptions: any) {
    getToken(() => {
      request(`/repos/${disOptions.ownername}/${disOptions.reposname}/pulls/${disOptions.number}/reviews/${disOptions.id}/dismissals`, disOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // list comments on a pull request
  listCommentsForPr (listOptions: any) {
    request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/${listOptions.number}/comments`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // list comments in a repository
  listCommentsForRepo (listOptions: any) {
    request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/comments`, 'get', {}, {
      headers: {
        'Accept': 'application/vnd.github.squirrel-girl-preview'
      }
    }).then((res: any) => {
        console.log(res.data)
      })
  },
  // create a comment
  createComment (createOptions: any) {
    getToken(() => {
      request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls/${createOptions.number}/comments`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // edit a comment
  editComment (editOptions: any) {
    getToken(() => {
      request(`/repos/${editOptions.ownername}/${editOptions.reposname}/pulls/comments/${editOptions.id}`, 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // delete a comment
  deleteComment (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/pulls/comments/${deleteOptions.id}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // list review requests
  listReviewRequests (listOptions: any) {
    getToken(() => {
      request(`/repos/${listOptions.ownername}/${listOptions.reposname}/pulls/${listOptions.number}/requested_reviewers`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.thor-preview+json'
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // create a review request
  createReviewRequest (createOptions: any) {
    getToken(() => {
      request(`/repos/${createOptions.ownername}/${createOptions.reposname}/pulls/${createOptions.number}/requested_reviewers`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.thor-preview+json'
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // delete a review request
  deleteReviewRequest (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/pulls/${deleteOptions.number}/requested_reviewers`, 'delete', deleteOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': 'application/vnd.github.thor-preview+json'
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  }

}