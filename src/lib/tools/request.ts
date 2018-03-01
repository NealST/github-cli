// 客户端请求模块

let axios = require('axios')
import spinner from './spinner'
import { error, success } from './output';
export const thedomain = 'https://api.github.com'
export const previewAccept = 'application/vnd.github.mercy-preview+json'

interface requestOptions {
  // `url` is the server URL that will be used for the request
  url?: string;
   
  // `method` is the request method to be used when making the request
  method?: string; // default
   
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL?: string;
   
  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest?: Array<any>; // example: [function (data, headers) {
    // Do whatever you want to transform the data
    // return data;
    // }],
   
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse?: Array<any>;// example: [function (data) {
    // Do whatever you want to transform the data
    // return data;
    // }],
   
  // `headers` are custom headers to be sent
  headers?: any; // example: {'X-Requested-With': 'XMLHttpRequest'},
   
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params?: any; // example: { ID: 12345 }
   
  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer?: any; // example: function(params) {
    // return Qs.stringify(params, {arrayFormat: 'brackets'})
    // },
   
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data?: any; // example: {
      // firstName: 'Fred'
    // },
   
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout?: number; // 1000,
   
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials?: boolean, // default false
   
  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter?: any;// example function (config) {
      /* ... */
    // },
   
  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth?: any; // example: { username: 'janedoe',password: 's00pers3cret'},
   
  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType?: string; // default 'json'
   
  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName?: string; // default 'XSRF-TOKEN'
   
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName?: 'string'; // 'X-XSRF-TOKEN' default
   
  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress?: any; // function (progressEvent) {
      // Do whatever you want with the native progress event
    // },
   
  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress?: any; // function (progressEvent) {
    // Do whatever you want with the native progress event
  // },
   
  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength?: number,
   
  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus?: any; // function (status) {
    // return status >= 200 && status < 300; default
  // },
   
  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects?: number, // default 5
   
  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent?: any;// new http.Agent({ keepAlive: true }),
  httpsAgent?: any;// new https.Agent({ keepAlive: true }),
   
  // 'proxy' defines the hostname and port of the proxy server
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  proxy?: any; /* example: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },*/
   
  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken?: any; // new CancelToken(function (cancel) {})
}

// 客户端请求封装
export const request = function (url: string, type: string, data: any, requestOptions?: requestOptions) {
  let ajaxdata = type === 'get' ? {params: data} : {data: data, withCredentials: true}
  let configOptions = Object.assign({
    url: `${thedomain}${url}`,
    method: type,
    timeout: 5000,
    ...ajaxdata
  }, requestOptions || {})
  // there are some problems with axios promise, so I wrapped a new promise
  return (new Promise(function (resolve, reject) {
    axios(configOptions).catch((err: any) => {
      reject(err)
    }).then((res: any) => {
      // 备注，star仓库等操作成功后也会返回204
      if (res.status === 204 && process.env.githubActionType === 'remove') {
        success('delete success!')
      }
      resolve(res)
    })
  })).catch((err: any) => {
    if (err.response.status === 404 && process.argv.indexOf('ck') > 0) {
      error('this user is not a collaborator!')
      return
    }
    if (err.response && err.response.data) {
      error(err.response.statusText)
      error(err.response.data.message)
      /*if (err.response.status === 401) {
        error('you are unauthorized')
      }
      if (err.response.status === 403) {
        error('your authentication is forbidden')
      }
      if (err.response.status === 410) {
        error('current action is disabled or deprecated')
      }
      if (err.response.status === 422) {
        error('unprocessable request,maybe the data you input is invalid')
      }
      if (err.response.status === 405)*/
      // 有些查看操作，checkcolloborators如果结果为否会返回404
    }
    if (err.message === 'timeout of 5000ms exceeded') {
      error('request timeout,please try again')
    }
    process.exit()
  })
}
