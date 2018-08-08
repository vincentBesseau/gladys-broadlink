var translationsEN = {
    BROADLINK_MODE:'Learning',
    NEW_NAME:'New devicetype',
}

var translationsFR = {
    BROADLINK_MODE:'Apprentissage',
    NEW_NAME:'Nouveau devicetype',
}

angular
    .module('gladys')
    .config(['$translateProvider', function($translateProvider) {
        // add translation table
        $translateProvider
            .translations('en', translationsEN)
            .translations('fr', translationsFR);
    }]);