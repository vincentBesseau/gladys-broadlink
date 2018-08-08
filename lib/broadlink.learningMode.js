var Promise = require('bluebird');

module.exports = function learningMode(options) {
    console.log(options)
    var devicetypeName = options._name
    var machineId = options._machineId
    if(machineId !== null && devicetypeName !== null)
    {
        var json = '{"_type":"learning","_name":"'+devicetypeName+'"}'
        var topic = 'gladys/machine/'+machineId+'/module/gladys-broadlink/notify'
        gladys.modules.mqtt.emit(topic,json)
    } else {
        console.log('Broadcast : Error to enter on learning mode !')
    }
    return Promise.resolve();
}