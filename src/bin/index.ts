#! /usr/bin/env node

import * as program from 'commander'
import {spawn} from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import { mainTitle, command, example, describe, error } from './tools/output';
import textFonts from '../lib/tools/cfonts';
import * as updateNotifier from 'update-notifier'

const pkg = require('../package.json')
updateNotifier({pkg}).notify()

// 支持的命令类型
const commandTypeObject: { [key: string]: any } = {
  'issues': {
    message: 'issues action(issues操作)',
    fontstext: 'issues'
  },
  'pr': {
    message: 'pull request action(pull request操作)',
    fontstext: 'pull requests'
  },
  'react': {
    message: 'emojis action(表情回应)',
    fontstext: 'reactions'
  },
  'repos': {
    message: 'repository action(仓库操作)',
    fontstext: 'repositories'
  },
  'search': {
    message: 'search action(搜索操作)',
    fontstext: 'search'
  },
  'users': {
    message: 'personal user action(个人用户操作)',
    fontstext: 'users'
  }
}

program
  .version(pkg.version)
  .usage('<command> [options]')
  .parse(process.argv)

program.on('--help', function() {
  mainTitle('Commands:')
  command()
  Object.keys(commandTypeObject).forEach((item) => {
    command(`$ github ${item} --- ${commandTypeObject[item].message}`)
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

// 子命令标题
textFonts(commandTypeObject[thecommand].fontstext)

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