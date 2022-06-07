"use strict";
exports.sendResponse = function (response, data) {
    const rep = require('./customResponse');
    rep.sendResponse(response, {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'POST',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10,
        'Content-Type': 'application/json'
    }, 200, { message: `Hello! ${data.name && data.name !== '' ? data.name : 'Guest'}` });
};
