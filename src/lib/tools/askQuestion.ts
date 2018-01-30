// 提问交互模块

import * as inquire from 'inquirer'

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

export default function askquestion (question: Array<questionObject>, resolve: any) {
  return inquire.prompt(question).then((answers: any) => {
    resolve(answers)
  })
}
