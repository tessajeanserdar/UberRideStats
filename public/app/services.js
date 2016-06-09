angular.module('main.services', [])
.factory('fetchUserData', function ($http, $location, $window) {
  const authenticateUser = function(){
    return $http({
      method: 'GET',
      url: '/v1/login'
    })
    .then(function (resp) {
      return resp.data
    });
  }  


  const getUsersData = function () {
    return $http({
      method: 'GET',
      url: '/v1/history',
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
