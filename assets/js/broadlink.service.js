/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Mathieu Andrade
  */
  
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