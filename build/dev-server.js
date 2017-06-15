require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var http = require('http')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var apiRoutes = express.Router()
apiRoutes.get('/channel', function(req, res) {
  let channel = ''
  let url = encodeURI('http://api.jisuapi.com/news/channel?appkey=ca05a06b9221f5d1')
  let getChannel = new Promise((resolve, reject) => {
    http.get(url, response => {
      response.on('data', data => {
        channel += data
      })
      response.on('end', () => {
        resolve(channel)
      })
    })
  })
  getChannel.then(channel => {
    channel = JSON.parse(channel)
    res.json(channel)
  })
})
apiRoutes.get('/channel/:item', function(req, res) {
  let item = req.params.item
  function findChannel(item) {
    return new Promise((resolve, reject) => {
      let findResult = ''
      let url = encodeURI('http://api.jisuapi.com/news/get?channel='+item+'&start=0&num=30&appkey=ca05a06b9221f5d1')
      http.get(url, response => {
        response.on('data', data => {
          findResult += data
        })
        response.on('end', () => {
          resolve(findResult)
        })
      })
    })
  }
  findChannel(item)
    .then(findResult => {
      res.json(JSON.parse(findResult))
    })
})
apiRoutes.get('/search/:keywords', function(req, res) {
  let keywords = req.params.keywords
  function search(keywords) {
    return new Promise((resolve, reject) => {
      let searchResult = ''
      let url = encodeURI('http://api.jisuapi.com/news/search?keyword='+keywords+'&appkey=ca05a06b9221f5d1')
      http.get(url, response => {
        response.on('data', data => {
          searchResult += data
        })
        response.on('end', () => {
          resolve(searchResult)
        })
      })
    })
  }
  search(keywords)
    .then(searchResult => {
      res.json(JSON.parse(searchResult))
    })
})
app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
