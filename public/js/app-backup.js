var app = angular.module('myApp', ["ui.router", 'dashBoard', 'add', 'report', 'metrics', 'addMember', 'addOutage', 'addTask', 'profile', 'tasksOrIVR', 'dataService', 'Remedy', 'Notify', 'TeamMember', 'Mail']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/dashboard');
    
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })
        .state('notification', {
            url: '/notification',
            templateUrl: 'views/template/notificationPage.html',
            controller: 'NotificationController'
        })
        .state('metrics', {
            url: '/metrics',
            templateUrl: 'views/metrics.html',
            controller: 'metricsController'
        })
        .state('reports', {
            url: '/reports',
            templateUrl: 'views/reports.html'
        })
        .state('teamMember', {
            url: '/teamMember',
            templateUrl: 'views/template/teamMember.html',
            controller: 'TeamMemberController'
        })
        .state('add', {
            url: '/add',
            templateUrl: 'views/add.html',
            controller: 'addController'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'views/template/contactForm.html',
            controller: 'contactController'
        })
        .state('tasksOrIVR', {
            url: '/tasksOrIVR',
            templateUrl: 'views/tasksOrIVR.html',
            controller: 'tasksOrIVRController'
        })
        .state('add.addMember', {
            url: '/addMember',
            templateUrl: 'views/template/addMember.html',
            controller: 'addMemberController'
        })
        .state('add.addOutage', {
            url: '/addOutage',
            templateUrl: 'views/template/addOutage.html',
            controller: 'addOutageController'
        })
        .state('add.addTask', {
            url: '/addTask', 
            templateUrl: 'views/template/addTask.html',
            controller: 'addTaskController'
        })
        .state('add.updateRemedy', {
            url: '/updateRemedy',
            templateUrl: 'views/template/updateRemedy.html',
            controller: 'UpdateRemedyController'
        })
        .state('reports.ACH', {
            url: '/ACH',
            templateUrl: 'views/template/ach.html',
            controller: 'ACHController'
        })
        .state('reports.commerce', {
            url: '/commerce',
            templateUrl: 'views/template/commerce.html',
            controller: 'CommerceController'
        })
        .state('reports.serviceRequest', {
            url: '/serviceRequest',
            templateUrl: 'views/template/serviceRequest.html',
            controller: 'ServiceRequestController'
        })
        .state('reports.onlineOrder', {
            url: '/onlineOrder',
            templateUrl: 'views/template/onlineOrder.html',
            controller: 'OnlineOrderController'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/viewProfile.html',
            controller: 'ProfileController'
        });
});

