angular.module('main.totals',[])
.controller('totalController', function($scope,$location,fetchUserData){
  $scope.userData = ''

  // socket.on('date', function (data) {
  //   $scope.data = data;
  // });

  fetchUserData.getUsersData()
  .then(function(data){
     var userInfo = data[0]
     $scope.userData = userInfo;
  })


});