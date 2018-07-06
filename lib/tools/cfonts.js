"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cfonts = require("cfonts");
function textFonts(text, textOptions) {
    cfonts.say(text, Object.assign({
        font: '3d',
        align: 'center',
        colors: ['magenta'],
        background: 'black',
        letterSpacing: 1,
        lineHeight: 0.00005,
        space: true,
        maxLength: '0'
    }, textOptions || {}));
}
exports.default = textFonts;
