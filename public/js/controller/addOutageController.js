var app = angular.module('addOutage', ['ngAnimate']);

app.controller('addOutageController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    
    $scope.addOutage = function() {
        if($scope.issue || $scope.description || $scope.endSytem || $scope.reportedDate || $scope.criticality) {
            $http.post(REST_URL + "/addOutageTrend", {issue: $scope.issue, description: $scope.description, endSystem: $scope.endSytem, reportedDate: $scope.reportedDate, criticality: $scope.criticality})   
                .success(function(response) {                    
                    if(response.success) {
                        $scope.alert = true;
                        $scope.type = "success";
                        $scope.message = "Outage added successfully";
                        $scope.issue = ''; $scope.description = ''; $scope.endSytem = ''; $scope.reportedDate = ''; $scope.criticality ='';
                } else {
                   $scope.alert = true;
                   $scope.type = "danger";
                   $scope.message = "Error: could not save the outage, please contact the admin";
                }
            });
        }
    }
}]);