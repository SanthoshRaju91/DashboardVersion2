var app = angular.module('TeamMember', []);

app.controller('TeamMemberController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    $http.get(REST_URL + '/getTeamMembers')
        .success(function(response) {
            $scope.teamMembers = response.result;
        });
}]);