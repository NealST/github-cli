"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Table = require("cli-table2");
// 创建一个表格实例
function createTable(createOptions) {
    return new Table(Object.assign({
        chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
            'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
            'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
            'right': '║', 'right-mid': '╢', 'middle': '│' }
    }, createOptions || {}));
}
exports.default = createTable;
