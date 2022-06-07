"use strict";
exports.sendResponse = function (response, data) {
    const rep = require('./customResponse');
    rep.sendResponse(response, {}, 404, data);
};
