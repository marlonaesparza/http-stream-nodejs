require('dotenv').config({path: `${__dirname}/../.env`});
require('./../database/index');

const http = require('http');
const router = require('./api/router');

const server = http.createServer(router);

server.listen(8000);
