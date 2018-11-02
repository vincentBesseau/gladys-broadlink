var shared = require('./broadlink.shared.js');
var jsonStore = require('json-fs-store')('./api/hooks/broadlink/store/Broadlink/jsonCommands');

module.exports = function(params) {

	if(params.deviceType.unit === 'MP1') {
		if(!shared.instances.mp1Instances[params.deviceType.device]) return sails.log.error(`No broadlink with deviceId ${params.deviceType.device}`);
		
		// call the broadlink function
		var broadlink = shared.instances.mp1Instances[params.deviceType.device];

		switch(params.state.value) {
			case 1:
				broadlink.setPower('on',[params.deviceType.deviceTypeIdentifier]);
				break;
			case 0:
				broadlink.setPower('off',[params.deviceType.deviceTypeIdentifier]);
				break;
			default:
				if(value != 0 || value != 1){
					sails.log.error("Erreur de données !");
				}
				break;
		}
	} else if(params.deviceType.unit === 'RM2') {

		if(!shared.instances.rm2Instances[params.deviceType.device]) return sails.log.error(`No broadlink with deviceId ${params.deviceType.device}`);
		
		// call the broadlink function
		var broadlink = shared.instances.rm2Instances[params.deviceType.device];

		jsonStore.load(params.deviceType.id, function(err, object){
			if(!err) {
				sails.log.info('Exec command');
				var convertHexToBuffer = new Buffer(object.command, "hex");
				broadlink.sendData(convertHexToBuffer);
			} else {
				sails.log.error('No command exist !')
				sails.log.debug(err)
			}
		});
	}
};
