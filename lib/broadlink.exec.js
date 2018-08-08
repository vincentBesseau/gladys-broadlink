module.exports = function(params) {
  var json = '{"_type":"senData","_command":"'+params.deviceType.deviceTypeIdentifier+'"}'
  var topic = 'gladys/machine/'+machineId+'/module/gladys-broadlink/notify'
  gladys.modules.mqtt.emit(topic,json)
};