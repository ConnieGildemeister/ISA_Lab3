const http = require('http');
const url = require('url');
const { getDate } = require('./modules/utils');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const name = queryObject.name || 'Guest';

    // Handle '/getDate'
    if (req.url.startsWith('/getDate')) {
        const message = getDate(name);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<p style="color:blue;">${message}</p>`);
        return; // Return here to avoid handling other requests for the same URL
    }

    // Handle '/writeFile'
    if (req.url.startsWith('/writeFile')) {
        const text = queryObject.text || 'No Text';
        const filePath = path.join(__dirname, 'file.txt');

        fs.appendFile(filePath, text + '\n', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error writing to file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Text appended to file');
            }
        });
        return; // Return to avoid handling other requests
    }

    // Handle '/readFile'
    if (req.url.startsWith('/readFile')) {
        const filePath = path.join(__dirname, 'file.txt');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`File not found: ${filePath}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
        return; // Return to avoid handling other requests
    }

    // Handle other routes (404 Not Found)
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
