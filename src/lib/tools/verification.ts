import { request, thedomain } from './request';
import askquestion from './askQuestion';
import spinner from './spinner'
import { saveInfo, getInfo } from './saveInfo';
import repos from '../action/repos'

// 获取想要操作的Github用户名
const getTargetUserName = function (message: string, fn?: Function, isNeedAsk: boolean = true) {
  function verifyName (username: string) {
    spinner.start('verifing the username you input')
    request(`/users/${username}`, 'get', {}).then((res: any) => {
      spinner.succeed('username verify success')
      process.env.githubTargetUserName = username
      // add those used names to an array to record some names used frequently
      getInfo().then((res: any) => {
        let githubTargetUserNames = res.githubTargetUserNames || []
        if (githubTargetUserNames.indexOf(username) < 0) {
          saveInfo({githubTargetUserNames: githubTargetUserNames.push(username)})
        }
      })
      fn && fn(username)
    }).catch((err: any) => {
      getTargetUserName('the username you input is invalid,please input again:', fn)
    })
  }
  // if user do not input a username
  if (isNeedAsk) {
    askquestion([{
      type: 'input',
      name: 'username',
      message: message
    }], function (answers: any) {
      let theInputName = answers.username
      verifyName(theInputName)
    })
  } else {
    // if user has inputed a username
    verifyName(process.env.githubTargetUserName)
  }
}

// 获取当前主用户的Github用户名
const getSelfUserName = function (fn?: Function, isNeedGet: boolean = true) {
  function validateProcess (data: any) {
    if (!data.githubUserName) {
      getTargetUserName('请输入您的Github用户名', function (validName: string) {
        process.env.githubUserName = validName
        saveInfo({githubUserName: validName})
        fn && fn(validName)
      })
    } else {
      process.env.githubUserName = data.githubUserName
      fn && fn(data.githubUserName)
    }
  }
  if (isNeedGet) {
    getInfo().then((res: any) => {
      validateProcess(res)
    })
  } else {
    validateProcess(process.env)
  }
}

// choose githubTargetUserName or githubUserName
export const getUserName = function (fn: Function, isNeedTarget: boolean = false) {
  if (isNeedTarget) {
    getInfo().then((res: any) => {
      let githubTargetUserNames = res.githubTargetUserNames
      if (githubTargetUserNames && githubTargetUserNames.length > 0) {
        askquestion([{
          type: 'list',
          name: 'targetname',
          message: 'you may want to select one from these usernames:',
          choices: githubTargetUserNames.push('no one matched')
        }], function (answers: any) {
          if (answers.targetname === 'no one matched') {
            getTargetUserName('please input the target gihub username:', fn)
          } else {
            fn(answers.targetname)
          }
        })
      } else {
        getTargetUserName('please input the target gihub username:', fn)
      }
    })
  } else {
    if (!process.env.githubUserName) {
      getInfo().then((res: any) => {
        if (!res.githubUserName) {
          getSelfUserName(fn, false)
        } else {
          process.env.githubUserName = res.githubUserName
          fn(res.githubUserName)
        }
      })
    } else {
      fn(process.env.githubUserName)
    }
  }
}

// check whether the repository name that user input is invalid
export const validateRepos = function (username: string, reposname: string, fn: Function) {
  function askRepos (message: string) {
    askquestion([{
      type: 'input',
      name: 'reposname',
      message: message
    }], function (answers: any) {
      verifyRepo(answers.reposname)
    })
  }
  function verifyRepo (reposname: string) {
    spinner.start('verifying the repos name you input')
    request(`/repos/${username}/${reposname}`, 'get', {}).then((res: any) => {
      spinner.succeed('repository verify success')
      fn(reposname)
    }).catch((err: any) => {
      // 如果仓库校验失败，则提示用户重新操作
      spinner.fail('repository verify error')
      askRepos('the repo name you input is invalid, please input again:')
      console.log(err)
    })
  }
}

// get repositories of a github user to help user select
export const selectRepos = function (fn: Function, isNeedTarget: boolean = false, type: string = 'checkbox') {
  function selectReposList (reposdataList: any, targetName?: string) {
    let thereposNameList = reposdataList.map((item: any) => {
      return item.name
    })
    askquestion([{
      type: type,
      name: 'reposlist',
      message: 'please select the repository:',
      choices: thereposNameList
    }], function (answers: any) {
      fn(answers.reposlist, targetName)
    })
  }
  if (isNeedTarget) {
    getUserName(function (targetName: string) {
      repos.getReposForUser(targetName, function (reposdataList: any) {
        selectReposList(reposdataList, targetName)
      })
    }, true)
  } else {
    repos.getAll(function (reposdataList: any) {
      selectReposList(reposdataList)
    })
  }
}

// 获取个人的access-token
export const getToken = function (fn: Function) {
  if (process.env.githubToken) {
    fn()
  } else {
    getInfo().then((res: any) => {
      if (!res.githubToken) {
        askquestion([{
          type: 'input',
          name: 'accesstoken',
          message: 'please input your github access token:'
        }], function (answers: any) {
          let thetoken = answers.accesstoken
          process.env.githubToken = thetoken
          saveInfo({githubToken: thetoken})
          fn()
        })
      } else {
        process.env.githubToken = res.githubToken
        fn()
      }
    })
  }
}
