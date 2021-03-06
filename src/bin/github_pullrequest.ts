#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from '../lib/tools/output'
import { prStrategies } from '../lib/action/pullrequest'

const commandTypeObject: {[key: string]: any} = {
  'ls': {
    message: 'get list data about pull request(获取pull request列表数据操作)',
    childOptions: {
      '-r': 'list pull requests for a repository',
      '-v': 'list all the reviews of a pull request',
      '-c': 'list comments on a pull request',
      '-cw': 'list comments of a review of a pull request',
      '-cr': 'list comments in a repository pulls',
      '-rp': 'list review requests of a pull request'
    }
  },
  'cr': {
    message: 'create actions about pull request(创建关于pull request数据的操作)',
    childOptions: {
      '-p': 'create a pull request',
      '-pr': 'create a pull request review',
      '-rp': 'create a review request for a pull request'
    }
  },
  'et': {
    message: 'edit pull request actions(编辑pull request数据)',
    childOptions: {
      '-p': 'edit a pull request',
      '-c': 'edit a comment for repository pulls'
    }
  },
  'rm': {
    message: 'delete pull request actions(删除pull request数据)',
    childOptions: {
      '-v': 'delete reviews of a pull request',
      '-c': 'delete a comment of repository pulls',
      '-r': 'delete review request of a pull request'
    }
  },
  'mr': {
    message: 'merge pull request actions(合并pull request请求)'
  },
  'st': {
    message: 'submit pull request review'
  },
  'ds': {
    message: 'dismiss a pull request review'
  }
}

program
  .version(require('../package.json').version)
  .option('-h', 'get help')
  .parse(process.argv)

program.on('--help', function () {
  mainTitle('Commands:')
  command()
  Object.keys(commandTypeObject).forEach((item: any) => {
    command(`$ gh pr ${item} --- ${commandTypeObject[item].message}`)
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
  describe('list pull requests for a repository')
  example('gh pr ls -r')
  example()
})

let paramArray = process.argv.slice(2)
let thecmd = paramArray[0] // 命令类型
let theoption = paramArray[1] // 参数值

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecmd)) {
  error('the command you input is invalid, you could get the surpported commands through $ gh pr -h')
}

let commandObject = commandTypeObject[thecmd]
let childOptions = commandObject.childOptions
if (childOptions) {
  if (!theoption || !childOptions.hasOwnProperty(theoption)) {
    error('empty or invalid child option!')
    mainTitle('the supported child options as follows:')
    command()
    Object.keys(childOptions).forEach((item: any) => {
      command(`${item}  ---  ${childOptions[item]}`)
    })
    command()
    describe('list all the pull request of a repository')
    example('$ gh pr ls -r')
    process.exit()
  } else {
    prStrategies[thecmd][theoption]()
  }
} else {
  prStrategies[thecmd]()
}