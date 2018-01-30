#! /usr/bin/env node

import * as program from 'commander'
import {spawn} from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import { mainTitle, command, example, describe, error } from './tools/output';

// 支持的命令类型
const commandTypeObject: { [key: string]: string } = {
  'issues': 'issues action(issues操作)',
  'pr': 'pull request action(pull request操作)',
  'react': 'emojis action(表情回应)',
  'repos': 'repository action(仓库操作)',
  'search': 'search action(搜索操作)',
  'users': 'personal user action(个人用户操作)'
}

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .parse(process.argv)

program.on('--help', function() {
  mainTitle('Commands:')
  command()
  Object.keys(commandTypeObject).forEach((item) => {
    command(`$ github ${item} --- ${commandTypeObject[item]}`)
  })
  command()

  mainTitle('Examples:')
  example()
  Object.keys(commandTypeObject).forEach((item) => {
    describe(`# look help for ${item} action`)
    example(`$ github ${item} -h`)
  })
})

let args = process.argv.slice(3)
let thecommand = program.args[0]

if (!thecommand || thecommand === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecommand)) {
  error('the command you input is invalid,you could look for surpported commands through $ github -h')
}

let bin = `github_${thecommand}`
let binFilePath = path.join(__dirname, bin)
let exists = fs.existsSync

if (exists(binFilePath)) {
  bin = binFilePath
} else {
  bin = process.env.PATH.split(':').reduce(function (binary, p) {
    p = path.resolve(p, bin)
    return exists(p) && fs.statSync(p).isFile() ? p : binary
  }, bin)
}
console.log(bin)
let task = spawn(bin, args, {
  stdio: 'inherit'
})

task.on('close', function (code) {
  process.exit(code)
})

task.on('error', function (err) {
  console.log(err)
})
