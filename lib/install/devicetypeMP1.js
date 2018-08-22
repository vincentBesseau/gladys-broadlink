module.exports = function getDeviceTypesMp1(module){

	if(module === 'mp1'){
		return [ {
                name: 'Prise 1',
                type: 'binary',
                identifier: 'mp1:1',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Prise 2',
                type: 'binary',
                identifier: 'mp1:2',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Prise 3',
                type: 'binary',
                identifier: 'mp1:3',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Prise 4',
                type: 'binary',
                identifier: 'mp1:4',
                sensor: false,
                min: 0,
                max: 1,
            }];
	} else {
		return []
	}

}