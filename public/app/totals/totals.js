angular.module('main.totals', [])
.controller('totalController', function($scope,$location,fetchUserData){
  $scope.userData = ''

  Pusher.logToConsole = true;

  var pusher = new Pusher('31c524eb992e076041b4', {
    encrypted: true
  });

  var channel = pusher.subscribe('test_channel');
  channel.bind('my_event', function(data) {
    alert(data.message);
  });
  
  fetchUserData.getUsersData()
  .then(function(data){
     $scope.userData = data;
  })


});

