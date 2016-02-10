var app = angular.module('profile', ['ngFileUpload']);

app.controller('ProfileController', ['$scope', '$http', 'Upload', '$timeout', function($scope, $http, Upload, $timeout) {
    $scope.uploadFile = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];  
        console.log(file);
        if(file) {
            $http.post('http://localhost:3000/upload', {file: file})
        }
        /*if(file) {
            file.upload = Upload.upload({
                url: 'http://localhost:3000/upload',
                data: {file: file}
            });
            
            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;  
                });
            }, function(response) {
                if(response.status > 0) {
                    console.log("error");
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }*/
    };
}]);