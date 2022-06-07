"use strict";
exports.sendResponse = function (response, data) {
    let rep = require('./customResponse');
    rep.sendResponse(response, {}, 404, data);
};
