import {request} from '../tools/request'
import { getToken, getUserName } from '../tools/verification'
import promiseCompose from '../tools/promiseCompose';
const acceptType = 'application/vnd.github.squirrel-girl-preview+json'


export default {
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
  },
  // delete a reaction
  deleteReaction (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/reactions/${deleteOptions.id}`, 'delete', {}, {
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