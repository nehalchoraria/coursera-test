(function () {
  'use strict';

  angular.module('myFirstApp',[])
  .controller('myFirstController',function ($scope) {  // $ variable are present out of the box in angular
    $scope.name=""
    $scope.totalValue = 0;

    $scope.displayNumeric = function () {
        var string = $scope.name;
        var totalStringValue = 0;
        for(var i=0 ; i<string.length;i++){
          totalStringValue += string.charCodeAt(i);
        }
        $scope.totalValue = totalStringValue;
    }



  })

})();
