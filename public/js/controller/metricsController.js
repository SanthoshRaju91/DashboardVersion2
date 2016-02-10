var app = angular.module('metrics', ['highcharts-ng', "ngTable"]);


app.controller('metricsController', ['$scope', '$http', '$filter', '$interval', 'REST_URL', 'ngTableParams', function($scope, $http, $filter, $interval, REST_URL, ngTableParams) {
    
    function loadReportProblemStats(chartType, yAxisLabel, seriesName, month, result) {        
        $scope.reportConfig = {
                options: {
                  chart: {
                      type: chartType,                      
                      height: 300   
                  },
                  tooltip: {
                      style: {
                          padding: 10,
                          fontWeight: 'bold'
                      }
                  }
              },
            credits: {
                enabled: false
            },
             title: {
               text: ''  
             },
             xAxis: {
                categories: month   
             },
             yAxis: {
                 title: {
                     text: yAxisLabel
                 }
             },
            series: [{
                name: seriesName,
                data: result
            }]
        } 
         
    };
    
     function loadWMOrderStats(chartType, yAxisLabel, seriesName, category, result) {        
        $scope.orderConfig = {
                options: {
                  chart: {
                      type: chartType,                      
                      height: 300   
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
                categories: category   
             },
            credits: {
                enabled: false
            },
             yAxis: {
                 title: {
                     text: yAxisLabel
                 }
             },
            series: [{
                name: seriesName,
                data: result
            }]
        } 
         
    };
       
    function loadSchedulePaymentStats(chartType, yAxisLabel, seriesName, category, result) {        
        $scope.schedulePaymentConfig = {
                options: {
                  chart: {
                      type: chartType,                      
                      height: 300   
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
                categories: category   
             },
            credits: {
                enabled: false
            },
             yAxis: {
                 title: {
                     text: yAxisLabel
                 }
             },
            series: [{
                name: seriesName,
                data: result
            }]
        } 
         
    };
    
    function loadTransNotifyStats(chartType, yAxisLabel, seriesName, category, result) {        
        $scope.transNotifyConfig = {
                options: {
                  chart: {
                      type: chartType,                      
                      height: 300   
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
                categories: category   
             },
            credits: {
                enabled: false
            },
             yAxis: {
                 title: {
                     text: yAxisLabel
                 }
             },
            series: [{
                name: seriesName,
                data: result
            }]
        } 
         
    };
    
        $http.get(REST_URL+'/reportProblemStats')
        .success(function(response) {
            if(response.status == 200) {                
                results = JSON.parse(response.result);
                var months = [] 
                var counts = [];
                for(result in results) {
                    months.push(results[result].month);
                    counts.push(results[result].count)
                }
                loadReportProblemStats('column', 'Problems reported', 'Reported' , months, counts);
            }
        });    
    
        $http.get(REST_URL+'/wmOrderStats')
            .success(function(response) {
                if(response.status == 200){
                    results = JSON.parse(response.result);
                    var category = [];
                    var counts = [];
                    for(result in results) {
                        category.push(results[result].category);
                        counts.push(results[result].count);
                    }
                    loadWMOrderStats('column', 'Order Placed', '# of orders' , category, counts);
                }
            });
    
        $http.get(REST_URL + '/scheduledPaymentStats')
            .success(function(response) {
                if(response.status == 200) {
                    results = JSON.parse(response.result);
                    var days = [];
                    var counts = [];
                    for(result in results) {
                        days.push($filter('date')(results[result].day, 'MM/dd'));
                        counts.push(results[result].count);
                    }
                    loadSchedulePaymentStats('column', 'IVR File Count', '# of files', days, counts);
                }
            });
    
        $http.get(REST_URL + '/transNotifyStats')
            .success(function(response) {
                if(response.status == 200) {
                    results = JSON.parse(response.result);
                    var days = [];
                    var counts = [];
                    for(result in results) {
                        days.push($filter('date')(results[result].day, 'MM/dd'));
                        counts.push(results[result].count);
                    }
                    loadTransNotifyStats('column', 'Trans-notify count', '# of transactions', days, counts);
                }
            }); 
              
}]);

