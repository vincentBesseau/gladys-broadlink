module.exports = function createBroadlinkRemoteDevice(){

    var newDevice = {
        device: {
        name: 'Broadlink remote',
        protocol: 'MQTT',
        service: 'Broadlink',
        identifier: 'broadlink'
        },
    };

    return gladys.device.create(newDevice);

}