const supportsHyperlinks = require('supports-hyperlinks')
const hyperlinker = require('hyperlinker')

export default function getHyperlinkText(theurl: string): string {
  let thedata = ''
  if (supportsHyperlinks.stdout) {
    thedata = hyperlinker('点击查看详情', theurl)
  } else {
    thedata = theurl
  }
  return thedata
}