// if we are running inside sails.js, it means we are running inside Gladys
// This file is not supposed to run inside Gladys so stop now.

if ( typeof sails !== 'undefined' && sails ) {
    return '';
}

const pathToStoreFiles = './store/Broadlink/jsonCommands'
var argv = require('minimist')(process.argv.slice(2));
var Broadlink = require("broadlink-js");
var jsonStore = require('json-fs-store')(pathToStoreFiles);
var fs = require('fs');
var request = require("request");
const getDeviceTypesMp1 = require('./lib/install/devicetypeMP1')
const config = require('./config/config.js');
var gladysMqttAdapter = require('gladys-mqtt-adapter')({
    MACHINE_ID: config.machineId,
    MQTT_URL: config.mqttUrl,
    MQTT_USERNAME: config.mqttUsername,
    MQTT_PASSWORD: config.mqttPassword,
    MODULE_SLUG: 'gladys-broadlink' 
});
var debug = false

if ( typeof argv.d !== 'undefined' && argv.d ) {
    debug = argv.d
}



var blink = new Broadlink.Broadlink();

blink.on('listen', function(res) {
    if (debug) console.log('listening', res);
})

blink.on('discover', function(res) {
	if (debug) console.log('discover', res);
	console.log('Create device '+res.name);
	gladysMqttAdapter.device.create({
		device : {
	    	name: res.name,
	    	protocol: 'MQTT',
	    	service: 'gladys-broadlink',
	    	identifier: res.module
		},
		types : getDeviceTypesMp1(res.module)
	})

	gladysMqttAdapter.on('message-notify', function(data) {
		if (debug) console.log('json', data)

		if(res.module === 'mp1' && data._module === 'MP1'){
			var mp1 = new Broadlink.BroadlinkDeviceMP1(res);
			if (debug) console.log('mp1', mp1)
			mp1.on('ready', function(res) {
				switch (data._type) {
					case 'setPower':
						mp1.setPower(data._state,[data._index])
						break;
					default:
			            console.log('Message non reconnu');
			    }
			})
		}

	    if(res.module === 'rm2' && data._module === 'RM2'){
	    	var rm2 = new Broadlink.BroadlinkDeviceRM2(res);
	    	if (debug) console.log('rm2', rm2)
	    	rm2.on('ready', function(res) {
				switch (data._type) {
					case 'learning':
						console.log("enterLearning mode");
						rm2.learnCode(function(res,object) {
							if (debug) console.log('res', res)
				            if (debug) console.log('object', object);

				            var uri = config.baseUri + "/devicetype?token="+config.token
				            var json = {
									    "name": data._name,
									    "type": "binary",
									    "unit": "RM2",
									    "min":0,
									    "max":1,
									    "sensor":false,
									    "device":data._deviceId
									  }
							var options = {
							    url: uri,
							    json: true,
							    method: 'POST',
							    headers: {
								        	"content-type": "application/json",
								        },
							    json: json
							}
							request(options, function (error, response, body) {
							    if (!error && response.statusCode == 200) {
							        // Print out the response body
							        var newJson = {
														id:body.id,
														command: object.toString('hex')
													}
									jsonStore.add(newJson, function(err) {
						            	if (err) console.log(err);
						            })
							        console.log('DeviceType Create with success')
        				            if (debug) console.log("hex:"+newJson.command);
							    }
							    else {
							    	console.log('Error HTTP '+response.statusCode)
							    }
							})
				        });
						break;
					case 'sendData':
						var devicetypeId = data._id
			            if (debug) console.log('devicetypeId', devicetypeId)
			            jsonStore.load(devicetypeId, function(err, object){
							if(!err) {
								console.log('Exec command')
								var convertHexToBuffer = new Buffer(object.command, "hex")
			            		rm2.sendData(convertHexToBuffer)
			            	} else {
			            		console.log('No command exist !')
			            		if (debug) console.log(err)
			            	}
						});
				        break;
			        default:
			            console.log('Message non reconnu');
				}

		    });
	        
	    }
	})
});

blink.discover();
