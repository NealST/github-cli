#! /usr/bin/env node

import * as program from 'commander'

import { mainTitle, command, example, describe, error } from './tools/output'
import pr from '../lib/action/pullrequest'
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

switch (thecmd) {
  case 'listall' :
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
        }], function (answers: any) {
          pr.listAll({
            ownername: nameanswers.ownername,
            reposname: answers.reposname
          })
        })
      })
    })
    break
  case 'create' :
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
          name: 'prtitle',
          message: 'please input a title of this pullrequest:'
        }, {
          type: 'input',
          name: 'prhead',
          message: 'please input the name of your branch you want to pull'
        }, {
          type: 'editor',
          name: 'prcontent',
          message: 'please input the content of this issue:'
        }], function (pranswers: any) {
          repos.getBranches({ownername: nameanswers.ownername, reposname: pranswers.reposname}, function (resdata: any) {
            let targetBranches = resdata.map((item: any) => {
              return item.name
            })
            askquestion([{
              type: 'list',
              name: 'branchname',
              message: 'please select a branch you want your changes pulled into:',
              choices: targetBranches
            }], (branchanswer: any) => {
              pr.create({
                ownername: nameanswers.ownername,
                reposname: pranswers.reposname,
                data: {
                  title: pranswers.prtitle,
                  head: pranswers.prhead,
                  base: branchanswer.branchname,
                  body: pranswers.prcontent
                }
              })
            })
          })
        })
      })
    })
    break
}