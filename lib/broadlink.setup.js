var Promise = require('bluebird');
const getDeviceTypesMp1 = require('./install/devicetypeMP1')
var Broadlink = require("broadlink-js");
var init = require('./broadlink.init');

module.exports = function setup() {
    var blink = new Broadlink.Broadlink();

    blink.on('listen', function(res) {
        sails.log.debug('listening', res);
    })

    blink.on('discover', function discover(res) {
        sails.log.debug('discover', res);
        sails.log.info('Create device '+res.name);
        
        var protocol = (res.module === 'unknow') ? 'RM2' : res.module.toUpperCase();

        var options = {
            device : {
                name: res.name,
                protocol: protocol,
                service: 'broadlink',
                identifier: res.address+':'+res.port+':'+res.mac.toString('hex')
            },
            types : getDeviceTypesMp1(res.module)
        };

        gladys.device.create(options)
        .then(function(device){
           sails.log.info("device "+device.name+" created !");
           init();
        })
        .catch(function(err){
            sails.log.info("Error during device creation !");
        });

    })

    
    blink.discover();

    return Promise.resolve("Succès")

};
