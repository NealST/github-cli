import {request} from '../tools/request'
import { getToken, getUserName } from '../tools/verification'
import promiseCompose from '../tools/promiseCompose';

export default {
  // update personal info about a user
  editUser (editOptions: any) {
    return promiseCompose([getToken, () => {
      return request('/user', 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // list followers of a user
  listFollowers (listOptions: any) {
    return request(`/users/${listOptions.username}/followers`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  // list own followers
  listOwnFollowers (listOptions: any) {
    return promiseCompose([getToken, () => {
      return request('/user/followers', 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // list who a user is following
  listFollowing (listOptions: any) {
    return request(`/users/${listOptions.username}/following`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  // list own following
  listOwnFollowing (listOptions: any) {
    return request('/user/following', 'get', {}, {
      headers: {
        'Authorization': `token ${process.env.githubToken}`
      }  
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // check if you are following a user
  checkOwnFollowing (checkOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/following/${checkOptions.username}`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // follow a user
  addFollower (options: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/following/${options.username}`, 'put', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // unfollow a user
  deleteFollower (options: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/following/${options.username}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }  
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  }
}
