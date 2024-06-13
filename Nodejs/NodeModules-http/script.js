var http = require('http');

http.createServer((req, res) => {
    res.write("Hello World");
    res.write(req.url);
    res.end();
}).listen(3000);