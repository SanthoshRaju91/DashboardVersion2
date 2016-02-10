var app = angular.module('dashBoard', ["highcharts-ng", "ngTable"]);

app.constant('REST_URL', document.location.origin + '/api');


app.controller('dashboardController', ['$scope', '$http', 'REST_URL', 'ngTableParams', function($scope, $http, REST_URL, ngTableParams) {       
    
    function loadRemedyTrendChart(month, pending, opened, resolved) {
         $scope.chartConfig = {
                options: {
                  chart: {
                      type: 'column',                      
                      height: 200   
                  },
                  tooltip: {
                      style: {
                          padding: 10,
                          fontWeight: 'bold'
                      }
                  }
              },
             title: {
               text: ''  
             },
             xAxis: {
                categories: month   
             },
            series: [{
                name: 'Opened',
                data: opened
            }, {
                name: 'Resolved',
                data: resolved
            }, {
                name: 'Pending',
                data: pending
            }]
        }  
    };
    
    $http.get(REST_URL+'/getFirstThreeOutages')
        .success(function(response) {       
            $scope.outageList = response.result;
            $scope.tableParams = new ngTableParams({count: 5}, {dataset: response.result});            
            console.log($scope.tableParams);
    });/*
    
    $scope.tableParams = new ngTableParams({
        count: 5
    }, {
        getData: function(params) {
            return $http.get(REST_URL + '/getOutages').then(function(data) {
                console.log(data);
                params.total(data.data.inlineCount);
                return data.data.result;
            });
        }
    });*/
    
    
    
    $http.get(REST_URL+"/getRemedyTrend")
        .then(function(response) {            
            var month = [];
            var pending = [];
            var opened = [];
            var resolved = [];
            for(var obj in  response.data.remedy)    {
                month.push(response.data.remedy[obj].month);
                pending.push(response.data.remedy[obj].pending);
                opened.push(response.data.remedy[obj].opened);
                resolved.push(response.data.remedy[obj].resolved);
            }
            loadRemedyTrendChart(month, pending, opened, resolved);
        });
    
    $http.get(REST_URL+'/getTicketTrend')
        .then(function(response) {        
        if(response.data.status === 500) {
            console.log("Error");
        } else {
            $scope.ticketTrend = response.data.result[0];            
        }
    });
    
    
    
}]);