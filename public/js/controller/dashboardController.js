var app = angular.module('dashBoard', ["highcharts-ng", "ngTable"]);

app.constant('REST_URL', document.location.origin + '/api');


app.controller('dashboardController', ['$scope', '$http', '$window', 'REST_URL', 'ngTableParams', function($scope, $http, $window, REST_URL, ngTableParams) {       
    
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
            
    
    /*$http.jsonp("http://txhous10pc819.wm.com:1719/RemedyReports/loadOpenEbizTickets?callback=JSON_CALLBACK")
        .then(function(data) {
            console.log(JSON.stringify(data));
    });
    function JSON_CALLBACK(data) {
        alert("Callback invoked");
        var el = document.getElementById('ctl');
        var scope = angular.element(el).scope();
        scope.$apply(function() {
            scope.data = JSON.stringify(data);
        });
    }
*/
    /*$http({method: 'JSONP', url: 'http://txhous10pc819.wm.com:1719/RemedyReports/loadOpenEbizTickets?callback=JSON_CALLBACK', cache: $templateCache})
        .then(function(response) {
        console.log("Response: " + JSON.stringify(response));
    }, function(response) {
        console.log("Response: " + response); 
    });

    
    function JSON_CALLBACK(data) {
        console.log("Callback");
    }
    
    var c = $window.angular.callbacks.counter.toString(36);

    $window['angularcallbacks_' + c] = function (data) {
        $window.angular.callbacks['_' + c](data);
        delete $window['angularcallbacks_' + c];
    };
    
    var url = "http://txhous10pc819.wm.com:1719/RemedyReports/loadOpenEbizTickets?alt=json-in-script&callback=JSON_CALLBACK";
    $http.jsonp(url).success(function(data) {
        console.log(JSON.stringify(data));
    }); */
}]);