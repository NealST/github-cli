import {request} from '../tools/request'
import { getToken, getUserName } from '../tools/verification';
import promiseCompose from '../tools/promiseCompose';
import askquestion from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import getHyperlinkText from '../tools/hyperlinker';

export const userActions = {
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
  listOwnFollowers () {
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
  listOwnFollowing () {
    return request('/user/following', 'get', {}, {
      headers: {
        'Authorization': `token ${process.env.githubToken}`
      }  
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
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
      return Promise.all(options.usernames.map((item: any) => {
        return request(`/user/following/${item}`, 'delete', {}, {
          headers: {
            'Authorization': `token ${process.env.githubToken}`
          }
        })
      })).then((res: any) => {
        console.log(res)
        return res
      })
    }])
  }
}

export const userStrategy: {[key: string]: any} = {
  'ls': {
    '-m': function () {
      if (process.env.githubUserMode === 'target') {
        getUserName((ownername: string) => {
          userActions.listFollowers({username: ownername})
        }, true)
      } else {
        userActions.listOwnFollowers()
      }
    },
    '-t': function () {
      if (process.env.githubUserMode === 'target') {
        getUserName((ownername: string) => {
          userActions.listFollowing({username: ownername})
        }, true)
      } else {
        userActions.listOwnFollowing()
      }
    }
  },
  'et': function () {
    let questionObject: {[key: string]: any} = {
      name: {
        type: 'input',
        name: 'name',
        message: 'please input your new name:'
      },
      email: {
        type: 'input',
        name: 'email',
        message: 'please input your new email address:'
      },
      blog: {
        type: 'input',
        name: 'blog',
        message: 'please input your new blog url address:'
      },
      company: {
        type: 'input',
        name: 'company',
        message: 'please input your new company name:'
      },
      location: {
        type: 'input',
        name: 'location',
        message: 'please input your new location:'
      },
      hireable: {
        type: 'confirm',
        name: 'hireable',
        message: 'are you hireable?:'
      }
    }
    askquestion([{
      type: 'checkbox',
      name: 'filter',
      message: 'please select items you want to update:',
      choices: Object.keys(questionObject)
    }], (answers: any) => {
      let questionArray = answers.filter.map((item: any) => {
        return questionObject[item]
      })
      askquestion(questionArray, (theanswers: any) => {
        userActions.editUser({
          data: theanswers
        })
      })
    })
  },
  'fl': function () {
    getUserName((username: string) => {
      userActions.addFollower({username: username})
    }, true)
  },
  'rf': function () {
    userActions.listOwnFollowing().then((resdata: any) => {
      let dataTable: any = createTable({
        head: ['name', 'detailUrl']
      })
      resdata.forEach((item: any) => {
        dataTable.push([item.login, getHyperlinkText(item.html_url)])
      })
      askquestion([{
        type: 'checkbox',
        name: 'removers',
        message: 'please select some following users to remove:',
        choices: dataTable
      }], (answers: any) => {
        userActions.deleteFollower({
          usernames: answers.removers.map((item: any) => {
            return item[0]
          })
        })
      })
    })
  }
}
