var localAdvisorApp = angular.module('localAdvisorApp', []);

localAdvisorApp.controller('localAdvisorCtrl', function ($scope, $http) {
  $scope.location = 'Champaign, IL';
  $http.get('yelp/'+ $scope.location).success(function(data) {
    $scope.yelplistings = data;
  });
  $http.get('eventful/' + $scope.location).success(function(data) {
    $scope.eventlistings = data;
  });
  $scope.setLocation = function(location) {
    $scope.yelplistings = [];
    $scope.eventlistings = [];
    $http.get('yelp/'+ $scope.location).success(function(data) {
      $scope.yelplistings = data;
    });
    $http.get('eventful/' + $scope.location).success(function(data) {
      $scope.eventlistings = data;
    });
  };
});

