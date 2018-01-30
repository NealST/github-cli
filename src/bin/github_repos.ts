#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from './tools/output'
import repos from '../lib/action/repos'
import spinner from '../lib/tools/spinner'
import askquestion from '../lib/tools/askQuestion';
import { selectRepos } from '../lib/tools/verification';
import shell from '../lib/tools/createshell'

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .parse(process.argv)

const commandTypes = [
  'create',
  'delete',
  'edit',
  'getall',
  'gettopics'
]
program.on('--help', function () {
  mainTitle('Commands:')
  command()
  commandTypes.forEach((item) => {
    command(item)
  })

  mainTitle('使用示例:')
  example()
  describe('创建一个名为nealst.github.io的仓库')
  example('github repos create nealst.github.io')
  example()
})

let thecmd = program.args[0] // 命令类型
let theparam = program.args[1] // 参数值
let params = program.args.slice(1) // 参数数组

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (commandTypes.indexOf(thecmd) < 0) {
  error('您输入的命令类型有误，详情请输入$ github repos -h获取支持的命令类型')
}

function cloneRepos (reposUrl: string) {
  askquestion([{
    type: 'input',
    name: 'isNeedClone',
    message: 'Do you need clone this repository?(y/n):'
  }], function (answers: any) {
    if (answers.isNeedClone === 'y') {
      shell(`git clone ${reposUrl}`)
    } else if (answers.isNeedClone === 'n') {
      process.exit()
    } else {
      error('the selection you input is invalid')
      process.exit()
    }
  })
}

switch (thecmd) {
  case 'create' :
    if (!theparam) {
      // 如果没有传入仓库名，则提示用户输入
      askquestion([{
        type: 'input',
        name: 'reposname',
        message: 'please input a repository name:'
      }], function (answers: any) {
        repos.create([answers.reposname], function (reposdata: any) {
          cloneRepos(reposdata.clone_url)
        })
      })
    } else {
      repos.create(params, function (reposdata: any) {
        cloneRepos(reposdata.clone_url)
      })
    }
    break
  case 'delete' :
    if (!theparam) {
      selectRepos(function (reposlist: Array<string>) {
        repos.delete(reposlist)
      })
    } else {
      repos.delete(params)
    }
    break
  case 'getall' :
    repos.getAll()
    break
  case 'gettopics' :
    if (!theparam) {
      selectRepos(function (reposlist: Array<string>) {
        repos.getTopics(reposlist)
      })
    } else {
      repos.getTopics(params)
    }
    break
  case 'transfer' :
    selectRepos(function (reposlist: Array<string>) {
      askquestion([{
        type: 'input',
        name: 'targetname',
        message: 'please input the username you want transfer to:'
      }], function (answers: any) {
        repos.transfer(reposlist, answers.targetname)
      })
    })
    break
}
