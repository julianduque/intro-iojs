'use strict'

const http = require('http')
const path = require('path')
const fs   = require('fs')

const port   = process.env.PORT || 8080
const server = http.createServer()

server.on('request', handleRequest)
server.on('listening', function () {
  console.log(`listening on port ${port}`)
})

function handleRequest(req, res) {
  let url = req.url

  if (url === '/')
    return handleIndex(req, res)

  res.setHeader('content-type', 'text/plain')
  res.statusCode = 404
  res.end(`${url} not found`)
}

function handleIndex(req, res) {
  res.setHeader('content-type', 'text/html')
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
}

server.listen(port)
