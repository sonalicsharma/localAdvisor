var localAdvisorApp = angular.module('localAdvisorApp', []);

localAdvisorApp.controller('localAdvisorCtrl', function ($scope, $http) {
  $scope.location = 'Champaign, IL';
  $http.get('yelp/restaurants/'+ $scope.location).success(function(data) {
    $scope.yelplistings = data;
  });
  $http.get('yelp/coffee/'+ $scope.location).success(function(data) {
    $scope.coffeelistings = data;
  });
  $http.get('yelp/nightlife/'+ $scope.location).success(function(data) {
    $scope.nightlifelistings = data;
  });
  $http.get('eventful/' + $scope.location).success(function(data) {
    $scope.eventlistings = data;
  });
  $scope.setLocation = function(location) {
    $scope.yelplistings = [];
    $scope.eventlistings = [];
    $http.get('yelp/restaurants/'+ $scope.location).success(function(data) {
      $scope.yelplistings = data;
    });
    $http.get('yelp/coffee/'+ $scope.location).success(function(data) {
      $scope.coffeelistings = data;
    });
    $http.get('yelp/nightlife/'+ $scope.location).success(function(data) {
      $scope.nightlifelistings = data;
    });
    $http.get('eventful/' + $scope.location).success(function(data) {
      $scope.eventlistings = data;
    });
  };
});

