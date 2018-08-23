module.exports = function getDeviceTypesMp1(module){

	if(module === 'mp1'){
		return [ {
                name: 'Prise 1',
                type: 'binary',
                identifier: '0',
                unit: 'MP1',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Prise 2',
                type: 'binary',
                identifier: '1',
                unit: 'MP1',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Prise 3',
                type: 'binary',
                identifier: '2',
                unit: 'MP1',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Prise 4',
                type: 'binary',
                identifier: '3',
                unit: 'MP1',
                sensor: false,
                min: 0,
                max: 1,
            }];
	} else {
		return []
	}

}
