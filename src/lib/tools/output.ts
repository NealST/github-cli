import * as chalk from 'chalk'

export const mainTitle = function (message: string) {
  console.log(chalk.magentaBright('   ' + message))
}

export const subTitle = function (message: string) {
  console.log('\n' + chalk.yellow('      ' + message))
}

export const describe = function (message?: string) {
  console.log(message ? chalk.blue('      ' + message) : '')
}

export const command = function (message?: string) {
  console.log(message ? chalk.cyan('      ' + message) : '')
}

export const example = function (message?: string) {
  console.log(message ? chalk.yellow('      ' + message) : '')
}

export const success = function (message: string) {
  console.log(chalk.green(message))
}

export const error = function (message: string) {
  console.log(chalk.red(message))
}

export const info = function (message: string) {
  console.log(chalk.cyan(message))
}