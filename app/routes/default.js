
module.exports = function(options) {

    var logger = options.logger;

    return function(app) {

        app.all('/', function(req, res){

            res.render('index');
        });
    }
};