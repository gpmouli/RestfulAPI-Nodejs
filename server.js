const http = require('http');
const app = require('./app'); //import app express response
// create port 
const port = process.env.PORT || 3000;
// create server
const server = http.createServer(app);

server.listen(port);