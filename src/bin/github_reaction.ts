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

const commandTypes = [
  'create',
  'listall'
]
program.on('--help', function () {
  mainTitle('Commands:')
  command()
  commandTypes.forEach((item) => {
    command(item)
  })

  mainTitle('use examples:')
  example()
  describe('list all the issues')
  example('github issues listall')
  example()
})

let thecmd = program.args[0] // 命令类型
let theparam = program.args[1] // 参数值
let params = program.args.slice(1) // 参数数组

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (commandTypes.indexOf(thecmd) < 0) {
  error('the command you input is invalid, you could get the surpported commands through $ github issues -h')
}