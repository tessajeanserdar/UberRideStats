const app = angular.module('main', ['ui.router','main.welcomelogin','main.services','main.totals','pusher-angular']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/app/welcomelogin/welcomelogin.html',
            controller: 'welcomeloginController'
        })
        .state('totals', {
            url: '/totals',
            templateUrl: '/app/totals/totals.html',
            controller: 'totalController'      
        });
        
});