/*
* URL Uniform Resource Locator         定位资源
* Schema://host:port/path?query#hash
* port 22 ssh  80 http  443 https  27017 mongodb
* ?a=1&b=2&c=3
*/

/*
* HTTP请求
* 第一部分 第一行 
* 方法 路径 协议/协议版本
* HTTP GET(获取) POST(新建，修改) PATCH(修改)
* PUT(创建) DELETE(删除) OPTION(操作) HEAD(头信息)
*  
* path: /user get: 获取用户 post: 创建用户 patch: 修改用户信息
* put: 创建  delete: 删除 option: 列举可进行的操作 head: 返回head信息
* 
* HTTP请求头
* 第二行到空行之前
* 重要键值对
* Content-Type: 请求体的编码类型（编码，格式等）
* Content-Length: 请求体的长度
* Accept: 能够接受的媒体类型
* Cookie: cookie
* 
* HTTP请求头和请求体以一个空行作为分隔符
*
* 第三部分 请求体 http-request/response-body
* 请求体格式、编码通常由求取头里的content-type指定，可能会很大
* 
*/





const http = require('http')
const server = http.createServer()
const qs = require('querystring')

server.listen(8808)

const users = []

server.on('request', (request, response) => {
  const url = request.url

  const path = url.substr(0, url.indexOf('?'))

  const queryString = url.substr(url.indexOf('?') + 1, url.length)

  const query =qs.parse(queryString)

  console.log(`url: ${url}`)
  console.log(`path: ${path}`)
  console.log(`query: `, query)

  switch (path) {
    case '/user':
      switch(request.method) {
        case 'GET':
          response.statusCode = 200
          response.end(JSON.stringify(users))
          break
        case 'POST':
          /*const user = { name: Math.floor(Math.random() * 100) }
          users.push(user)
          response.statusCode = 200
          response.end(JSON.stringify(user))*/
          const contentType = request.headers['content-Type']
          if (contentType !== 'application/json') {
            response.statusCode = 400
            response.end('error')
          }
          let requestBodyStr = ''
          request.on('data', (data) => {
            requestBodyStr += data.toString()
          })
          request.on('end', () => {
            const user = JSON.parse(requestBodyStr)
            users.push(user)
            response.statusCode = 200
            response.end(JSON.stringify(user))
          })
         break
      }
      break
    default:
      response.statusCode = 404
      response.end('NOT_FOUND')
      break
  }
  

  let responseStr
  if (url.indexOf('/a') > -1) {
    responseStr = 'a'
    if (query.a = '1' && Number(query.b) > 2) {
      responseStr = 'aa'
    }
    else {
      responseStr = 'ab'
    }
  } else if (url.indexOf('/b') > -1) {
    responseStr = 'b'
  } else {
    responseStr = 'c'
  }

  response.statusCode = 200
  response.end(responseStr)
})
console.log('open in http://localhost:8808')
