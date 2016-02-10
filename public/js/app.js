var app = angular.module('App', ['ui.router', 'login', 'authService', 'dashBoard', 'main', 'add', 'report', 'metrics', 'addMember', 'addOutage', 'addTask', 'profile', 'tasksOrIVR', 'dataService', 'Remedy', 'Notify', 'TeamMember', 'Mail']);

app.config(function($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginController',
            authenticate: false
        })
        .state('landing', {
            url: '/landing',
            templateUrl: 'landing.html',        
            authenticate: true
        })
        .state('landing.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController',
            authenticate: true
        })
        .state('landing.notification' , {
            url: '/notification',
            templateUrl: 'views/template/notificationPage.html',
            controller: 'NotificationController',
            authenticate: true
        })
        .state('landing.metrics', {
            url: '/metrics',
            templateUrl: 'views/metrics.html',
            controller: 'metricsController',
            authenticate: true
        })
        .state('landing.reports', {
            url: '/reports',
            templateUrl: 'views/reports.html',
            authenticate: true
        })
        .state('landing.teamMember', {
            url: '/teamMember',
            templateUrl: 'views/template/teamMember.html',
            controller: 'TeamMemberController',
            authenticate: true
        })
        .state('landing.add', {
            url: '/add',
            templateUrl: 'views/add.html',
            controller: 'addController',
            authenticate: true
        })
        .state('landing.contact', {
            url: '/contact',
            templateUrl: 'views/template/contactForm.html',
            controller: 'contactController',
            authenticate: true
        })
        .state('landing.tasksOrIVR', {
            url: '/tasksOrIVR',
            templateUrl: 'views/tasksOrIVR.html',
            controller: 'tasksOrIVRController',
            authenticate: true
        })
        .state('landing.add.addMember', {
            url: '/addMember',
            templateUrl: 'views/template/addMember.html',
            controller: 'addMemberController',
            authenticate: true
        })
        .state('landing.add.addOutage', {
            url: '/addOutage',
            templateUrl: 'views/template/addOutage.html',
            controller: 'addOutageController',
            authenticate: true
        })
        .state('landing.add.addTask', {
            url: '/addTask', 
            templateUrl: 'views/template/addTask.html',
            controller: 'addTaskController',
            authenticate: true
        })
        .state('landing.add.updateRemedy', {
            url: '/updateRemedy',
            templateUrl: 'views/template/updateRemedy.html',
            controller: 'UpdateRemedyController',
            authenticate: true
        })
        .state('landing.reports.ACH', {
            url: '/ACH',
            templateUrl: 'views/template/ach.html',
            controller: 'ACHController',
            authenticate: true
        })
        .state('landing.reports.commerce', {
            url: '/commerce',
            templateUrl: 'views/template/commerce.html',
            controller: 'CommerceController',
            authenticate: true
        })
        .state('landing.reports.serviceRequest', {
            url: '/serviceRequest',
            templateUrl: 'views/template/serviceRequest.html',
            controller: 'ServiceRequestController',
            authenticate: true
        })
        .state('landing.reports.onlineOrder', {
            url: '/onlineOrder',
            templateUrl: 'views/template/onlineOrder.html',
            controller: 'OnlineOrderController',
            authenticate: true
        })
        .state('landing.profile', {
            url: '/profile',
            templateUrl: 'views/viewProfile.html',
            controller: 'ProfileController',
            authenticate: true
        });
});


app.config(function($httpProvider) {
   $httpProvider.interceptors.push('AuthInterceptor'); 
});


app.run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {        
        if(toState.authenticate && !AuthService.isAuthenticated()) {            
            $state.transitionTo('login');
            event.preventDefault();
       } 
    });
}]);