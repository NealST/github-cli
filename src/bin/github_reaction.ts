#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from './tools/output'
import { reactionStrategy } from '../lib/action/reaction'

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .parse(process.argv)

const commandTypeObject: {[key: string]: any} = {
  'ls': {
    message: 'get list data action(获取列表数据)',
    childOptions: {
      '-c': 'list reactions for a commit comment',
      '-i': 'list reactions for an issue',
      '-ic': 'list reactions for an issue comment',
      '-p': 'list reactions for a pull request review comment'
    }
  },
  'cr': {
    message: 'create reaction action(创建数据)',
    childOptions: {
      '-c': 'create reaction for a commit comment',
      '-i': 'create reaction for an issue',
      '-ic': 'create reaction for an issue comment',
      '-p': 'create reaction for a pull request review comment'
    }
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
  describe('list reactions for a commit comment:')
  example('$ gh rt ls -c')
  describe('list the repositories of another user:')
  example('$ gh rt ls -c -n')
  example()
})

let thecmd = program.args[0] // 命令类型
let theoption = program.args[1] // 参数值
let params = program.args.slice(1) // 参数数组

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecmd)) {
  error('the command you input is invalid, you could get the surpported commands through $ gh rt -h')
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
  describe('list all the reactions of an issue')
  example('$ gh rt ls -i')
  describe('list all the reactions of an issue of a repository of other user')
  example('$ gh rt ls -i -n')
  process.exit()
}
reactionStrategy[thecmd][theoption]()