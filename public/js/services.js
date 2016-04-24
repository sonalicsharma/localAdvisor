angular.module('localAdvisorApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
	  getUser: getUser,
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

	function isLoggedIn() {
	  return user ? true : false;
	}

	function getUser() {
	  return user;
	}

	// TODO: needs work
    function getUserStatus() {
      return $http.get('/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = user;
        } else {
          user = null;
        }
      })
      // handle error
      .error(function (data) {
        user = null;
      });
    }

    function login(userData) {
      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/login', userData)
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = userData.username;
            deferred.resolve();
          } else {
            user = null;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = null;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function logout() {
      // create a new instance of deferred
      var deferred = $q.defer();
      // send a get request to the server
      $http.get('/logout')
        // handle success
        .success(function (data) {
          user = null;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = null;
          deferred.reject();
        });
      // return promise object
      return deferred.promise;
    }

    function register(userData) {
      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/register', userData)
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
			user = userData.username;
            deferred.resolve();
          } else {
		    user = null;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = null;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }
}]);

//angular.module('localAdvisorApp').factory(
