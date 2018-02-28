#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from '../lib/tools/output'
import { reposStrategies } from '../lib/action/repos';

program
  .version(require('../package.json').version)
  .parse(process.argv)

const commandTypeObject: {[key: string]: any} = {
  'ls': {
    message: 'get repository list data actions(获取列表数据操作)',
    childOptions: {
      '-r': 'list repositories',
      '-b': 'list all branches of a repository',
      '-t': 'list all topics of a repositories',
      '-c': 'list all contributors of a repository',
      '-s': 'list all starred repositories by myself',
      '-w': 'list all watching repositories',
      '-i': 'list commits of a repository',
      '-o': 'list all collaborators of a repository',
      '-m': 'list milestones of a repository',
      '-l': 'list all the labels of a repository',
      '-cm': 'list commit comments of a repository'
    }
  },
  'cr': {
    message: 'create actions(创建repository数据)',
    childOptions: {
      '-r': 'create new repositories',
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
  'fk': {
    message: 'fork a repository'
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

let paramArray = process.argv.slice(2)
let thecmd = paramArray[0] // 命令类型
let theoption = paramArray[1] // 参数值

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecmd)) {
  error('the command you input is invalid, you could get the supported command through $ gh rs -h')
}

let commandObject = commandTypeObject[thecmd]
if (commandObject.childOptions) {
  if (!theoption) {
    let childOptions = commandObject.childOptions
    error('you need add a child option to this command type')
    mainTitle('the supported child options as follows:')
    command()
    Object.keys(childOptions).forEach((item: any) => {
      command(`${item}  ---  ${childOptions[item]}`)
    })
    command()
    describe('list the repositories of yourself:')
    example('$ gh rs ls -r')
    describe('list the repositories of another user:')
    example('$ gh rs ls -r -n')
    example()
    process.exit()
  } else {
    reposStrategies[thecmd][theoption]()
  }
} else {
  reposStrategies[thecmd]()
}
