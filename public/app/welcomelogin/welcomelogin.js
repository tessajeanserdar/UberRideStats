angular.module('main.welcomelogin',[])
.controller('welcomeloginController', function($scope,$location,fetchUserData){
  fetchUserData.authenticateUser()
  .then(function(response){
    $scope.url = response;
  })
});