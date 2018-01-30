const supportsHyperlinks = require('supports-hyperlinks')
const hyperlinker = require('hyperlinker')

export default function getHyperlinkText(message: string, theurl: string): string {
  if (supportsHyperlinks.stdout) {
    return hyperlinker(message, theurl)
  } else {
    return theurl
  }
}