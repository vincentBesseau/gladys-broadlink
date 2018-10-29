module.exports = function deleteDeviceBroadlink(){
	sails.log.debug('Début désinstallation des devices broadlink');
	gladys.device.getByService({'service':'broadlink'})
	.then((devices) => {
		devices.forEach(function(device) {
			gladys.device.delete(device)
		})
	})
	sails.log.debug('Fin désinstallation du device');
}