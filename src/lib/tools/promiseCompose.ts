const promiseCompose = function (fns: Array<Function>) {
  let initialPromise = fns.shift()
  return fns.reduce(function (prefn, currfn): Function {
    return prefn.then(currfn)
  }, initialPromise())
}
export default promiseCompose
