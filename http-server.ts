/** ES6 Import & Export
 * Import is lexical, it gets sorted to the top of the file.
 * It can’t be called conditionally, it always run in the beginning of the file.
 * To run a program containing import statement you have to use experimental module feature flag.
 * If you want to use import module then you have to save file with ‘.mjs’ extension.
 */
// import url from 'url';   `
// import http from 'http'

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


interface requestMessage {
    name?: string;
}

function tryParse(str: string) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}

const requestListener = function (request: any, response: any) {
    let data: string = '';

    request.on('data', (chunk: any) => {
        data += chunk;
    });

    request.on('end', (msg: any) => {
        if (routes[request.url]) {
            let requestMessage: requestMessage = tryParse(data);
            require(`./handlers/${routes[request.url]}`).sendResponse(response, requestMessage);
        } else {
            require(`./handlers/notFoundRequest`).sendResponse(response, 'Not Found');
        }
    });
};

const asyncRequestListener = async function (request: any, response: any) {
    const buffers: Array<any> = [];

    for await (const chunk of request)
        buffers.push(chunk);

    const data = tryParse(Buffer.concat(buffers).toString());

    if (routes[request.url])
        require(`./handlers/${routes[request.url]}`).sendResponse(response, data);
    else
        require(`./handlers/notFoundRequest`).sendResponse(response, 'Not Found');

}

const server = http.createServer(asyncRequestListener);

server.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`);
})