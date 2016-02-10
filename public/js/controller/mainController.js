var app = angular.module('main', []);

app.controller('mainController', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
   
    $scope.role = AuthService.getRole();
    
    $state.transitionTo('landing.dashboard');
        
    
    $scope.colorList = ['#D91E18', '#9B59B6', '#26A65B', '#D35400', '#6C7A89', '#03C9A9', '#2b597b'];
    
    $scope.applyTheme = function(theme) {
      $scope.selectedBorder = theme;
      $scope.theme = {
          background: theme          
      }
    };
    
    
    $scope.logOut = function() {
        AuthService.logOut();
        $state.transitionTo('login');
    }
        
    
}]);