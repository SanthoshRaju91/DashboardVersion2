var app = angular.module('addMember', ['ngAnimate']);

app.controller('addMemberController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    
    $scope.addMember = function() {
        if($scope.name || $scope.email || $scope.role) {
            $http.post(REST_URL + '/addMember', {name: $scope.name, emailAddress: $scope.email, role: $scope.role})
                .success(function(response) {
                    if(response.success) {
                        $scope.alert = true;
                        $scope.type = "success";
                        $scope.message = "Team Member added successfully!";
                    } else {
                        $scope.alert = true;
                        $scope.type = "danger";
                        $scope.message = "Error: in adding team member";
                    }
                });
            }
    }                
}]);