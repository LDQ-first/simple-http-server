/*
* URL Uniform Resource Locator         定位资源
* Schema://host:port/path?query#hash
* port 22 ssh  80 http  443 https  27017 mongodb
*/


const http = require('http')
const server = http.createServer()
server.listen(8808)
server.on('request', (request, response) => {
  const url = request.url
  console.log(url)
  let responseStr
  if (url === '/a') {
    responseStr = 'a'
  } else if (url === '/b') {
    responseStr = 'b'
  } else {
    responseStr = 'c'
  }

  response.statusCode = 200
  response.end(responseStr)
})
console.log('open in http://localhost:8808')
