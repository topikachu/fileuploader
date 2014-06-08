'use strict';

angular.module('bvFileUploaderApp')
  .controller('MainCtrl', function ($scope, $http) {
  	$scope.files=[];
    $scope.options={
      filedName:'image'
    };
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.submit=function(){
    	$scope.files.forEach(function(f){
    		f.submit();
    	});
    }
  });
