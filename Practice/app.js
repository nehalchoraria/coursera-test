(function () {
  'use strict';

  angular.module('myFirstApp',[])
  .controller('myFirstController',calledFunc);

  calledFunc.$inject = ['$scope','$filter']
  function calledFunc($scope,$filter)
   {  // $ variable are present out of the box in angular
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

    $scope.upperCase = function () {
      var upCase = $filter("uppercase")
      $scope.name = upCase($scope.name)
    }


  }

})();
//
// !function(){"use strict";function e(e,t){e.name="",e.totalValue=0,e.displayNumeric=function(){for(var t=e.name,n=0,a=0;a<t.length;a++)n+=t.charCodeAt(a);e.totalValue=n},e.upperCase=function(){var n=t("uppercase");e.name=n(e.name)}}angular.module("myFirstApp",[]).controller("myFirstController",e),e.$inject=["$scope","$filter"]}();
