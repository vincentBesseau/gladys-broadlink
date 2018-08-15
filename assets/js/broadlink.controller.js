 (function () {
    'use strict';

    angular
        .module('gladys')
        .controller('BroadlinkCtrl', BroadlinkCtrl);

    BroadlinkCtrl.$inject = ['broadlinkService', '$scope'];

    function BroadlinkCtrl(broadlinkService, $scope) {
        /* jshint validthis: true */
        var vm = this
        vm._name = null
        vm.LearningMode = LearningMode

        function LearningMode(name) {
            return broadlinkService.learningMode({'_name':name})
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