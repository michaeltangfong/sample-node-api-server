"use strict";
/** ES6 Import & Export
 * Import is lexical, it gets sorted to the top of the file.
 * It can’t be called conditionally, it always run in the beginning of the file.
 * To run a program containing import statement you have to use experimental module feature flag.
 * If you want to use import module then you have to save file with ‘.mjs’ extension.
 */
// import url from 'url';   `
// import http from 'http'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
/** Require
 * Require is Non-lexical, it stays where they have put the file.
 * It can be called at any time and place in the program.
 * You can directly run the code with require statement.
 * If you want to use require module then you have to save file with ‘.js’ extension.
 */
const http = require('http');
const url = require('url');
const path = require('path');
const host = '127.0.0.1';
const port = 3000;
const routes = require('./routes.json');
function tryParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return {};
    }
}
const requestListener = function (request, response) {
    let data = '';
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on('end', (msg) => {
        if (routes[request.url]) {
            let requestMessage = tryParse(data);
            require(`./handlers/${routes[request.url]}`).sendResponse(response, requestMessage);
        }
        else {
            require(`./handlers/notFoundRequest`).sendResponse(response, 'Not Found');
        }
    });
};
const asyncRequestListener = function (request, response) {
    var request_1, request_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const buffers = [];
        try {
            for (request_1 = __asyncValues(request); request_1_1 = yield request_1.next(), !request_1_1.done;) {
                const chunk = request_1_1.value;
                buffers.push(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (request_1_1 && !request_1_1.done && (_a = request_1.return)) yield _a.call(request_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const data = tryParse(Buffer.concat(buffers).toString());
        if (routes[request.url])
            require(`./handlers/${routes[request.url]}`).sendResponse(response, data);
        else
            require(`./handlers/notFoundRequest`).sendResponse(response, 'Not Found');
    });
};
const server = http.createServer(asyncRequestListener);
server.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`);
});
