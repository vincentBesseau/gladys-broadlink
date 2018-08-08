module.exports = function (sails) {

    var install = require('./lib/install/broadlink.install.js');
    var exec = require('./lib/broadlink.exec.js');
    var BroadlinkController = require('./controller/broadlinkController.js');

    return {
        install,
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