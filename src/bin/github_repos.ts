#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from './tools/output'

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .parse(process.argv)

const commandTypeObject: {[key: string]: any} = {
  'ls': {
    message: 'get repository list data actions(获取列表数据操作)',
    childOptions: {
      '-r': 'list repositories of myself',
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
    }
  },
  'cr': {
    message: 'create actions(创建repository数据)',
    childOptions: {
      '-r': 'create reposotories',
      '-a': 'add collaborator for a repository',
      '-m': 'create a milestone for a repository',
      '-l': 'create labels for a repository'
    }
  },
  'et': {
    message: 'edit actions(编辑repository数据)',
    childOptions: {
      '-t': 'replace topics for a repository',
      '-m': 'edit a milestone for a repository',
      '-l': 'edit a label for a repository'
    }
  },
  'rm': {
    message: 'delete issues actions(删除repository数据)',
    childOptions: {
      '-r': 'delete repositories',
      '-m': 'delete milestones of a repository',
      '-c': 'delete collaborators of a repository',
      '-l': 'delete labels of a repository'
    }
  },
  'st': {
    message: 'set actions(设置repository数据)',
    childOptions: {
      '-s': 'set subscription for repositories',
      '-r': 'star repositories',
      '-rn': 'unstar repositories',
      '-sn': 'unwatch repositories'
    }
  },
  'ck': {
    message: 'check actions(查看数据)',
    childOptions: {
      '-c': 'check whether a user is a collaborator of a repository',
      '-p': 'check the permission level of a collaborator'
    }
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
program.on('--help', function () {
  mainTitle('Commands:')
  command()
  Object.keys(commandTypeObject).forEach((item: any) => {
    command(`$ gh rs ${item} --- ${commandTypeObject[item].message}`)
    let childOptions = commandTypeObject[item].childOptions
    if (childOptions) {
      describe('the supported child options for this command as follows:')
      Object.keys(childOptions).forEach((optionItem: any) => {
        command(`  ${optionItem} --- ${childOptions[optionItem]}`)
      })
    }
  })
  mainTitle('use examples:')
  example()
  describe('list the repositories of yourself:')
  example('$ gh rs ls -r')
  describe('list the repositories of another user:')
  example('$ gh rs ls -r -n')
  example()
})

let thecmd = program.args[0] // 命令类型
let theparam = program.args[1] // 参数值
let params = program.args.slice(1) // 参数数组

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecmd)) {
  error('the command you input is invalid, you could get the supported command through $ gh rs -h')
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
