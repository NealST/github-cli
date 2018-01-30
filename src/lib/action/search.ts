import {request} from '../tools/request'
import { getToken, validateName } from '../tools/verification'
const acceptType = 'application/vnd.github.mercy-preview+json'

export default {
  // search repositories
  searchRepos (options: any) {
    request(`/search/repositories`, 'get', options.data, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // search commits
  searchCommits (options: any) {
    request(`/search/commits`, 'get', options.data, {
      headers: {
        'Accept': 'application/vnd.github.cloak-preview'
      }
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // search issues
  searchIssues (options: any) {
    request('/search/issues', 'get', options.data, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // search users
  searchUsers (options: any) {
    request('/search/users', 'get', options.data, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      console.log(res.data)
    })
  }
}