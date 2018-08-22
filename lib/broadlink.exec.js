module.exports = function(params) {
	gladys.param.getValue('BROADLINK_MACHINE_UUID')
    .then((machineUuid) => {
    	var identifierCode = params.deviceType.identifier.split(':')

    	if(identifierCode[0] === 'MP1') {
    		switch(params.state.value) {
    			case 1:
    				var json = '{"_type":"setPower","_index":"'+identifierCode[1]+'","_state":"on"}'
    				break;
    			case 0:
    				var json = '{"_type":"setPower","_index":"'+identifierCode[1]+'","_state":"off"}'
    				break;
    			default:
					if(value != 0 || value != 1){
						console.log("Erreur de données !");
					}
    				break;
    		}
    	} else if(identifierCode[0] === 'RM2') {
    		var json = '{"_type":"sendData","_id":"'+identifierCode[1]+'"}'	
    	}
	  	
	  	var topic = 'gladys/machine/'+machineUuid+'/module/gladys-broadlink/notify'
	  	gladys.modules.mqtt.emit(topic,json)
  	})
};