(function() {
    'use strict';
 
    angular
      .module('gladys')
      .controller('BroadlinkCtrl', BroadlinkCtrl);
 
    BroadlinkCtrl.$inject = ['broadlinkService', 'deviceService', '$scope'];
 
    function BroadlinkCtrl(broadlinkService, deviceService, $scope) {
      /* jshint validthis: true */
      var vm = this;
      //vm._name = null;
      vm.LearningMode = LearningMode;
      vm.RM2devices = [];
      vm.RM2deviceType = [];
      vm.getRM2DeviceType = getRM2DeviceType;
      vm.selectedDevice = '';
 
      getRM2Device();
 
      function getRM2Device() {
        return deviceService.get()
          .then(function(devices) {
            devices.data.forEach(function(device) {
              if (device.service === 'broadlink' && device.protocol === 'RM2') {
                vm.RM2devices.push(device);
              }
            })
            return vm.RM2devices;
          })
      }
 
      function LearningMode(id, name) {
        return broadlinkService.learningMode({ 'deviceId': vm.selectedDevice.id, '_name': name })
          .then(function(result) {
            if (result.status === 200) {
              console.log('LearningMode ok')
              getRM2DeviceType(vm.selectedDevice)
            } else {
              console.log('LearningMode ko')
            }
          })
      }
 
      function getRM2DeviceType(device) {
        return deviceService.getDeviceTypesDevice(device.id)
          .then(function(data) {
            vm.RM2deviceType = [];
            if (data.data.length > 0) {
              data.data.forEach(function(deviceType) {
                vm.RM2deviceType.push((deviceType));
              })
            }
            console.log('RM2deviceType', vm.RM2deviceType)
            return vm.RM2deviceType;
          })
      }
 
 
    }
})(); 