angular.module('main.totals', [])
.controller('totalController', function($scope,$pusher,$location,fetchUserData){
  $scope.userData;

  Pusher.logToConsole = true;

  const client = new Pusher('31c524eb992e076041b4', {
    encrypted: true
  });
  const pusher = $pusher(client);

  const channel = pusher.subscribe('test_channel');
  channel.bind('my_event', function(data) {
    $scope.userData = data.message;
  });
  
  fetchUserData.getUsersData()
  .then(function(data){
     $scope.userData = data;
  })


});

