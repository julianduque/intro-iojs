'use strict'

const http = require('http')
const path = require('path')
const url  = require('url')
const qs   = require('querystring')
const fs   = require('fs')

const port   = process.env.PORT || 8080
const server = http.createServer()

server.on('request', handleRequest)
server.on('listening', function () {
  console.log(`listening on port ${port}`)
})

function handleRequest(req, res) {
  let uri = req.url

  if (uri === '/')
    return handleIndex(req, res)

  if (uri.startsWith('/repeat'))
    return handleRepeat(req, res)

  res.setHeader('content-type', 'text/plain')
  res.statusCode = 404
  res.end(`${url} not found`)
}

function handleIndex(req, res) {
  res.setHeader('content-type', 'text/html')
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
}

function handleRepeat(req, res) {
  let params = getParams(req)

  let text = params.text || 'io.js '
  let times = params.times || 5

  let repeat = text.repeat(Number(times))

  res.setHeader('content-type', 'text/plain')
  res.end(repeat)
}

function getParams(req) {
  let query = url.parse(req.url).query
  return qs.parse(query)
}

server.listen(port)
