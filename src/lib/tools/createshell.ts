import { exec } from 'child_process'

export default function shell (commandstring: string, fn?: Function) {
  exec(commandstring, function (err, stdout, stderr) {
    if (err) {
      console.log(err)
      process.exit()
    }
    if (stdout) {
      console.log(stdout.toString())
      fn&&fn(stdout.toString())
      return
    }
    if (stderr) {
      process.exit()
    }
  })
}