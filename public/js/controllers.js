angular.module('localAdvisorApp').controller('localAdvisorCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi', '$uibModal', function ($scope, $http, uiGmapGoogleMapApi, $uibModal) { 
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

  $scope.addUser=function() {
      $http.post('register',$scope.user).success(function(response){
        alert('You are registered successfully');
      });
  }; 
  $scope.loginUser=function() {
      $http.post('login',$scope.login).success(function(response){
        alert('You have logged in successfully');
      });
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
  $scope.checkStatus=function() {
      $http.get('status').success(function(response){
        alert(response);
		console.log(response);
      });
  }; 
  $scope.logout=function() {
      $http.get('logout').success(function(response){
		console.log(response);
		$scope.username = "";
		$scope.greetings = '';
      });
  }; 
}]);

angular.module('localAdvisorApp').controller('userController', ['$scope', '$http', '$uibModalInstance', 'items', function ($scope, $http, $uibModalInstance, items) {
  $scope.loginUser = function() {
      $http.post('login',$scope.login)
      .success(function(response){
		$uibModalInstance.close($scope.login.username);
      });
  };

  $scope.register = function() {
      $http.post('register',$scope.user)
      .success(function(response){
		$uibModalInstance.close($scope.user.username);
      });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }; 
}]);

