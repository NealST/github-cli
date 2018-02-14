import { homedir } from 'os'
import { writeFile, readFile, existsSync } from 'fs'

const theHomeDir = homedir() // home目录路径
const configFilePath = `${theHomeDir}/githubUserInfo.json`

// 获取信息
export const getInfo = function () {
  return (new Promise(function (resolve, reject) {
    readFile(configFilePath, function (err, data) {
      if (err) {
        reject(err)
      }
      let filedata = data.toString()
      while (typeof filedata === 'string') {
        filedata = JSON.parse(filedata)
      }
      resolve(filedata)
    })
  })).catch((err: any) => {
    console.log(err)
  })
}

// 存储信息
export const saveInfo = function (saveOptions: any) {
  let writedata = JSON.stringify(saveOptions)
  return (new Promise(function (resolve, reject) {
    function filecb (err: any) {
      if (err) {
        reject(err)
      }
      resolve()
    }
    if (!existsSync(configFilePath)) {
      writeFile.call(this, configFilePath, writedata, filecb)
    } else {
      getInfo().then(function (res) {   
        let thewritedata = JSON.stringify(Object.assign(res, saveOptions))
        writeFile.call(this, configFilePath, thewritedata, filecb)
      })
    }
  })).catch((err: any) => {
    console.log(err)
  })
}