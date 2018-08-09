const Promise = require('bluebird');
var createBroadlinkRemoteDevice = require('./createBroadlinkRemoteDevice')

module.exports = function install(){
	
	return createBroadlinkRemoteDevice()

	return Promise.resolve('Broadcast : Installation done !')
};