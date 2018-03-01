"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function shell(commandstring, fn) {
    child_process_1.exec(commandstring, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            process.exit();
        }
        if (stdout) {
            console.log(stdout.toString());
            fn && fn(stdout.toString());
            return;
        }
        if (stderr) {
            process.exit();
        }
    });
}
exports.default = shell;
