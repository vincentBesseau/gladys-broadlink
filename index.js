module.exports = function (sails) {

    var exec = require('./lib/broadlink.exec.js');
    var BroadlinkController = require('./controller/broadlinkController.js');
    var install = require('./lib/broadlink.install.js');
    var uninstall = require('./lib/uninstall.js');
    var init = require('./lib/broadlink.init.js');

    gladys.on('ready', function(){
		init();
	});

    return {
        exec,
        install,
        uninstall,
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