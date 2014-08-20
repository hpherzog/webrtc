
var websrv = require('websrv');
var sockets = require('./app/sockets');
var routes = require('./app/routes');


var server = new websrv.Server({
    cookieSecret: '123456',
    viewEngine: 'jade',
    viewPath: './app/views'
});

server.routes(routes.default({
    logger: websrv.logging.getLogger('Routes')
}));

server.sockets(sockets({
    logger: websrv.logging.getLogger('Sockets')
}));

server.start();