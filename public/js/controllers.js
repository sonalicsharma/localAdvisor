var localAdvisorApp = angular.module('localAdvisorApp', []).config(function($sceProvider) {
  $sceProvider.enabled(false);
});

localAdvisorApp.controller('localAdvisorCtrl', function ($scope, $http) {
  $scope.location = 'Champaign, IL';
  $scope.lat="40.1164204";
  $scope.lon="-88.2433829";
  $scope.weatherUrl = 'http://forecast.io/embed/#lat=' + $scope.lat + '&lon=' + $scope.lon + '&name=' + $scope.location;
  alert($scope.weatherUrl);
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
    $scope.coffeelistings = [];
    $scope.nightlifelistings = [];
    $scope.eventlistings = [];
	$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyDK2Bk1bhmFMW4wKYOX9Wu-ko6ouCq9uUw').success(function(data) {
		$scope.location = data.results[0].formatted_address;
		$scope.lat = data.results[0].geometry.location.lat;
		$scope.lon = data.results[0].geometry.location.lng;
		$scope.weatherUrl = 'http://forecast.io/embed/#lat=' + $scope.lat + '&lon=' + $scope.lon + '&name=' + $scope.location;
		$( '#forecast_embed' ).attr( 'src', function ( i, val ) { return val; });
		alert($scope.weatherUrl);
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
	});
	$('html,body').animate({
	  scrollTop: $('#tf-search').offset().top - 50
	  },1000);
  };
});

