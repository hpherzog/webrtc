
var websrv = require('websrv');
var sockets = require('./src/sockets');
var routes = require('./src/routes');


var server = new websrv.Server({
    cookieSecret: '123456',
    viewEngine: 'ejs'
});

server.routes(routes.default({
    logger: websrv.logging.getLogger('Routes')
}));

server.sockets(sockets({
    logger: websrv.logging.getLogger('Sockets')
}));

server.start();