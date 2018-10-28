 (function () {
    'use strict';

    angular
        .module('gladys')
        .controller('BroadlinkCtrl', BroadlinkCtrl);

    BroadlinkCtrl.$inject = ['broadlinkService', 'deviceService', '$scope'];

    function BroadlinkCtrl(broadlinkService, deviceService, $scope) {
        /* jshint validthis: true */
        var vm = this;
        vm._name = null;
        vm.LearningMode = LearningMode;
        vm.RM2devices = getRM2Device();

        function getRM2Device() {
            return deviceService.get()
            .then(function(devices) {
                var RM2Device = [];
                devices.data.forEach(function(device) {
                    if(device.service === 'broadlink' && device.protocol === 'RM2') RM2Device.push(device);
                })
                return RM2Device;
            })
        }

        function LearningMode(id,name) {
            return broadlinkService.learningMode({'deviceId':id, '_name':name})
                .then(function(result){
                    if(result.status === 200){
                        console.log('LearningMode ok')
                    }else{
                        console.log('LearningMode ko')
                    }
                })
        }
        
        
    }
})();