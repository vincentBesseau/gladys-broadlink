
 (function () {
    'use strict';

    angular
        .module('gladys')
        .factory('broadlinkService', broadlinkService);

    broadlinkService.$inject = ['$http', 'Notification', '$translate'];

    function broadlinkService($http, Notification, $translate) {
        
        var service = {
            learningMode: learningMode,
        };

        return service;
        
        function learningMode(options) {
            return $http({method: 'POST', url: '/broadlink/learning', data: options });
        }
    }
})();