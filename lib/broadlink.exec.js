module.exports = function(params) {
	gladys.param.getValue('BROADLINK_MACHINE_UUID')
    .then((machineUuid) => {
    	if(params.deviceType.unit === 'MP1') {
    		switch(params.state.value) {
    			case 1:
    				var json = '{"_type":"setPower","_index":"'+params.deviceType.id+'","_state":"on"}'
    				break;
    			case 0:
    				var json = '{"_type":"setPower","_index":"'+params.deviceType.id+'","_state":"off"}'
    				break;
    			default:
					if(value != 0 || value != 1){
						console.log("Erreur de données !");
					}
    				break;
    		}
    	} else if(params.deviceType.unit === 'RM2') {
    		var json = '{"_type":"sendData","_id":"'+params.deviceType.id+'"}'	
    	}
	  	
	  	if (typeof json !== 'undefined') {
			var topic = 'gladys/machine/'+machineUuid+'/module/gladys-broadlink/notify'
			gladys.modules.mqtt.emit(topic,json)
		}
  	})
};