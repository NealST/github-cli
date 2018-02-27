#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from '../lib/tools/output'
import { userStrategy } from '../lib/action/users';

program
  .version(require('../package.json').version)
  .parse(process.argv)

const commandTypeObject: {[key: string]: any} = {
  'ls': {
    message: 'get list data(获取列表数据操作)',
    childOptions: {
      '-m': 'list followers of a user',
      '-t': 'list the following of a user'
    }
  },
  'et': {
    message: 'edit user data(编辑用户数据)'
  },
  'fl': {
    message: 'add a following(follow某个用户)'
  },
  'rf': {
    message: 'unfollow users(unfollow某个用户)'
  }
}

program.on('--help', function () {
  mainTitle('Commands:')
  command()
  Object.keys(commandTypeObject).forEach((commandItem) => {
    command(`$ gh us ${commandItem} --- ${commandTypeObject[commandItem].message}`)
    let childOptions = commandTypeObject[commandItem].childOptions
    if (childOptions) {
      describe('the supported child options for this command as follows:')
      Object.keys(childOptions).forEach((item) => {
        command(`  ${item} --- ${childOptions[item]}`)
      })
    }
  })
    
  mainTitle('use alert tips:')
  describe('The repository of all these command actions using is in your own github username space, so if you want to act at other username space, what you need to do is adding a -n option')

  mainTitle('use examples:')
  example()
  describe('list followers of yourself')
  example('$ gh us ls -m')
  describe('list followers of another user')
  example('$ gh us ls -m -n(username is optional)')
  example()
})

let paramArray = process.argv.slice(2)
let thecmd = paramArray[0] // 命令类型
let theoption = paramArray[1] // 参数值

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecmd)) {
  error('the command you input is invalid, you could get the surpported commands through $ gh issues -h')
  process.exit()
}

let childOptions = commandTypeObject[thecmd].childOptions
if (childOptions) {
  if (!theoption) {
    error('you need add a child option to this command type')
    mainTitle('the supported child options as follows:')
    command()
    Object.keys(childOptions).forEach((item: any) => {
      command(`${item}  ---  ${childOptions[item]}`)
    })
    command()
    describe('list followers of yourself')
    example('$ gh us ls -m')
    describe('list followers of another user')
    example('$ gh us ls -m -n(username is optional)')
    process.exit()
  } else {
    userStrategy[thecmd][theoption]()
  }
} else {
  userStrategy[thecmd]()
}


