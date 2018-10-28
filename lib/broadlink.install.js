const getDeviceTypesMp1 = require('./lib/install/devicetypeMP1')
var Broadlink = require("broadlink-js");

module.exports = function install() {
    var blink = new Broadlink.Broadlink();

    blink.on('listen', function(res) {
        sails.log.debug('listening', res);
    })

    blink.on('discover', function(res) {
        sails.log.debug('discover', res);
        sails.log.info('Create device '+res.name);

        var options = {
            device : {
                name: res.name,
                protocol: res.module.toUpperCase(),
                service: 'broadlink',
                identifier: res.address
            },
            types : getDeviceTypesMp1(res.module)
        };

        gladys.device.create(options)
        .then(function(device){
           sails.log.info("device "+device.name+" created !");
        })
        .catch(function(err){
            sails.log.info("Error during device creation !");
        });

    })

    setTimeout(function() {
        blink.discover();
    }, 30000);
};