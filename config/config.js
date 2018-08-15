module.exports = {
    machineId: process.env.GLADYS_MACHINE_ID || '', // Interval between Bluetooth scans
    mqttUrl: process.env.MQTT_URI || "", // the timeout of each bluetooth scan
    mqttUsername: process.env.MQTT_USERNAME || '', // the URL of your main Gladys Instance
    mqttPassword: process.env.MQTT_PASSWORD || '', // your gladys security token. You can find it in Gladys Dashboard "Parameters" => "Security". 
    baseUri: process.env.GLADYS_URI || '',
    token: process.env.GLADYS_TOKEN || '',
};
