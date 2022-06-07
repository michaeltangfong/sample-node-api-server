exports.sendResponse = function(response: any, data: string) {
    let rep = require('./customResponse');
    rep.sendResponse(response, {}, 404, data)
};