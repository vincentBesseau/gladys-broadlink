var shared = require('./broadlink.shared.js');
var jsonStore = require('json-fs-store')('./store/Broadlink/jsonCommands');

module.exports = function learningMode(options) {

    if(!shared.instance.rm2Instances[options.deviceId]) return reject(`No broadlink with deviceId ${options.deviceId}`);

	// call the broadlink function
    var broadlink = shared.instance.rm2Instances[options.deviceId];
    
    broadlink.learnCode(function(res,object) {
        gladys.deviceType.create({
            "name": options._name,
            "type": "push",
            "unit": "RM2",
            "min":0,
            "max":1,
            "sensor":false,
            "device": options.deviceId
        })
        .then(function(devicType){
            var newJson = {
                id: devicType.id,
                command: object.toString('hex')
            }
            jsonStore.add(newJson, function(err) {
                if (err) sails.log.error(err);
            })
            sails.log.info('DeviceType Create with success')
            sails.log.debug("hex:"+newJson.command);
        })
        .catch(function(err){
            sails.log.error(err)
        });
    })
}


