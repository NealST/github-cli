import {request, previewAccept} from '../tools/request'
import { getToken, getUserName, selectRepos } from '../tools/verification';
import askquestion from '../tools/askQuestion';
import createTabale from '../tools/tableShow';
import getHyperlinkText from '../tools/hyperlinker';
import promiseCompose from '../tools/promiseCompose';
const acceptType = 'application/vnd.github.jean-grey-preview+json'

export const reposActions = {
  create (reposNameList: Array<string>) {
    return promiseCompose([getToken, () => {
      return Promise.all(reposNameList.map((item) => {
        return request(`/user/repos`, 'post', {name: item}, {
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
  delete (reposNameList: Array<string>) {
    return promiseCompose([getToken, () => {
      return Promise.all(reposNameList.map((item) => {
        return request(`/repos/${process.env.githubUserName}/${item}`, 'delete', {}, {
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
  getAll () {
    return promiseCompose([getToken, () => {
      return request(`/user/repos`, 'get', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  getReposForUser (ownername: string) {
    return request(`/users/${ownername}/repos`, 'get', {}).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  getBranches (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/branches`, 'get', {}).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  getTopics (reposnamelist: Array<string>) {
    return Promise.all(reposnamelist.map((item) => {
      return request(`/repos/${process.env.githubUserName}/${item}/topics`, 'get', {}, {
        headers: {
          'Accept': previewAccept
        }
      })
    })).then((res: any) => {
      console.log(res)
      return res
    })
  },
  replaceTopics (reposname: string, topics: Array<string>) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${process.env.githubUserName}/${reposname}/topics`, 'put', {},  {
        headers: {
          'Accept': previewAccept,
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  getContributors (reposnamelist: Array<string>) {
    return Promise.all(reposnamelist.map((item) => {
      return request(`/repos/${process.env.githubUserName}/${item}/contributors`, 'get', {})
    })).then((res: any) => {
      console.log(res)
      return res
    })
  },
  transfer (reposnamelist: Array<string>, newowner: string) {
    return promiseCompose([getToken, () => {
      return Promise.all(reposnamelist.map((item) => {
        return request(`/repos/${process.env.githubUserName}/${item}/transfer`, 'post', {
          new_owner: newowner
        }, {
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
  getStarredRepos (getStarOptions?: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/starred`, 'get', getStarOptions || {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  getStarredReposForUser (getStarOptions: any) {
    return request(`/users/${getStarOptions.username}/starred`, 'get', getStarOptions.data || {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  getWatchedRepos (getWatchOptions?: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/subscriptions`, 'get', getWatchOptions || {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  getWatchedReposForUser (getWatchOptions: any) {
    return request(`/users/${getWatchOptions.username}/subscriptions`, 'get', getWatchOptions.data || {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  setRepoSubscription (setOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${setOptions.ownername}/${setOptions.reposname}/subscription`, 'put', setOptions.data || {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  starRepo (starOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/starred/${starOptions.ownername}/${starOptions.reposname}`, 'put', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  unStarRepo (starOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/starred/${starOptions.ownername}/${starOptions.reposname}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  unWatchRepo (watchOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${watchOptions.ownername}/${watchOptions.reposname}/subscription`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // compare the content of two different branch
  compareCommits (compareOptions: any) {
    return request(`/repos/${compareOptions.ownername}/${compareOptions.reposname}/compare/${compareOptions.base}...${compareOptions.head}`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  // fork a repository
  fork (forkOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${forkOptions.ownername}/${forkOptions.reposname}/forks`, 'post', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // merge a branch
  merge (mergeOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${mergeOptions.ownername}/${mergeOptions.reposname}/merges`, 'post', mergeOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // get the readme of a repository
  getReadme (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/readme`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  // get commits of a repository
  getCommits (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/commits`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  // get collaborators of a repository
  getCollaborators (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/collaborators`, 'get', {}, {
      headers: {
        'Accept': previewAccept
      }
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // check whether a user is a collaborator
  checkCollaborator (checkOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/collaborators/${checkOptions.username}`, 'get', {}, {
        headers: {
          'Accept': previewAccept
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // check the permission level of a collaborator
  checkCollaboratorPermission (checkOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/collaborators/${checkOptions.username}/permission`, 'get', {}, {
        headers: {
          'Accept': previewAccept
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // add collaborators for a repository
  addCollaborator (addOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${addOptions.ownername}/${addOptions.reposname}/collaborators/${addOptions.username}`, 'put', addOptions.data, {
        headers: {
          'Accept': previewAccept,
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // delete collaborators for a repository
  deleteCollaborator (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/collaborators/${deleteOptions.username}`, 'delete', {}, {
        headers: {
          'Accept': previewAccept,
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // 获取上年度的commit活动数据
  getLastyearCommits (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/stats/commit_activity`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  // list milestones for a repository
  listMilestones (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/milestones`, 'get', {}, {
      headers: {
        'Accept': 'application/vnd.github.jean-grey-preview+json'
      }
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // create a milestone
  createMilestone (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/milestones`, 'post', createOptions.data, {
        headers: {
          'Accept': 'application/vnd.github.jean-grey-preview+json',
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // update a milestone
  editMilestone (editOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${editOptions.ownername}/${editOptions.reposname}/milestone/${editOptions.number}`, 'patch', editOptions.data, {
        headers: {
          'Accept': 'application/vnd.github.jean-grey-preview+json',
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // delete a milestone
  deleteMilestone (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/milestones/${deleteOptions.number}`, 'delete', {}, {
        headers: {
          'Accept': 'application/vnd.github.jean-grey-preview+json',
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // list all labels for a repository
  listAllLabels (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/labels`, 'get', {}, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  // create a label
  createLabel (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${createOptions.ownername}/${createOptions.reposname}/labels`, 'post', createOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        } 
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // update a label
  editLabel (editOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${editOptions.ownername}/${editOptions.reposname}/labels/${editOptions.labelname}`, 'patch', editOptions.data, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }   
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  },
  // delete a label
  deleteLabel (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/labels/${deleteOptions.labelname}`, 'delete', {}, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`,
          'Accept': acceptType
        }
      }).then((res: any) => {
        console.log(res.data)
        return res.data
      })
    }])
  }
}

export const reposStrategies = {
  'ls': {
    '-r': function () {
      if (process.env.githubUserMode === 'target') {
        reposActions.getAll()
      }
    }
    'list repositories of myself',
    '-b': 'list all branches of a repository',
    '-t': 'list all topics of a repositories',
    '-c': 'list all contributors of a repository',
    '-s': 'list all starred repositories by myself',
    '-w': 'list all watching repositories',
    '-i': 'list commits of a repository',
    '-o': 'list all collaborators of a repository',
    '-y': 'list commit activity of last year',
    '-m': 'list milestones of a repository',
    '-l': 'list all the labels of a repository'
  },
  'cr': {
    '-r': 'create reposotories',
    '-a': 'add collaborator for a repository',
    '-m': 'create a milestone for a repository',
    '-l': 'create labels for a repository'
  },
  'et': {
    '-t': 'replace topics for a repository',
    '-m': 'edit a milestone for a repository',
    '-l': 'edit a label for a repository'
  },
  'rm': {
    '-r': 'delete repositories',
    '-m': 'delete milestones of a repository',
    '-c': 'delete collaborators of a repository',
    '-l': 'delete labels of a repository'
  },
  'st': {
    '-s': 'set subscription for repositories',
    '-r': 'star repositories',
    '-rn': 'unstar repositories',
    '-sn': 'unwatch repositories'
  },
  'ck': {
    '-c': 'check whether a user is a collaborator of a repository',
    '-p': 'check the permission level of a collaborator'
  },
  'ts': {
    message: 'transfer repositories to another user'
  },
  'cm': {
    message: 'compare the content of two different branch'
  },
  'fk': {
    message: 'fork a repository'
  },
  'mg': {
    message: 'merge branch of a repository'
  }
}