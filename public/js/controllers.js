angular.module('localAdvisorApp').controller('localAdvisorCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi', '$uibModal', 'AuthService', function ($scope, $http, uiGmapGoogleMapApi, $uibModal, AuthService) { 
  $scope.username = "";
  $scope.location = 'Champaign, IL';
  $scope.lat="40.1164204";
  $scope.lon="-88.2433829";
  $scope.weatherUrl = 'http://forecast.io/embed/#lat=' + $scope.lat + '&lon=' + $scope.lon + '&name=' + $scope.location;
  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: $scope.lat, longitude: $scope.lon }, zoom: 12 };
    $scope.options = { scrollwheel: false };
  });
  
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

  $scope.favorites = [];
  $scope.isFavorite = function(location) {
	return $.grep($scope.favorites, function(value) { return value.location === location;}).length > 0;
  }
  $scope.addFavorite = function(location) {
	$http.post('favorites', {user: AuthService.getUser(), location: location})
	.success(function(data) {
	  $scope.favorites.push(data);
	});
  };
  $scope.removeFavorite = function(location) {
	var entry = $.grep($scope.favorites, function(value) { return value.location === location;})[0];
	console.log(entry);
	$http.delete('favorites/' + entry._id)
	.success(function(data) {
	  $scope.favorites = $.grep($scope.favorites, function(value) { return value.location !== location;});
	});
  };
  
  $scope.$watch("username", function(newValue, oldValue) {
    $scope.favorites = [];
	if (!newValue) {
	  return;
	}
	$http.get('favorites', {user: newValue})
	.success(function(data) {
		$scope.favorites = data;
	});
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
		//alert($scope.weatherUrl);
      
        $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lon }, zoom: 12 };
      
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

  $scope.showLogin = function(){
	var modal = $uibModal.open({
        controller:"userController",
        templateUrl:'partial/login.html',
          resolve: {
            items:function(){return {};}
          }
    });
    modal.result.then(function(username){
      $scope.username = username;
      $scope.greetings = 'Hi ' + username + '!';
    });
  };
  $scope.showRegistration= function(){
	var modal = $uibModal.open({
        controller:"userController",
        templateUrl:'partial/registration.html',
          resolve: {
            items:function(){return {};}
          }
    });
    modal.result.then(function(username){
      $scope.username = username;
      $scope.greetings = 'Hi ' + username + '!';
    });
  };
  $scope.isLoggedIn = function() {
	return AuthService.isLoggedIn();
  }; 
  $scope.logout=function() {
	AuthService.logout()
	  .then(function() {
		$scope.username = "";
		$scope.greetings = '';
      });
  }; 
}]);

angular.module('localAdvisorApp').controller('userController', ['$scope', '$http', '$uibModalInstance', 'items', 'AuthService', function ($scope, $http, $uibModalInstance, items, AuthService) {
  $scope.loginUser = function() {
      AuthService.login($scope.login)
      .then(function(){
		$uibModalInstance.close($scope.login.username);
      });
  };

  $scope.register = function() {
	AuthService.register($scope.user)
	  .then(function () {
		$uibModalInstance.close($scope.user.username);
      });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }; 
}]);

