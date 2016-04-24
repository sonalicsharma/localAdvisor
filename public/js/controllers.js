var localAdvisorApp = angular.module('localAdvisorApp', ['uiGmapgoogle-maps']).config(["$sceProvider", "uiGmapGoogleMapApiProvider", function($sceProvider, uiGmapGoogleMapApiProvider) {
  $sceProvider.enabled(false);
  uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCmY50zYduZyT4egMMdmHH9GGkTiIvhF_8',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
}]);

localAdvisorApp.controller('localAdvisorCtrl', function ($scope, $http, uiGmapGoogleMapApi, weatherService) {
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
  
  $scope.weather = weatherService.getWeather($scope.lat, $scope.lon);
  
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
      
       $scope.weather = weatherService.getWeather($scope.lat, $scope.lon);
      
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
});

localAdvisorApp.factory('weatherService', function($http) {
    return { 
      getWeather: function(lat, lon) {
        var weather = { temp: {}, clouds: null };
        
        $http.jsonp('http://api.openweathermap.org/data/2.5/weather?lat='+ lat+'&lon='+lon+'&units=metric&callback=JSON_CALLBACK&appid=fd696179217da623fb83ae461c01af05').success(function(data) {
            if (data) {
                if (data.main) {
                    weather.temp.current = data.main.temp;
                    weather.temp.min = data.main.temp_min;
                    weather.temp.max = data.main.temp_max;
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
        return numberFilter(input, precision) + '\u00B0C';
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
        template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
    };
});
