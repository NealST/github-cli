#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from '../lib/tools/output'
import { searchStrategy } from '../lib/action/search'

program
  .version(require('../package.json').version)
  .option('-h', 'get help')
  .parse(process.argv)

const commandTypeObject: {[key: string]: string} = {
  'r': 'search repositories',
  'c': 'search commits',
  'i': 'search issues',
  'u': 'search users'
}

program.on('--help', function () {
  mainTitle('Commands:')
  command()
  Object.keys(commandTypeObject).forEach((item: any) => {
    command(`$ gh sr ${item} --- ${commandTypeObject[item]}`)
  })
  mainTitle('use examples:')
  example()
  describe('search repositories:')
  example('$ gh sr -r')
  example()
})

let paramArray = process.argv.slice(2)
let thecmd = paramArray[0] // 命令类型

if (!thecmd || thecmd === '-h') {
  program.help()
}

if (!commandTypeObject.hasOwnProperty(thecmd)) {
  error('the option you input is invalid, you could get the surpported options through $ gh sr -h')
  process.exit()
}

searchStrategy[thecmd]()