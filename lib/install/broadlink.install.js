const Promise = require('bluebird');
var createBroadlinkRemoteDevice = require('./createBroadlinkRemoteDevice')

module.exports = function install(){
	
	return createBroadlinkRemoteDevice()

	var type = {
		name: 'Websocket',
		service: 'socket'
	}

	return gladys.notification.install(type);
};