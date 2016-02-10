var app = angular.module('Mail', []);

app.controller('contactController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    
    $scope.submitRequest = function() {
        if($scope.name || $scope.emailAddress || $scope.query) {
            $http.post(REST_URL + '/sendRequest', {name: $scope.name, email: $scope.emailAddress, query: $scope.query})
                .success(function(response) {
                    if(response.success) {
                        $scope.alert = true;
                        $scope.type = "success";
                        $scope.message = "New request mail sent successfully";
                        $scope.name = ""; $scope.emailAddress = ""; $scope.query = "";
                    } else {
                        $scope.alert = true;
                        $scope.type = "danger";
                        $scope.message = "Error in sending your request, please send direct mail to snagaraj@wm.com for assistance.";
                    }
                });
        }
    }
}]);