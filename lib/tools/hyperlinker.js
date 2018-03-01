"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supportsHyperlinks = require('supports-hyperlinks');
var hyperlinker = require('hyperlinker');
function getHyperlinkText(theurl) {
    var thedata = '';
    if (supportsHyperlinks.stdout) {
        thedata = hyperlinker('点击查看详情', theurl);
    }
    else {
        thedata = theurl;
    }
    return thedata;
}
exports.default = getHyperlinkText;
