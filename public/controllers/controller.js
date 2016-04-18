var myApp = angular.module('myApp', ['uiGmapgoogle-maps']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.addUser=function() {
      console.log($scope.user);
      $http.post('/LocalAdvisor',$scope.user).success(function(response){
      console.log(response);
    });
 };

  




