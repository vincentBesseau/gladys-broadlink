const getDeviceTypesMp1 = require('./install/devicetypeMP1')
var Broadlink = require("broadlink-js");

module.exports = function install() {
    var blink = new Broadlink.Broadlink();

    blink.on('listen', function(res) {
        sails.log.debug('listening', res);
    })

    blink.on('discover', function discover(res) {
        sails.log.debug('discover', res);
        sails.log.info('Create device '+res.name);

        var options = {
            device : {
                name: res.name,
                protocol: res.module.toUpperCase(),
                service: 'broadlink',
                identifier: res.address+':'+res.port+':'+res.mac.toString('hex')
            },
            types : getDeviceTypesMp1(res.module)
        };

        gladys.device.create(options)
        .then(function(device){
           sails.log.info("device "+device.name+" created !");
           return device;
        })
        .catch(function(err){
            sails.log.info("Error during device creation !");
            return err;
        });

    })

    
    blink.discover();

    setTimeout(function() {
        blink.removeListener('discover', discover);
    },30000)
   
};
