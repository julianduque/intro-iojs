'use strict'

const http = require('http')

const port   = process.env.PORT || 8080
const server = http.createServer()

server.on('request', handleRequest)
server.on('listening', function () {
  console.log(`listening on port ${port}`)
})

function handleRequest(req, res) {
  let url = req.url

  res.setHeader('content-type', 'text/plain')
  res.statusCode = 404
  res.end(`${url} not found`)
}

server.listen(port)
