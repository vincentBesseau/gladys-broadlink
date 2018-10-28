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
        shared.rm2Instances = {};
        shared.mp1Instances = {};

        broadlinkDevices.forEach(broadlinkDevice => {
            if(broadlinkDevice.Protocol === 'RM2') {
                shared.rm2Instances[broadlinkDevice.id]= new Broadlink.BroadlinkDeviceRM2();
            }
            if(broadlinkDevice.Protocol === 'MP1') {
                shared.mp1Instances[broadlinkDevice.id]= new Broadlink.BroadlinkDeviceMP1();
            }
        });
    })
};
