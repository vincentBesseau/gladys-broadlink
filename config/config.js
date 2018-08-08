module.exports = {
    machineId: process.env.BLUETOOTH_SCAN_INTERVAL || 1, // Interval between Bluetooth scans
    mqttUrl: process.env.BLUETOOTH_SCAN_TIMEOUT || "", // the timeout of each bluetooth scan
    mqttUsername: process.env.GLADYS_URL || '', // the URL of your main Gladys Instance
    mqttPassword: process.env.GLADYS_TOKEN || '', // your gladys security token. You can find it in Gladys Dashboard "Parameters" => "Security". 
    baseUri: process.env.BASEURI || '',
    token: process.env.TOKEN || '',
};
