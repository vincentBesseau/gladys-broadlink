// if we are running inside sails.js, it means we are running inside Gladys
// This file is not supposed to run inside Gladys so stop now.

if ( typeof sails !== 'undefined' && sails ) {
    return '';
}
const pathToStoreFiles = './store/Broadlink/jsonCommands'
var Broadlink = require("broadlink-js");
var jsonStore = require('json-fs-store')(pathToStoreFiles);
var fs = require('fs');
var request = require("request");
const config = require('./config/config.js');
var gladysMqttAdapter = require('gladys-mqtt-adapter')({
    MACHINE_ID: config.machineId,
    MQTT_URL: config.mqttUrl,
    MQTT_USERNAME: config.mqttUsername,
    MQTT_PASSWORD: config.mqttPassword,
    MODULE_SLUG: 'gladys-broadlink' 
});




var blink = new Broadlink.Broadlink();

blink.on('listen', function(res) {
    console.log('listening', res);
})

blink.on('discover', function(res) {
	console.log('discover', res);
	console.log('Create device '+res.name);
	gladysMqttAdapter.device.create({
		device : {
	    	name: res.name,
	    	protocol: 'MQTT',
	    	service: 'gladys-broadlink',
	    	identifier: res.module
		},
		types : []
	})

	if(res.module === 'rm2'){
		var mp1 = new Broadlink.BroadlinkDeviceMP1(res);
		console.log(mp1)
		mp1.on('ready', function(res) {
			console.log(res)
		})
	}

    if(res.module === 'rm2'){
    	var rm2 = new Broadlink.BroadlinkDeviceRM2(res);
    	rm2.on('ready', function(res) {
	        gladysMqttAdapter.on('message-notify', function(data) {
				console.log(data)
				switch (data._type) {
					case 'learning':
						console.log("enterLearning mode");
						rm2.learnCode(function(res,object) {
							console.log(res)
				            console.log(object);

				            var uri = config.baseUri + "/devicetype?token="+config.token
				            var json = {
									    "name": data._name,
									    "type": "binary",
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
        				            console.log("hex:"+newJson.command);
							    }
							    else {
							    	console.log('Error HTTP '+response.statusCode)
							    }
							})
				        });
						break;
					case 'sendData':
						var devicetypeId = data._id
			            console.log(devicetypeId)
			            jsonStore.load(devicetypeId, function(err, object){
							if(err) console.log(err);
							var convertHexToBuffer = new Buffer(object.command, "hex")
			            	rm2.sendData(convertHexToBuffer)
						});
				        break;
			        default:
			            console.log('Message non reconnu');
				}
			})

	    });
        
    }
});

blink.discover();
