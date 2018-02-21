// 提问交互模块

import * as inquire from 'inquirer'
import {limit} from 'stringz'
import { center } from 'wide-align'
import {yellow} from 'chalk'

const width_rule: any = {
  title: 20,
  description: 40,
  url: 60
}

interface questionObject {
  type: string;
  name: string;
  message: any;
  default?: any;
  choices?: any;
  validate?: any;
  filter?: any;
  when?: any;
  pageSize?: number;
  prefix?: string;
  suffix?: string; 
}

export const createChoiceTable = function (heads: any, datalist: any) {
  let tableWidth: number = 0
  heads.forEach((item: any) => {
    tableWidth += width_rule[item.type]
  })
  const header = `│${heads.map((item: any) => {
    return center(yellow(item.value), width_rule[item.type])
  }).join('│')}│`
  let choices: Array<any> = [
    new inquire.Separator(`${limit('', tableWidth, '─')}`),
    new inquire.Separator(header),
    new inquire.Separator(`${limit('', tableWidth, '─')}`)
  ]
  datalist.forEach((item: any) => {
    choices.push(`│${item.map((item: any, index: number) => {
      return center(item, width_rule[heads[index].type])
    }).join('│')}│`)
    choices.push(new inquire.Separator(`${limit('', tableWidth, '─')}`))
  })
  return choices
}

export default function askquestion (question: Array<questionObject>, resolve: any) {
  return inquire.prompt(question).then((answers: any) => {
    resolve(answers)
  }).catch((err: any) => {
    console.log(err)
    process.exit()
  })
}
