angular.module('main.services', [])
.factory('fetchUserData', function ($http, $location, $window) {
  var authenticateUser = function(){
    return $http({
      method: 'GET',
      url: '/api/login'
    })
    .then(function (resp) {
      return resp.data
    });
  }  


  var getUsersData = function () {
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
// .factory('socket', function ($rootScope) {
//   var socket = io.connect();
//   return {
//     on: function (eventName, callback) {
//       socket.on(eventName, function () {  
//         var args = arguments;
//         $rootScope.$apply(function () {
//           callback.apply(socket, args);
//         });
//       });
//     },
//     emit: function (eventName, data, callback) {
//       socket.emit(eventName, data, function () {
//         var args = arguments;
//         $rootScope.$apply(function () {
//           if (callback) {
//             callback.apply(socket, args);
//           }
//         });
//       })
//     }
//   };
// });