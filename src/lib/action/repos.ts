import {request, previewAccept} from '../tools/request'
import { getToken, getUserName, selectRepos, selectReposWithMode } from '../tools/verification';
import askquestion, {createChoiceTable} from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import getHyperlinkText from '../tools/hyperlinker';
import promiseCompose from '../tools/promiseCompose';
import { info, success } from '../tools/output';
const acceptType = 'application/vnd.github.jean-grey-preview+json'

export const reposActions = {
  create (createOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/user/repos`, 'post', createOptions, {
        headers: {
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        return res.data
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
        return res.data
      })
    }])
  },
  listCommitComments (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/comments`, 'get', {})
      .then((res: any) => {
        return res.data
      })
  },
  getReposForUser (ownername: string) {
    return request(`/users/${ownername}/repos`, 'get', {}).then((res: any) => {
      return res.data
    })
  },
  getBranches (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/branches`, 'get', {}).then((res: any) => {
      return res.data
    })
  },
  getTopics (getOptions: any) {
      return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/topics`, 'get', {}, {
        headers: {
          'Accept': previewAccept
        }
      }).then((res: any) => {
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
        return res.data
      })
    }])
  },
  getContributors (getOptions: any) {
    return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/contributors`, 'get', {}).then((res: any) => {
      return res.data
    })
  },
  transfer (options: any) {
    console.log(options)
    return promiseCompose([getToken, () => {
      return Promise.all(options.reposnamelist.map((item: any) => {
        return request(`/repos/${options.ownername}/${item}/transfer`, 'post', {
          new_owner: options.newowner
        }, {
          headers: {
            'Authorization': `token ${process.env.githubToken}`,
            'Accept': 'application/vnd.github.nightshade-preview+json'
          }
        })
      })).then((res: any) => {
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
        return res.data
      })
    }])
  },
  getStarredReposForUser (getOptions: any) {
    return request(`/users/${getOptions.ownername}/starred`, 'get', getOptions.data || {})
      .then((res: any) => {
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
        return res.data
      })
    }])
  },
  getWatchedReposForUser (getWatchOptions: any) {
    return request(`/users/${getWatchOptions.ownername}/subscriptions`, 'get', getWatchOptions.data || {})
      .then((res: any) => {
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
        return res.data
      })
  },
  // get collaborators of a repository
  getCollaborators (getOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${getOptions.ownername}/${getOptions.reposname}/collaborators`, 'get', {}, {
        headers: {
          'Accept': previewAccept,
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        return res && res.data
      })
    }])
  },
  // check whether a user is a collaborator
  checkCollaborator (checkOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/collaborators/${checkOptions.username}`, 'get', {}, {
        headers: {
          'Accept': 'application/vnd.github.hellcat-preview+json',
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
        return res.data
      })
    }])
  },
  // check the permission level of a collaborator
  checkCollaboratorPermission (checkOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${checkOptions.ownername}/${checkOptions.reposname}/collaborators/${checkOptions.username}/permission`, 'get', {}, {
        headers: {
          'Accept': previewAccept,
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
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
  // list milestones for a repository
  listMilestones (listOptions: any) {
    return request(`/repos/${listOptions.ownername}/${listOptions.reposname}/milestones`, 'get', {}, {
      headers: {
        'Accept': 'application/vnd.github.jean-grey-preview+json'
      }
    }).then((res: any) => {
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
        return res.data
      })
    }])
  },
  // update a milestone
  editMilestone (editOptions: any) {
    return promiseCompose([getToken, () => {
      return request(`/repos/${editOptions.ownername}/${editOptions.reposname}/milestones/${editOptions.number}`, 'patch', editOptions.data, {
        headers: {
          'Accept': 'application/vnd.github.jean-grey-preview+json',
          'Authorization': `token ${process.env.githubToken}`
        }
      }).then((res: any) => {
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
        return res
      })
    }])
  }
}

export const reposStrategies: {[key: string]: any} = {
  'ls': {
    '-r': function () {
      function dataShow (showlist: any) {
        let dataTable: any = createTable({
          head: ['name', 'description', 'detailUrl(cmd+click)'],
          colWidths: [30, 50, 80],
          wordWrap: true
        })
        showlist.forEach((item: any) => {
          dataTable.push([item.name, item.description || 'no description', getHyperlinkText(item.html_url)])
        })
        console.log(dataTable.toString())
      }
      if (process.env.githubUserMode === 'target') {
        getUserName((ownername: string) => {
          reposActions.getReposForUser(ownername).then((resdata: any) => {
            dataShow(resdata)
          })
        }, true)
      } else {
        reposActions.getAll().then((resdata: any) => {
          dataShow(resdata)
        })
      }
    },
    '-b': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getBranches({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['name', 'latest commit sha'],
            colWidths: [20, 60]
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.name, item.commit.sha])
          })
          console.log(dataTable.toString())
        })
      })
    },
    '-t': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getTopics({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          if (resdata.names.length === 0) {
            info('the repository you select has no topics')
          }
        })
      })
    },
    '-c': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getContributors({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['name', 'detailUrl(cmd+click)'],
            colWidths: [20, 80]
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.login, getHyperlinkText(item.html_url)])
          })
          console.log(dataTable.toString())
        })
      })
    },
    '-s': function () {
      function dataShow (datalist: any) {
        let dataTable: any = createTable({
          head: ['name', 'ownername', 'description', 'detailUrl(cmd+click)'],
          colWidths: [24, 20, 40, 80],
          wordWrap: true
        })
        datalist.forEach((item: any) => {
          dataTable.push([item.name, item.owner.login, item.description || 'no description', getHyperlinkText(item.html_url)])
        })
        console.log(dataTable.toString())
      }
      if (process.env.githubUserMode === 'target') {
        getUserName((targetName: string) => {
          reposActions.getStarredReposForUser({
            ownername: targetName
          }).then((resdata: any) => {
            dataShow(resdata)
          })
        }, true)
      } else {
        reposActions.getStarredRepos().then((resdata: any) => {
          dataShow(resdata)
        })
      }
    },
    '-w': function () {
      function dataShow (datalist: any) {
        let dataTable: any = createTable({
          head: ['name', 'owner', 'description', 'detailUrl(cmd+click)'],
          colWidths: [24, 20, 40, 80],
          wordWrap: true
        })
        datalist.forEach((item: any) => {
          dataTable.push([item.name, item.owner.login, item.description || 'no description', getHyperlinkText(item.html_url)])
        })
        console.log(dataTable.toString())
      }
      if (process.env.githubUserMode === 'target') {
        getUserName((targetName: string) => {
          reposActions.getWatchedReposForUser({
            ownername: targetName
          }).then((resdata: any) => {
            dataShow(resdata)
          })
        }, true)
      } else {
        reposActions.getWatchedRepos().then((resdata: any) => {
          dataShow(resdata)
        })
      }
    },
    '-i': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getCommits({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['sha', 'author', 'commit message', 'commit date'],
            colWidths: [15, 20, 40, 40],
            wordWrap: true
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.sha, item.commit.author.name, item.commit.message, item.commit.author.date])
          })
          console.log(dataTable.toString())
        })
      })
    },
    '-o': function () {
      // 无法开启目标用户模式
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.getCollaborators({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['name', 'permissions'],
            colWidths: [20, 60]
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.login, Object.keys(item.permissions).filter((keyItem: any) => {
              return item.permissions[keyItem]
            }).join(' ')])
          })
          console.log(dataTable.toString())
        }).catch((err: any) => {
          console.log(err)
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
            head: ['title', 'state', 'description', 'detailUrl(cmd+click)'],
            colWidths: [20, 20, 40, 80],
            wordWrap: true
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.title, item.state, item.description, getHyperlinkText(item.html_url)])
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
          let dataTable: any = createTable({
            head: ['id', 'name', 'color'],
            colWidths: [20, 20, 20]
          })
          resdata.forEach((item: any) => {
            dataTable.push([item.id, item.name, item.color])
          })
          console.log(dataTable.toString())
        })
      })
    },
    '-cm': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        reposActions.listCommitComments({
          ownername: ownername,
          reposname: reposname
        }).then((resdata: any) => {
          let dataTable: any = createTable({
            head: ['id', 'content', 'author', 'detailUrl(cmd+click)'],
            colWidths: [10, 40, 20, 80],
            wordWrap: true
          })
          if (resdata.length > 0) {
            resdata.forEach((item: any) => {
              dataTable.push([item.id, item.body, item.user.login, getHyperlinkText(item.html_url)])
            })
            console.log(dataTable.toString())
          } else {
            info('this repository has no comments')
          }
        })
      })
    }
  },
  'cr': {
    '-r': function () {
      askquestion([{
        type: 'input',
        name: 'repos',
        message: 'please input the name of the repository to be created:'
      }, {
        type: 'editor',
        name: 'description',
        message: 'please input the description of the repository to be created:'
      }], (answers: any) => {
        reposActions.create({
          name: answers.repos,
          description: answers.description
        }).then((resdata: any) => {
          success('repositories created sucess!')
          let dataTable: any = createTable({
            head: ['name', 'description', 'detailUrl(cmd+click)'],
            colWidths: [20, 40, 80],
            wordWrap: true
          })
          dataTable.push([resdata.name, resdata.description, getHyperlinkText(resdata.html_url)])
          console.log(dataTable.toString())
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
          }).then((resdata: any) => {
            success('add collaborator success!')
            let dataTable: any = createTable({
              head: ['repos', 'inviter', 'invitee', 'reposUrl(cmd+click)'],
              colWidths: [20, 20, 20, 80]
            })
            let thereposInfo = resdata.repository
            dataTable.push([thereposInfo.name, resdata.inviter.login, resdata.invitee.login, getHyperlinkText(thereposInfo.html_url)])
            console.log(dataTable.toString())
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
          }).then((resdata: any) => {
            success('create milestone success!')
            let dataTable: any = createTable({
              head: ['title', 'state', 'description', 'detailUrl(cmd+click)'],
              colWidths: [20, 20, 40, 80],
              wordWrap: true
            })
            dataTable.push([resdata.title, resdata.state, resdata.description, getHyperlinkText(resdata.html_url)])
            console.log(dataTable.toString())
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
          }).then((resdata: any) => {
            success('add label success!')
          })
        })
      })
    }
  },
  'et': {
    '-t': function () {
      selectReposWithMode((reposname: string, ownername: string) => {
        console.log('askquestion')
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
          }).then((resdata: any) => {
            success('replece labels success!')
            let dataTable: any = createTable()
            dataTable.push({
              labels: resdata.names
            })
            console.log(dataTable.toString())
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
          let heads = [{
            value: 'number',
            type: 'title'
          }, {
            value: 'title',
            type: 'title'
          }, {
            value: 'state',
            type: 'title'
          }, {
            value: 'description',
            type: 'description'
          }]
          askquestion([{
            type: 'list',
            name: 'number',
            message: 'please select a milestone:',
            choices: createChoiceTable(heads, resdata.map((item: any) => {
              return [String(item.number), item.title, item.state, item.description]
            }))
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
                number: selectAnswers.number.split('│')[1].trim(),
                data: answers
              }).then((resdata: any) => {
                success('update milestone success!')
                let dataTable: any = createTable({
                  head: ['number', 'title', 'state', 'description', 'detailUrl(cmd+click)'],
                  colWidths: [10, 20, 20, 40, 80],
                  wordWrap: true
                })
                dataTable.push([resdata.number, resdata.title, resdata.state, resdata.description, resdata.html_url])
                console.log(dataTable.toString())
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
          let heads = [{
            value: 'id',
            type: 'title'
          }, {
            value: 'name',
            type: 'title'
          }, {
            value: 'color',
            type: 'title'
          }]
          askquestion([{
            type: 'list',
            name: 'labelname',
            message: 'please select a label to change:',
            choices: createChoiceTable(heads, resdata.map((item: any) => {
              return [String(item.id), item.name, item.color]
            }))
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
                labelname: answers.labelname.split('│')[2].trim(),
                data: theanswers
              }).then((resdata: any) => {
                success('update label success!')
                let dataTable: any = createTable({
                  head: ['id', 'name', 'color'],
                  colWidths: [20, 20, 20]
                })
                dataTable.push([resdata.id, resdata.name, resdata.color])
                console.log(dataTable.toString())
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
          let heads = [{
            value: 'name',
            type: 'title'
          }, {
            value: 'description',
            type: 'description'
          }, {
            value: '查看详情(cmd+click)',
            type: 'url'
          }]
          askquestion([{
            type: 'checkbox',
            name: 'repos',
            message: 'please select some repositories to be removed:',
            choices: createChoiceTable(heads, resdata.map((item: any) => {
              return [item.name, item.description || 'no description', item.html_url]
            }))
          }], (answers: any) => {
            reposActions.delete(answers.repos.map((item: any) => {
              return item.split('│')[1].trim()
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
          let heads: any = [{
            value: 'number',
            type: 'title'
          }, {
            value: 'title',
            type: 'title'
          }, {
            value: 'state',
            type: 'title'
          }, {
            value: 'description',
            type: 'description'
          }, {
            value: 'detailUrl(cmd+click)',
            type: 'url'
          }]
          askquestion([{
            type: 'checkbox',
            name: 'numbers',
            message: 'please select some milestones:',
            choices: createChoiceTable(heads, resdata.map((item: any) => {
              return [String(item.number), item.title, item.state, item.description, item.html_url]
            }))
          }], (selectAnswers: any) => {
            reposActions.deleteMilestone({
              ownername: ownername,
              reposname: reposname,
              numbers: selectAnswers.numbers.map((item: any) => {
                return item.split('│')[1].trim()
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
        }).then((res: any) => {
          success('add subscription success!')
        })
      }, true)
    },
    '-r': function () {
      selectRepos((reposnamelist: Array<string>, ownername: string) => {
        reposActions.starRepos({
          reposnamelist: reposnamelist,
          ownername: ownername
        }).then((res: any) => {
          success('star the repository success!')
        })
      }, true)
    },
    '-rn': function () {
      selectRepos((reposnamelist: Array<string>, ownername: string) => {
        reposActions.unStarRepos({
          reposnamelist: reposnamelist,
          ownername: ownername
        }).then((res: any) => {
          success('unstar the repository success!')
        })
      }, true)
    },
    '-sn': function () {
      selectRepos((reposnamelist: Array<string>, ownername: string) => {
        reposActions.unWatchRepos({
          reposnamelist: reposnamelist,
          ownername: ownername
        }).then((res: any) => {
          success('unwatch the repository success!')
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
          }).then((resdata: any) => {
            info(`${answers.username}has the permission ${resdata.permission}`)
          })
        })
      })
    }
  },
  'ts': function () {
    selectReposWithMode((reposnamelist: Array<string>, ownername: string) => {
      askquestion([{
        type: 'input',
        name: 'newowner',
        message: 'please input the name of new owner:'
      }], (answers: any) => {
        reposActions.transfer({
          ownername: ownername,
          reposnamelist: reposnamelist,
          newowner: answers.newowner
        }).then((res: any) => {
          success('transfer the repository success!')
        })
      })
    }, 'checkbox')
  },
  'fk': function () {
    selectRepos((reposnamelist: Array<string>, ownername: string) => {
      reposActions.fork({
        ownername: ownername,
        reposnamelist: reposnamelist
      }).then((res: any) => {
        success('fork the repository success!')
      })
    }, true)
  }
}
