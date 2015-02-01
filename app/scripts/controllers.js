'use strict';

angular.module('Yahnr')
    .controller('MainController', function($scope, $firebase, $q, $ionicSlideBoxDelegate, MainService) {

        var topStoriesReq = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
        var topStoriesSync = $firebase(topStoriesReq);
        // download the data into a local object
        var topStories = topStoriesSync.$asArray();
        $scope.content = [];
        topStories.$loaded(
            function(loadedData) {
                // vamos a cargar solo 3 para no cepillarnos todas las llamadas a la API en un dia!
                // var max = loadedData.length;
                var max = 3;
                for (var i = 0; i < max; i++) {
                    var storyID = loadedData[i].$value;
                    var baseUri = "https://hacker-news.firebaseio.com/v0/item/";
                    var reqUri = baseUri + storyID;
                    var storyReq = new Firebase(baseUri + storyID);
                    var storySync = $firebase(storyReq);
                    var story = storySync.$asObject();
                    story.$loaded(
                        function(loadedStory) {
                            MainService.loadEmbedableItem(loadedStory.url).then(function(response) {
	                            response.data.hnScore = loadedStory.score;
                                console.log(response.data);
                                $scope.content.push(response.data);
                                $ionicSlideBoxDelegate.update(); //or just return the function
                            });
                        }
                    );
                }
            }
        );
        console.log($scope.content);
    });