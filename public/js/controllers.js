angular.module('localAdvisorApp').controller('localAdvisorCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi', '$uibModal', 'AuthService', 'weatherService', function ($scope, $http, uiGmapGoogleMapApi, $uibModal, AuthService, weatherService) {
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
  $scope.favorite = {};
  $scope.isFavorite = function(listing, category) {
	  return $.grep($scope.favorites, function(entry) { return entry.name === listing && entry.category === category;}).length > 0;
  }

  $scope.addFavorite = function(listing, category) {
    var favorite = {};
    if (category) {
      favorite.category = category;
      favorite.name = (listing.name) ? listing.name : listing;
      favorite.url = listing.url;
    } else {
      favorite = $scope.favorite;
    }
    console.log(favorite);
    favorite.user =  AuthService.getUser();
    $http.post('favorites', favorite)
    .success(function(data) {
      $scope.favorites.push(data);
      $scope.favorite={};
    });
  };
  $scope.updateFavorite = function() {
    console.log($scope.favorite);
    $http.put('favorites/'+$scope.favorite._id, $scope.favorite)
    .success(function(data) {
      $scope.favorite={};
    });
  };
  $scope.removeFavorite = function(listing, category) {
  	var id = (category) ? $.grep($scope.favorites, function(entry) { return entry.name === listing && entry.category === category;})[0]._id : listing;
  	$http.delete('favorites/' + id)
  	.success(function(data) {
  	  $scope.favorites = $.grep($scope.favorites, function(entry) { return entry._id !== id;});
  	});
  };
  $scope.setFavorite=function(entry){
   $scope.favorite=entry;
  };
  $scope.deselectFavorite=function(){
   $scope.favorite={};
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

  $http.get('yelp/Active Life/'+ $scope.location).success(function(data) {
    $scope.ActiveLifelistings = data;
  });

  $http.get('expedia/' + $scope.lat + ',' + $scope.lon).success(function(data) {
    console.log(data);
    $scope.hotels = data;
  });
  $scope.weather = weatherService.getWeather($scope.lat, $scope.lon, $scope.location);

  $scope.setLocation = function(location) {
    $scope.yelplistings = [];
    $scope.coffeelistings = [];
    $scope.nightlifelistings = [];
    $scope.eventlistings = [];
    $scope.ActiveLifelistings=[];
    $scope.hotels=[];
	$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyDK2Bk1bhmFMW4wKYOX9Wu-ko6ouCq9uUw').success(function(data) {
		$scope.location = data.results[0].formatted_address;
		$scope.lat = data.results[0].geometry.location.lat;
		$scope.lon = data.results[0].geometry.location.lng;
		$scope.weatherUrl = 'http://forecast.io/embed/#lat=' + $scope.lat + '&lon=' + $scope.lon + '&name=' + $scope.location;
		$( '#forecast_embed' ).attr( 'src', function ( i, val ) { return val; });
		//alert($scope.weatherUrl);

       $scope.weather = weatherService.getWeather($scope.lat, $scope.lon, $scope.location);

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
       $http.get('yelp/Active Life/'+ $scope.location).success(function(data) {
		  $scope.ActiveLifelistings = data;
		});
        $http.get('expedia/' + $scope.lat + ',' + $scope.lon).success(function(data) {
        console.log(data);
        $scope.hotels = data;
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
localAdvisorApp.factory('weatherService', function($http) {
    return {
      getWeather: function(lat, lon, location) {
        var weather = { temp: {}, clouds: null };

        $http.jsonp('http://api.openweathermap.org/data/2.5/weather?lat='+ lat+'&lon='+lon+'&units=imperial&callback=JSON_CALLBACK&appid=fd696179217da623fb83ae461c01af05').success(function(data) {
            if (data) {
                if (data.main) {
                    weather.temp.current = data.main.temp;
                    weather.temp.min = data.main.temp_min;
                    weather.temp.max = data.main.temp_max;
                    weather.temp.location=location;
                }
                weather.clouds = data.clouds ? data.clouds.all : undefined;
            }
        });
        console.log(weather);
        return weather;
      }
    };
});

localAdvisorApp.filter('temp', function($filter) {
    return function(input, precision) {
        if (!precision) {
            precision = 1;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0F';
    };
});

localAdvisorApp.directive('weatherIcon', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@'
        },
        controller: function($scope) {
            $scope.imgurl = function() {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.cloudiness < 20) {
                    return baseUrl + 'sunny.png';
                } else if ($scope.cloudiness < 90) {
                   return baseUrl + 'partly_cloudy.png';
                } else {
                    return baseUrl + 'cloudy.png';
                }
            };
        },
        template: '<div style="float:center"><img ng-src="{{ imgurl() }}"></div>'
    };
});
