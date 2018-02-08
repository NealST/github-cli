import {request, previewAccept} from '../tools/request'
import { getToken, getUserName, selectRepos, selectReposWithMode } from '../tools/verification';
import askquestion from '../tools/askQuestion';
import createTable from '../tools/tableShow';
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
  listCommitComments (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/comments`, 'get', {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
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
  getTopics (getOptions: any) {
      return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/topics`, 'get', {}, {
        headers: {
          'Accept': previewAccept
        }
      }).then((res: any) => {
      console.log(res.data)
      return res.data
    })
  },
  replaceTopics (options: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${options.ownername}/${options.reposname}/topics`, 'put', options.data,  {
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
  getContributors (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/contributors`, 'get', {}).then((res: any) => {
      console.log(res)
      return res
    })
  },
  transfer (options: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(options.reposnamelist.map((item: any) => {
        return request(`/repos/${options.ownername}/${item}/transfer`, 'post', {
          new_owner: options.newowner
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
  getStarredReposForUser (getOptions: any) {
    return request(`/users/${getOptions.ownername}/starred`, 'get', getOptions.data || {})
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
    return request(`/users/${getWatchOptions.ownername}/subscriptions`, 'get', getWatchOptions.data || {})
      .then((res: any) => {
        console.log(res.data)
        return res.data
      })
  },
  setRepoSubscription (setOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(setOptions.reposnamelist.map((item: any) => {
        return request(`/repos/${setOptions.ownername}/${item}/subscription`, 'put', setOptions.data || {}, {
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
  starRepos (starOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(starOptions.reposnamelist.map((item: any) => {
        return request(`/user/starred/${starOptions.ownername}/${item}`, 'put', {}, {
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
  unStarRepos (starOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(starOptions.reposnamelist.map((item: any) => {
        return request(`/user/starred/${starOptions.ownername}/${item}`, 'delete', {}, {
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
  unWatchRepos (watchOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(watchOptions.reposnamelist.map((item: any) => {
        return request(`/repos/${watchOptions.ownername}/${item}/subscription`, 'delete', {}, {
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
      return Promise.all(forkOptions.reposnamelist.map((item: any) => {
        return request(`/repos/${forkOptions.ownername}/${item}/forks`, 'post', {}, {
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
  deleteCollaborators (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(deleteOptions.names.map((item: any) => {
        return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/collaborators/${item}`, 'delete', {}, {
          headers: {
            'Accept': previewAccept,
            'Authorization': `token ${process.env.githubToken}`
          }
        })
      })).then((res: any) => {
        console.log(res)
        return res
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
      return Promise.all(deleteOptions.numbers.map((item: any) => {
        return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/milestones/${item}`, 'delete', {}, {
          headers: {
            'Accept': 'application/vnd.github.jean-grey-preview+json',
            'Authorization': `token ${process.env.githubToken}`
          }
        })
      })).then((res: any) => {
        console.log(res)
        return res
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
  deleteLabels (deleteOptions: any) {
    return promiseCompose([getToken, () => {
      return Promise.all(deleteOptions.names.map((item: any) => {
        return request(`/repos/${deleteOptions.ownername}/${deleteOptions.reposname}/labels/${item}`, 'delete', {}, {
          headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': acceptType
          }
        })
      })).then((res: any) => {
        console.log(res)
        return res
      })
    }])
  }
}

export const reposStrategies: {[key: string]: any} = {
  'ls': {
    '-r': function () {
      if (process.env.githubUserMode === 'target') {
        getUserName((ownername: string) => {
          reposActions.getReposForUser(ownername)
        }, true)
      } else {
        reposActions.getAll()
      }
    },
    '-b': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getBranches({
          ownername: ownername,
          reposname: reposname
        })
      })
    },
    '-t': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getTopics({
          ownername: ownername,
          reposname: reposname
        })
      })
    },
    '-c': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getContributors({
          ownername: ownername,
          reposname: reposname
        })
      })
    },
    '-s': function () {
      if (process.env.githubUserMode === 'target') {
        getUserName((targetName: string) => {
          reposActions.getStarredReposForUser({
            ownername: targetName
          })
        }, true)
      } else {
        reposActions.getStarredRepos()
      }
    },
    '-w': function () {
      if (process.env.gitUserMode === 'target') {
        getUserName((targetName: string) => {
          reposActions.getWatchedReposForUser({
            ownername: targetName
          })
        })
      } else {
        reposActions.getWatchedRepos()
      }
    },
    '-i': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getCommits({
          ownername: ownername,
          reposname: reposname
        })
      })
    },
    '-o': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getCollaborators({
          ownername: ownername,
          reposname: reposname
        })
      })
    },
    '-y': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getLastyearCommits({
          ownername: ownername,
          reposname: reposname
        })
      })
    },
    '-m': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listMilestones({
          ownername: ownername,
          reposname: reposname
        })
      })
    },
    '-l': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listAllLabels({
          ownername: ownername,
          reposname: reposname
        })
      })
    },
    '-cm': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listCommitComments({
          ownername: ownername,
          reposname: reposname
        })
      })
    }
  },
  'cr': {
    '-r': function () {
      askquestion([{
        type: 'input',
        name: 'reposlist',
        message: 'please input names of repositories(split with space):'
      }], (answers: any) => {
        reposActions.create(answers.reposlist.split(' ')).then((res: any) => {
          console.log(res)
        })
      })
    },
    '-a': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        askquestion([{
          type: 'input',
          name: 'username',
          message: 'please input the username will be added as a collaborator:'
        }, {
          type: 'list',
          name: 'permission',
          message: 'please select a permission level for this collaborator:',
          choices: ['pull', 'push', 'admin']
        }], (answers: any) => {
          reposActions.addCollaborator({
            ownername: ownername,
            reposname: reposname,
            username: answers.username,
            data: {
              permission: answers.permission
            }
          })
        })
      })
    },
    '-m': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        askquestion([{
          type: 'input',
          name: 'title',
          message: 'please input the title of this milestone:',
        }, {
          type: 'list',
          name: 'state',
          message: 'please select a state for this milestone:',
          choices: ['open', 'closed']
        }, {
          type: 'editor',
          name: 'description',
          message: 'please input the description for this milestone:'
        }], (answers: any) => {
          reposActions.createMilestone({
            ownername: ownername,
            reposname: reposname,
            data: {
              title: answers.title,
              state: answers.state,
              description: answers.description
            }
          })
        })
      })
    },
    '-l': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        askquestion([{
          type: 'input',
          name: 'name',
          message: 'please input the name of this label:'
        }, {
          type: 'input',
          name: 'color',
          message: 'please input the color hex code(6 character, without #):'
        }], (answers: any) => {
          reposActions.createLabel({
            ownername: ownername,
            reposname: reposname,
            data: {
              name: answers.name,
              color: answers.color
            }
          })
        })
      })
    }
  },
  'et': {
    '-t': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        askquestion([{
          type: 'input',
          name: 'names',
          message: 'please input some names to replace existed topic names(split with space):'
        }], (answers: any) => {
          reposActions.replaceTopics({
            ownername: ownername,
            reposname: reposname,
            data: {
              names: answers.names.split(' ')
            }
          })
        })
      })
    },
    '-m': function () {
      let questionObject: {[key: string]: any} = {
        title: {
          type: 'input',
          name: 'title',
          message: 'please input the title of this milestone'
        },
        state: {
          type: 'list',
          name: 'state',
          message: 'please select a state for this milestone',
          choices: ['open', 'closed']
        },
        description: {
          type: 'editor',
          name: 'description',
          message: 'please input the description for this milestone'
        }
      }
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listMilestones({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['number', 'title', 'state', 'description', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.number, item.title, item.state, item.description, getHyperlinkText('点击查看详情', item.html_url)])
          })
          askquestion([{
            type: 'list',
            name: 'number',
            message: 'please select a milestone:',
            choices: dataTable
          }, {
            type: 'checkbox',
            name: 'changes',
            message: 'please select some items you want to change:',
            choices: ['title', 'state', 'description']
          }], (selectAnswers: any) => {
            let questionArray = selectAnswers.changes.map((item: any) => {
              return questionObject[item]
            })
            askquestion(questionArray, (answers: any) => {
              reposActions.editMilestone({
                ownername: ownername,
                reposname: reposname,
                number: selectAnswers.number[0],
                data: answers
              })
            })
          })
        })
      })
    },
    '-l': function () {
      let questionObject: {[key: string]: any} = {
        name: {
          type: 'input',
          name: 'name',
          message: 'please input the name for this label:'
        },
        color: {
          type: 'input',
          name: 'color',
          message: 'please input the color for this label:'
        }
      }
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listAllLabels({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'name', 'color']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.name, item.color])
          })
          askquestion([{
            type: 'list',
            name: 'labelname',
            message: 'please select a label to change:',
            choices: dataTable
          }, {
            type: 'checkbox',
            name: 'changes',
            message: 'please select change items you want to implement:',
            choices: ['name', 'color']
          }], (answers: any) => {
            let questionArray = answers.changes.map((item: any) => {
              return questionObject[item]
            })
            askquestion(questionArray, (theanswers: any) => {
              reposActions.editLabel({
                ownername: ownername,
                reposname: reposname,
                labelname: answers.labelname[1],
                data: theanswers
              })
            })
          })
        })
      })
    }
  },
  'rm': {
    '-r': function () {
      getUserName((ownername: string) => {
        reposActions.getAll().then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['name', 'description', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.name, item.description, getHyperlinkText('点击查看详情', item.html_url)])
          })
          askquestion([{
            type: 'checkbox',
            name: 'repos',
            message: 'please select some repositories to be removed:',
            choices: dataTable
          }], (answers: any) => {
            reposActions.delete(answers.repos.map((item: any) => {
              return item[0]
            }))
          })
        })
      })
    },
    '-m': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listMilestones({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['number', 'title', 'state', 'description', 'detailUrl']
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.number, item.title, item.state, item.description, getHyperlinkText('点击查看详情', item.html_url)])
          })
          askquestion([{
            type: 'checkbox',
            name: 'numbers',
            message: 'please select a milestone:',
            choices: dataTable
          }], (selectAnswers: any) => {
            reposActions.deleteMilestone({
              ownername: ownername,
              reposname: reposname,
              numbers: selectAnswers.numbers.map((item: any) => {
                return item[0]
              })
            })
          })
        })
      })
    },
    '-c': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getCollaborators({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          askquestion([{
            type: 'checkbox',
            name: 'names',
            message: 'please select some collaborators to be removed:',
            choices: resdata.map((item: any) => {
              return item.login
            })
          }], (answers: any) => {
            reposActions.deleteCollaborators({
              ownername: ownername,
              reposname: reposname,
              names: answers.names
            })
          })
        })
      })
    },
    '-l': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listAllLabels({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          askquestion([{
            type: 'checkbox',
            name: 'labels',
            message: 'please select some labels to be removed:',
            choices: resdata.map((item: any) => {
              return item.name
            })
          }], (answers: any) => {
            reposActions.deleteLabels({
              ownername: ownername,
              reposname: reposname,
              names: answers.labels
            })
          })
        })
      })
    }
  },
  'st': {
    '-s': function () {
      selectRepos((reposnamelist: Array<string>, ownername: string) => {
        reposActions.setRepoSubscription({
          reposnamelist: reposnamelist,
          ownername: ownername
        })
      }, true)
    },
    '-r': function () {
      selectRepos((reposnamelist: Array<string>, ownername: string) => {
        reposActions.starRepos({
          reposnamelist: reposnamelist,
          ownername: ownername
        })
      }, true)
    },
    '-rn': function () {
      selectRepos((reposnamelist: Array<string>, ownername: string) => {
        reposActions.unStarRepos({
          reposnamelist: reposnamelist,
          ownername: ownername
        })
      }, true)
    },
    '-sn': function () {
      selectRepos((reposnamelist: Array<string>, ownername: string) => {
        reposActions.unWatchRepos({
          reposnamelist: reposnamelist,
          ownername: ownername
        })
      }, true)
    }
  },
  'ck': {
    '-c': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        askquestion([{
          type: 'input',
          name: 'username',
          message: 'please input the username to be checked:'
        }], (answers: any) => {
          reposActions.checkCollaborator({
            ownername: ownername,
            reposname: reposname,
            username: answers.username
          })
        })
      })
    },
    '-p': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        askquestion([{
          type: 'input',
          name: 'username',
          message: 'please input the username to be checked:'
        }], (answers: any) => {
          reposActions.checkCollaboratorPermission({
            ownername: ownername,
            reposname: reposname,
            username: answers.username
          })
        })
      })
    }
  },
  'ts': function () {
    selectRepos((reposnamelist: Array<string>, ownername: string) => {
      askquestion([{
        type: 'input',
        name: 'newowner',
        message: 'please input the name of new owner:'
      }], (answers: any) => {
        reposActions.transfer({
          ownername: ownername,
          reposnamelist: reposnamelist,
          newowner: answers.newowner
        })
      })
    })
  },
  'cm': function () {
    selectReposWithMode((reposname: string, ownername: string) => {
      askquestion([{
        type: 'input',
        name: 'head',
        message: 'please input the head branch name:'
      }, {
        type: 'input',
        name: 'base',
        message: 'please input the base branch name:'
      }], (answers: any) => {
        reposActions.compareCommits({
          ownername: ownername,
          reposname: reposname,
          base: answers.base,
          head: answers.head
        })
      })
    })
  },
  'fk': function () {
    selectRepos((reposnamelist: Array<string>, ownername: string) => {
      reposActions.fork({
        ownername: ownername,
        reposnamelist: reposnamelist
      })
    }, true)
  }
}