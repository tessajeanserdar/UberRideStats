angular.module('main.services', [])
.factory('fetchUserData', function ($http, $location, $window) {
  const authenticateUser = function(){
    return $http({
      method: 'GET',
      url: '/api/login'
    })
    .then(function (resp) {
      return resp.data
    });
  }  


  const getUsersData = function () {
    return $http({
      method: 'GET',
      url: '/api/history',
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  return {
    getUsersData : getUsersData,
    authenticateUser : authenticateUser
  }
})
