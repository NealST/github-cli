"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promiseCompose = function (fns) {
    var initialPromise = fns.shift();
    return fns.reduce(function (prefn, currfn) {
        return prefn.then(currfn);
    }, initialPromise()).catch(function (err) {
        console.log(err);
    });
};
exports.default = promiseCompose;
