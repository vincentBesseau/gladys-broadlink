var Broadlink = require("broadlink-js");
var shared = require('./broadlink.shared.js');

module.exports = function init() {
    var options = {
        service: 'broadlink'
    }
    return gladys.device.getByService(options)
    .then((broadlinkDevices) => {
        return broadlinkDevices;
    })
    .catch(() => {
        return []
    })
    .then((broadlinkDevices) => {

        // reset all instances 
        shared.instances.rm2Instances = {};
        shared.instances.mp1Instances = {};

        broadlinkDevices.forEach(broadlinkDevice => {
            var info = broadlinkDevice.identifier.split(':');
            var options = {
                address:info[0],
                port:info[1],
                mac:new Buffer(info[2], "hex")
            };

            if(broadlinkDevice.protocol === 'RM2') {
                shared.instances.rm2Instances[broadlinkDevice.id] = new Broadlink.BroadlinkDeviceRM2(options);
            }

            if(broadlinkDevice.protocol === 'MP1') {
                shared.instances.mp1Instances[broadlinkDevice.id] = new Broadlink.BroadlinkDeviceMP1(options);
            }
        });
    })
};
