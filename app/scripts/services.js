'use strict';

angular.module('Yahnr')
    .service('MainService', function($http) {
        this.loadEmbedableItem = function(urlToLoad) {
            // embedly API key
            var key = "e8316305a2b74f88bf7597d485af41f8";
            var url = "http://api.embed.ly/1/extract?key=" + key + "&url=" + encodeURIComponent(urlToLoad);
            // console.log(url);
            var req = $http.get(
                url
            );
            return req;
        };
    });
