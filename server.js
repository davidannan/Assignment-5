const path = require('path');

let filePath = path.join(__dirname, 'path.js');

let fileExtension = path.extname(filePath);
let basename = path.basename(filePath);

const fs = require('fs')

const http = require('http');
const server = http.createServer((request, response) => {
    let filePath = path.join(__dirname, 'NODEJS ASSIGNMENT 5', request.url === '/' ? 'Index.html' : request.url)
    let contentType = getContentType(filePath) || 'text/html'
    let emptyPagePath = path.join(__dirname, 'NODEJS ASSIGNMENT 5', '404.html');
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(emptyPagePath, 'utf8', (err, content) => {
                    response.writeHead(200, { 'Content-type': contentType });
                    response.end(content)
                })
            } else {
                response.writeHead(500)
                response.end('A server error has occured')
            }
        }
        if (!err) {
            response.writeHead(200, { 'Content-Type': contentType })
        }
    })
})
const getContentType = (filePath) => {
    let extname = path.extname(filePath)
    if (extname === '.js') {
        return 'text/javascript'
    }
    if (extname === '.jpg') {
        return 'image.jpg'
    }
}
const port = 4000

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})