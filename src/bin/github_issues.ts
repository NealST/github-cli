#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from './tools/output'
import issues from '../lib/action/issues'
import repos from '../lib/action/repos'
import spinner from '../lib/tools/spinner'
import askquestion from '../lib/tools/askQuestion';
import { selectRepos } from '../lib/tools/verification';
import shell from '../lib/tools/createshell'

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .parse(process.argv)

const commandTypeObject: {[key: string]: any} = {
  'ls': {
    message: 'get issues list data actions(获取列表数据操作)',
    childOptions: {
      '-u': 'list issues for myself',
      '-r': 'list issues for repository',
      '-a': 'list all asignees of repository issues',
      '-c': 'list all comments of a issue',
      '-cr': 'list comments of issues of a repository'
    }
  },
  'cr': {
    message: 'create actions(创建issues数据)',
    childOptions: {
      '-r': 'create an issue for a repository',
      '-a': 'create assignees for an issue',
      '-c': 'create a comment for an issue',
      '－l': 'create labels for an issue'
    }
  },
  'et': {
    message: 'edit issues actions(编辑issues数据)',
    childOptions: {
      '-s': 'edit an issue',
      '-c': 'edit an comment of an issue',
      '-r': 'replace labels for an issue'
    }
  },
  'rm': {
    message: 'delete issues actions(删除issues数据)',
    childOptions: {
      '-a': 'delete assignees for an issue',
      '-c': 'delete comments for issue',
      '-l': 'delete labels for an issue'
    }
  }
}

program.on('--help', function () {
  mainTitle('Commands:')
  command()
  Object.keys(commandTypeObject).forEach((commandItem) => {
    command(`$ github issues ${commandItem} --- ${commandTypeObject[commandItem].message}`)
    command('  supported child options as follows:')
    let childOptions = commandTypeObject[commandItem].childOptions
    Object.keys(childOptions).forEach((item) => {
      command(`    $ github issues ${commandItem} ${item} --- ${childOptions[item]}`)
    })
  })
  
  mainTitle('use alert tips:')
  describe('The repository of all these command actions using is in your own github username space, so if you want to act at other username space, what you need to do is adding a -n option')

  mainTitle('use examples:')
  example()
  describe('list all the issues of a repository')
  example('$ github issues ls -r')
  describe('list all the issues of a repository of a new github user')
  example('$ github issues ls -r -n username(username is optional)')
  example()
})

let thecmd = program.args[0] // 命令类型
let theparam = program.args[1] // 参数值
let params = program.args.slice(1) // 参数数组

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecmd)) {
  error('the command you input is invalid, you could get the surpported commands through $ github issues -h')
}

switch (thecmd) {
  case 'ls':
    
    break
  case 'create':
    askquestion([{
      type: 'input',
      name: 'ownername',
      message: 'please input the ownername of the repository:' 
    }], function (nameanswers: any) {
      repos.getReposForUser(nameanswers.ownername, function (resdata: any) {
        let targetUserRepos = resdata.map((item: any) => {
          return item.name
        })
        askquestion([{
          type: 'list',
          name: 'reposname',
          message: 'please select a repository of this owner',
          choices: targetUserRepos
        }, {
          type: 'input',
          name: 'issuetitle',
          message: 'please input a title of this issue:'
        }, {
          type: 'editor',
          name: 'issuecontent',
          message: 'please input the content of this issue:'
        }], function (issueanswers: any) {
          issues.create({
            ownername: nameanswers.ownername,
            reposname: issueanswers.reposname,
            data: {
              title: issueanswers.issuetitle,
              body: issueanswers.issuecontent
            }
          })
        })
      })
    })
    break
}
