#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from './tools/output';
import { issueStrategies } from '../lib/action/issues'

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
      '-cr': 'list comments of in a repository'
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
    command(`$ gh iu ${commandItem} --- ${commandTypeObject[commandItem].message}`)
    describe('the supported child options for this command as follows:')
    let childOptions = commandTypeObject[commandItem].childOptions
    Object.keys(childOptions).forEach((item) => {
      command(`  ${item} --- ${childOptions[item]}`)
    })
  })
  
  mainTitle('use alert tips:')
  describe('The repository of all these command actions using is in your own github username space, so if you want to act at other username space, what you need to do is adding a -n option')

  mainTitle('use examples:')
  example()
  describe('list all the issues of a repository')
  example('$ gh iu ls -r')
  describe('list all the issues of a repository of a new github user')
  example('$ gh iu ls -r -n username(username is optional)')
  example()
})

let thecmd = program.args[0] // 命令类型
let theoption = program.args[1] // 参数值
let params = program.args.slice(1) // 参数数组

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecmd)) {
  error('the command you input is invalid, you could get the surpported commands through $ gh issues -h')
  process.exit()
}

if (!theoption) {
  let childOptions = commandTypeObject[thecmd].childOptions
  error('you need add a child option to this command type')
  mainTitle('the supported child options as follows:')
  command()
  Object.keys(childOptions).forEach((item: any) => {
    command(`${item}  ---  ${childOptions[item]}`)
  })
  command()
  describe('list all the issues of a repository')
  example('$ gh iu ls -r')
  process.exit()
}

// execute the function corresponding to the command and the childoption
issueStrategies[thecmd][theoption]()
