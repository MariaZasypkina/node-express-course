
const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.end('Welcome to the Home Page');
    } else if (req.url === '/about') {
        res.end('Here is our short history');
    } else {
        res.end(
            `<h1>Oops!</h1>
            <p>We can't seem to find the page you are looking for</p>
            <a href="/">back home</a>`
        );
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});