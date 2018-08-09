const Promise = require('bluebird');
var createBroadlinkRemoteDevice = require('./createBroadlinkRemoteDevice')

module.exports = function install(){
	
	createBroadlinkRemoteDevice()

	return 'installOk'

};