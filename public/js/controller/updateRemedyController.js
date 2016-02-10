var app = angular.module('Remedy', []);

app.controller('UpdateRemedyController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    
    $scope.updateTicketStatus = function() {        
        if($scope.totalPending || $scope.totalHigh || $scope.totalMedium || $scope.totalLow) {
            $http.post(REST_URL + '/updateTicketStatus', {totalPending: $scope.totalPending, totalHigh: $scope.totalHigh, totalMedium: $scope.totalMedium, totalLow: $scope.totalLow})
            .success(function(response) {
                if(response.success) {
                    $scope.alert = true;
                    $scope.type = "success";
                    $scope.message = "Updated Successfully";
                } else {
                    $scope.alert = true;
                    $scope.type = "danger";
                    $scope.message = "Error in updating ticket status";
                }
            });  
        }            
    };       
}]);