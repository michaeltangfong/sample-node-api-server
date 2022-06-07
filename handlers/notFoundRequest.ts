exports.sendResponse = function (response: any, data: string) {
  const rep = require('./customResponse')
  rep.sendResponse(response, {}, 404, data)
}
