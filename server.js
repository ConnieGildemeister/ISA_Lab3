// Note: ChatGPT helped in the making of this code

const http = require('http');
const url = require('url');
const { getDate } = require('./modules/utils');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const name = queryObject.name || 'Connie';

    if (req.url.startsWith('/getDate')) {
        const message = getDate(name);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<p style="color:blue;">${message}</p>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
