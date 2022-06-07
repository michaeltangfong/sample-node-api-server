/**
 * @param response
 * @param header
 * @param statusCode
 * @param data
 */
exports.sendResponse = function (response: any, header: Object, statusCode: number, data: Object | String):void {
  switch (typeof data) {
    case 'symbol':
    case 'function':
    case 'undefined':
      response.writeHead(500, {})
      response.end('Internal Server Error')
      break
    case 'boolean':
    case 'number':
    case 'bigint':
    case 'object':
      response.writeHead(statusCode || 200, header || {})
      response.end(JSON.stringify(data))
      break
    case 'string':
      response.writeHead(statusCode || 200, header || {})
      response.end(data)
      break
  }
}
