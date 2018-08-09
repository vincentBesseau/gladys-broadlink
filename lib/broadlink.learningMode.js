var Promise = require('bluebird');

module.exports = function learningMode(options) {
    console.log(options)
    gladys.param.getValue('BROADLINK_MACHINE_UUID')
    .then((machineUuid) => {
        gladys.device.getByIdentifier({identifier:'broadlink',service:'gladys-broadlink'})
        .then((device) => {
            var deviceId = device.id
            var devicetypeName = options._name
            var machineId = machineUuid
            if(machineId !== null && devicetypeName !== null)
            {
                var json = '{"_type":"learning","_name":"'+devicetypeName+'","_deviceId":"'+deviceId+'"}'
                var topic = 'gladys/machine/'+machineId+'/module/gladys-broadlink/notify'
                gladys.modules.mqtt.emit(topic,json)
                return 'Broadcast : Device '+devicetypeName+' create'
            } else {
                return 'Broadcast : Error to enter on learning mode !'
            }
        })
    })
}


