var app = angular.module('Notify', []);

app.controller('NotificationController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    $http.get(REST_URL + '/getOutages')
        .success(function(response) {
            if(response.status == 200) {
                $scope.notificationList= response.result;
            }
        });
}]);