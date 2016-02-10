var app = angular.module('tasksOrIVR', ['ngTable']);

app.controller('tasksOrIVRController', ['$scope', '$http', '$state', '$filter', 'NgTableParams', 'REST_URL', 'DataService', function($scope, $http, $state, $filter, NgTableParams, REST_URL, DataService) {
           
    var ivrWithoutFileStatus = DataService.data;
    $scope.ivrWithoutFileStatusParams = new NgTableParams({
		page: 1,
		count: 8
	}, {		
		getData: function($defer, params) {
				DataService.getIVRFileWithoutFileStatus($defer, params, $scope.filter).then(function() {
					$scope.ivrWithoutFileStatusParams.settings({data: ivrWithoutFileStatus, counts: []});
				});
		}
	});
    
    var ivrWithoutFileName = DataService.data;
    $scope.ivrWithoutFileNameParams = new NgTableParams({
       page: 1,
        count: 8
    }, {
        getData: function($defer, params) {
            DataService.getIVRFileWithoutFilName($defer, params, $scope.filter).then(function() {
                $scope.ivrWithoutFileNameParams.settings({data: ivrWithoutFileName, counts: []});
            })
        }
    });    
    
    var taskList = DataService.data;
    $scope.taskListParams = new NgTableParams({
       page: 1,
        count: 8
    }, {
        getData: function($defer, params) {
            DataService.getTaskList($defer, params, $scope.filter).then(function() {
                $scope.taskListParams.settings({data: taskList, counts: []});
            });
        }
    });    
        
    $scope.delete = function(id) {
        $http.delete(REST_URL + '/deleteTask/' + id)
            .success(function(response) {
                if(response.success) {
                    $state.reload();                
                };
            });
    }
    
}]);