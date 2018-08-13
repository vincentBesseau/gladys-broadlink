// if we are running inside sails.js, it means we are running inside Gladys
// This file is not supposed to run inside Gladys so stop now.

if ( typeof sails !== 'undefined' && sails ) {
    return '';
}
const pathToStoreFiles = './store/Broadlink/jsonCommands'
var Broadlink = require("broadlink-js");
var uuidv4 = require('uuid/v4');
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
    console.log(res.module)
    if(res.module === 'rm2'){
    	var dev = new Broadlink.BroadlinkDeviceRM2(res);
    	dev.on('ready', function(res) {
	        gladysMqttAdapter.on('message-notify', function(data) {
				console.log(data)
				switch (data._type) {
					case 'learning':
						console.log("enterLearning mode");
						dev.learnCode(function(res,err,object) {
							console.log(res)
							console.log(err)
				            console.log(object);
				            var newId = uuidv4()
	            
				            while (fs.existsSync(pathToStoreFiles+'/'+newId+'.json')) {
							    newId = uuidv4()
							}
				            
				            var newJson = {
				            	id:newId,
				            	command: object.toString('hex')
				            }
				            jsonStore.add(newJson, function(err) {
				            	if (err) throw err;
				            })

				            var uri = config.baseUri + "/devicetype?token="+config.token
				            var json = {
									    "name": data._name,
									    "type": "binary",
									    "identifier":newId,
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
							        console.log('DeviceType Create with success')
							        learn = null
							    }
							    else {
							    	console.log('Error HTTP '+response.statusCode)
							    }
							})
				            console.log("hex:"+newJson.command);
				        });
						break;
					case 'sendData':
						var uuid = data._uuid
			            console.log(uuid)
			            jsonStore.load(uuid, function(err, object){
							if(err) console.log(err);
							var convertHexToBuffer = new Buffer(object.command, "hex")
			            	dev.sendData(convertHexToBuffer)
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
