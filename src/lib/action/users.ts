import {request} from '../tools/request'
import { getToken, validateName } from '../tools/verification'

export default {
  // update personal info about a user
  editUser (editOptions: any) {
    getToken(() => {
      request('/user', 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // list followers of a user
  listFollowers (listOptions: any) {
    request(`/users/${listOptions.username}/followers`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // list own followers
  listOwnFollowers (listOptions: any) {
    getToken(() => {
      request('/user/followers', 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data) 
      })
    })
  },
  // list who a user is following
  listFollowing (listOptions: any) {
    request(`/users/${listOptions.username}/following`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // list own following
  listOwnFollowing (listOptions: any) {
    request('/user/following', 'get', {}, {
      headers: {
        'Authorization': `token ${process.env.githubToken}`
      }  
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // check if you are following a user
  checkOwnFollowing (checkOptions: any) {
    getToken(() => {
      request(`/user/following/${checkOptions.username}`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // follow a user
  addFollower (options: any) {
    getToken(() => {
      request(`/user/following/${options.username}`, 'put', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // unfollow a user
  deleteFollower (options: any) {
    getToken(() => {
      request(`/user/following/${options.username}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  }
}
