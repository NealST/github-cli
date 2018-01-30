import {request, previewAccept} from '../tools/request'
import { getToken, getUserName } from '../tools/verification';
const acceptType = 'application/vnd.github.jean-grey-preview+json'

export default {
  create (reposNameList: Array<string>, fn: Function) {
    getToken(function () {
      Promise.all(reposNameList.map((item) => {
        return request(`/user/repos`, 'post', {name: item}, {
          headers: {
            'Authorization': `token ${process.env.githubToken}`
          }
        })
      })).then((res: any) => {
        console.log(res)
      })
    })
  },
  delete (reposNameList: Array<string>) {
    getToken(function () {
      getUserName(function () {
        Promise.all(reposNameList.map((item) => {
          return request(`/repos/${process.env.githubUserName}/${item}`, 'delete', {}, {
            headers: {
              'Authorization': `token ${process.env.githubToken}`
            }
          })
        })).then((res: any) => {
          console.log(res)
        })
      })
    })
  },
  getAll (fn?: Function) {
    getToken(function () {
      request(`/user/repos`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        fn && fn(res.data)
      })
    })
  },
  getReposForUser (ownername: string, fn?: Function) {
    request(`/users/${ownername}/repos`, 'get', {}).then((res: any) => {
      fn && fn(res.data)
    })
  },
  getBranches (getOptions: any, fn?: Function) {
    request(`/repos/${getOptions.ownername}/${getOptions.reposname}/branches`, 'get', {}).then((res: any) => {
      fn && fn(res.data)
    })
  },
  getTopics (reposnamelist: Array<string>) {
    getUserName(function () {
      Promise.all(reposnamelist.map((item) => {
        return request(`/repos/${process.env.githubUserName}/${item}/topics`, 'get', {}, {
          headers: {
            'Accept': previewAccept
          }
        })
      })).then((res: any) => {
        console.log(res)
      })
    })
  },
  replaceTopics (reposname: string, topics: Array<string>) {
    getToken(function () {
      getUserName(function () {
        request(`/repos/${process.env.githubUserName}/${reposname}/topics`, 'put', {},  {
          headers: {
            'Accept': previewAccept,
            'Authorization': `token ${process.env.githubToken}`
          }
        }).then((res: any) => {
          console.log(res.data)
        })
      })
    })
  },
  getContributors (reposnamelist: Array<string>) {
    getUserName(function () {
      Promise.all(reposnamelist.map((item) => {
        return request(`/repos/${process.env.githubUserName}/${item}/contributors`, 'get', {})
      })).then((res: any) => {
          console.log(res)
      })
    })
  },
  transfer (reposnamelist: Array<string>, newowner: string) {
    getToken(() => {
      getUserName(function () {
        Promise.all(reposnamelist.map((item) => {
          return request(`/repos/${process.env.githubUserName}/${item}/transfer`, 'post', {
            new_owner: newowner
          }, {
            headers: {
              'Authorization': `token ${process.env.githubToken}`
            }
          })
        })).then((res: any) => {
          console.log(res.data)
        })
      })
    })
  },
  getStarredRepos (getStarOptions?: any) {
    getToken(() => {
      request(`/user/starred`, 'get', getStarOptions || {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  getStarredReposForUser (getStarOptions: any) {
    request(`/users/${getStarOptions.username}/starred`, 'get', getStarOptions.data || {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  getWatchedRepos (getWatchOptions?: any) {
    getToken(function () {
      request(`/user/subscriptions`, 'get', getWatchOptions || {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  getWatchedReposForUser (getWatchOptions: any) {
    request(`/users/${getWatchOptions.username}/subscriptions`, 'get', getWatchOptions.data || {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  setRepoSubscription (setOptions: any) {
    getToken(function () {
      request(`/repos/${setOptions.ownername}/${setOptions.reposname}/subscription`, 'put', setOptions.data || {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  starRepo (starOptions: any) {
    getToken(() => {
      request(`/user/starred/${starOptions.ownername}/${starOptions.reposname}`, 'put', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  unStarRepo (starOptions: any) {
    getToken(() => {
      request(`/user/starred/${starOptions.ownername}/${starOptions.reposname}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  unWatchRepo (watchOptions: any) {
    getToken(() => {
      request(`/repos/${watchOptions.ownername}/${watchOptions.reposname}/subscription`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // 比较两个分支内容的异同
  compareCommits (compareOptions: any) {
    request(`/repos/${compareOptions.ownername}/${compareOptions.reposname}/compare/${compareOptions.base}...${compareOptions.head}`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // fork某个仓库
  fork (forkOptions: any) {
    getToken(() => {
      request(`/repos/${forkOptions.ownername}/${forkOptions.reposname}/forks`, 'post', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // 合并分支
  merge (mergeOptions: any) {
    getToken(() => {
      request(`/repos/${mergeOptions.ownername}/${mergeOptions.reposname}/merges`, 'post', mergeOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // 获取仓库的reademe文档
  getReadme (getOptions: any) {
    request(`/repos/${getOptions.ownername}/${getOptions.reposname}/readme`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // 获取仓库下的提交记录
  getCommits (getOptions: any) {
    request(`/repos/${getOptions.ownername}/${getOptions.reposname}/commits`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // 获取仓库的成员
  getCollaborators (getOptions: any) {
    request(`/repos/${getOptions.ownername}/${getOptions.reposname}/collaborators`, 'get', {}, {
      headers: {
        'Accept': previewAccept
      }
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // 检查一个某个用户是否为仓库成员
  checkCollaborator (checkOptions: any) {
    request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/collaborators/${checkOptions.username}`, 'get', {}, {
      headers: {
        'Accept': previewAccept
      }
    }).then((res: any) => {

    }).catch(() => {
      // 404 not a collaborator
    })
  },
  // 查看一个成员的权限信息
  checkCollaboratorPermission (checkOptions: any) {
    request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/collaborators/${checkOptions.username}/permission`, 'get', {}, {
      headers: {
        'Accept': previewAccept
      }
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // 为仓库添加成员
  addCollaborator (addOptions: any) {
    getToken(() => {
      request(`/repos/${addOptions.ownername}/${addOptions.reposname}/collaborators/${addOptions.username}`, 'put', addOptions.data, {
        headers: {
          'Accept': previewAccept,
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // 删除仓库成员
  deleteCollaborator (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/collaborators/${deleteOptions.username}`, 'delete', {}, {
        headers: {
          'Accept': previewAccept,
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res)
      })
    })
  },
  // 获取上年度的commit活动数据
  getLastyearCommits (getOptions: any) {
    request(`/repos/${getOptions.ownername}/${getOptions.reposname}/stats/commit_activity`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
      })
  },
  // list milestones for a repository
  listMilestones (listOptions: any) {
    request(`/repos/${listOptions.ownername}/${listOptions.reposname}/milestones`, 'get', {}, {
      headers: {
        'Accept': 'application/vnd.github.jean-grey-preview+json'
      }
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // create a milestone
  createMilestone (createOptions: any) {
    getToken(() => {
      request(`/repos/${createOptions.ownername}/${createOptions.reposname}/milestones`, 'post', createOptions.data, {
        headers: {
          'Accept': 'application/vnd.github.jean-grey-preview+json',
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // update a milestone
  editMilestone (editOptions: any) {
    getToken(() => {
      request(`/repos/${editOptions.ownername}/${editOptions.reposname}/milestone/${editOptions.number}`, 'patch', editOptions.data, {
        headers: {
          'Accept': 'application/vnd.github.jean-grey-preview+json',
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // delete a milestone
  deleteMilestone (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/milestones/${deleteOptions.number}`, 'delete', {}, {
        headers: {
          'Accept': 'application/vnd.github.jean-grey-preview+json',
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // list all labels for a repository
  listAllLabels (listOptions: any) {
    request(`/repos/${listOptions.ownername}/${listOptions.reposname}/labels`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      console.log(res.data)
    })
  },
  // create a label
  createLabel (createOptions: any) {
    getToken(() => {
      request(`/repos/${createOptions.ownername}/${createOptions.reposname}/labels`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        } 
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // update a label
  editLabel (editOptions: any) {
    getToken(() => {
      request(`/repos/${editOptions.ownername}/${editOptions.reposname}/labels/${editOptions.labelname}`, 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }   
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
  // delete a label
  deleteLabel (deleteOptions: any) {
    getToken(() => {
      request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/labels/${deleteOptions.labelname}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }  
      }).then((res: any) => {
        console.log(res.data)
      })
    })
  },
}
