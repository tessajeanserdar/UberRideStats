angular.module('main', [
  'ui.router',
  'main.main'
])
.config(function ($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise("/main");
 $stateProvider
   .state('main', {
     url: "/main",
     templateUrl: "/app/main/main.html",
     controller: 'MainController'
   })
});
