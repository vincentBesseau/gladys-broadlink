module.exports = function createBroadlinkRemoteDevice(){

    var newDevice = {
        device: {
        name: 'Broadlink remote',
        protocol: 'MQTT',
        service: 'gladys-broadlink',
        identifier: 'broadlink'
        },
    };

    return gladys.device.create(newDevice);

}