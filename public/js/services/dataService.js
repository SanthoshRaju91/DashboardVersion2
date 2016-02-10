'use strict';

var app = angular.module('dataService', []);

app.service('DataService', ['$http', '$filter', 'REST_URL', function($http, $filter, REST_URL) {
    
    var vm = this;
    var dataService = {};
    dataService.data = [];
    
    dataService.getIVRFileWithoutFileStatus = function($defer, params, filter, tableParams) {
        return $http.get(REST_URL + '/ivrFileWithoutFileStatusStats')
					.success(function(response) {                        
						var filterData = $filter('filter')(JSON.parse(response.result), filter);
						angular.copy(filterData, dataService.data);
						var orderedData = params.sorting() ? $filter('orderBy')(filterData, params.orderBy()) : filterData;
        				$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			});
    };
    
    dataService.getIVRFileWithoutFilName = function($defer, params, filter, tableParams) {
        return $http.get(REST_URL + '/ivrFileWithoutFileNameStats')
					.success(function(response) {                        
						var filterData = $filter('filter')(JSON.parse(response.result), filter);
						angular.copy(filterData, dataService.data);
						var orderedData = params.sorting() ? $filter('orderBy')(filterData, params.orderBy()) : filterData;
        				$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			});
    }
    
    dataService.getTaskList = function($defer, params, filter, tableParams) {
        return $http.get(REST_URL + '/getTasks')
					.success(function(response) {           
						var filterData = $filter('filter')(response.result, filter);
						angular.copy(filterData, dataService.data);
						var orderedData = params.sorting() ? $filter('orderBy')(filterData, params.orderBy()) : filterData;
        				$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			});
    }
    
    return dataService;
    
}]);