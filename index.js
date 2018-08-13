module.exports = function (sails) {

    var exec = require('./lib/broadlink.exec.js');
    var BroadlinkController = require('./controller/broadlinkController.js');

    return {
        exec,
        routes: {
            before: {
                'post /broadlink/learning': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next)
            },
            after: {
                'post /broadlink/learning': BroadlinkController.learningMode,
            }
        }
    };
};