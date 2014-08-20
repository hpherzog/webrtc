

module.exports = function(options) {

    var logger = options.logger;

    return function(sockets) {

        sockets.on('opened',function(socket){
            logger.info('SOCKET OPENED!');
        });

        sockets.on('closed', function(socket){
            logger.info('SOCKET CLOSED!');
        });

        sockets.on('message', function(message){
            logger.info('SOCKET MESSAGE!');
        });

    }
};