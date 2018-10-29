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
        vm.RM2devices = [];

        getRM2Device();

        function getRM2Device() {
            return deviceService.get()
            .then(function(devices) {
                devices.data.forEach(function(device) {
                    if(device.service === 'broadlink' && device.protocol === 'RM2') {
                        vm.RM2devices.push(device);                        
                    }
                })
                return vm.RM2devices;
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