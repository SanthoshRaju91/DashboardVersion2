var app = angular.module('login', []);

app.constant('LOGIN_URL', document.location.origin+'/login');

app.controller('LoginController', ['$scope', '$http', '$location', 'AuthService', 'LOGIN_URL',function($scope, $http, $location, AuthService, LOGIN_URL) {
    
    $scope.login = function() {
      $http.post(LOGIN_URL, {username: $scope.username, password: $scope.password})
        .success(function(response) {            
            AuthService.logIn(response.token, response.role);
            $location.path('/landing');
      });
    };
}]);