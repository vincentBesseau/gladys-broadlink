module.exports = function(params) {
	gladys.param.getValue('BROADLINK_MACHINE_UUID')
    .then((machineUuid) => {
	  	var json = '{"_type":"sendData","_id":"'+params.deviceType.id+'"}'
	  	var topic = 'gladys/machine/'+machineUuid+'/module/gladys-broadlink/notify'
	  	gladys.modules.mqtt.emit(topic,json)
  	})
};