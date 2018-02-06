import {request} from '../tools/request'
import { getToken, getUserName } from '../tools/verification'
const acceptType = 'application/vnd.github.mercy-preview+json'

export default {
  // search repositories
  searchRepos (options: any) {
    return request(`/search/repositories`, 'get', options.data, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // search commits
  searchCommits (options: any) {
    return request(`/search/commits`, 'get', options.data, {
      headers: {
        'Accept': 'application/vnd.github.cloak-preview'
      }
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // search issues
  searchIssues (options: any) {
    return request('/search/issues', 'get', options.data, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // search users
  searchUsers (options: any) {
    return request('/search/users', 'get', options.data, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  }
}