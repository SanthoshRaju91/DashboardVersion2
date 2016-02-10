var app = angular.module('addTask', ['ngAnimate']);

app.controller('addTaskController', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {    
    $scope.saveTask = function() {
        if($scope.taskName || $scope.taskDesc || $scope.assignTo) {
            $http.post(REST_URL + '/addTask', {taskName: $scope.taskName, taskDesc: $scope.taskDesc, assignedTo: $scope.assignedTo})
                .success(function(response) {
                console.log(response)
                    if(response.success) {
                        $scope.alert = true;
                        $scope.type = "success";
                        $scope.message = "Task added successfully.";
                        $scope.taskName = ""; $scope.taskDesc = ""; $scope.assignedTo="";
                    } else {
                        $scope.alert = true;
                        $scope.type = "danger";
                        $scope.message = "Error: could add task, please contact admin.";
                    }
                });
        }
    }
}]);