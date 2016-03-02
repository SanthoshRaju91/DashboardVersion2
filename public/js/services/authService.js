var app = angular.module('authService', []);

app.service('AuthService', ['$window', function($window) {
    
    var user = this;    
        
    user.logIn = function(token, role) {
        $window.localStorage.setItem('isAuthenticated', true);
        $window.localStorage.setItem('token', token);
        $window.localStorage.setItem('role', role);
    }
    
    user.logOut = function() {
        $window.localStorage.removeItem('isAuthenticated');
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('role');
    }
    
    user.isAuthenticated = function() {
        return $window.localStorage.getItem('isAuthenticated');
    }
    
    user.getToken = function() {
        return $window.localStorage.getItem('token');
    }
    
    user.getRole = function() {
        return $window.localStorage.getItem('role');    
    }
    
    
    return user;
}]);

app.service('AuthInterceptor', ['AuthService', '$location', function(AuthService, $location) {
    
    var interceptorFactory = {};
    
    interceptorFactory.request = function(config) {
        var token = AuthService.getToken();
        if(token) {
            config.headers['authorization']  = "Bearer " + token;            
        }
        return config;
    }
    
    interceptorFactory.responseError = function(response) {
      /*  console.log("Auth response  " + response.status);*/
        if(response.status == 401) {
            console.log("Token expired ");
            AuthService.logOut();
            $location.path('/login');
        }
    }
    return interceptorFactory;
}]);