(function () {
  'use strict';

  angular.module('myFirstApp',[])
  .controller('myFirstController',calledFunc)
  .filter('loves',LovesFilter);             // Loves in filter and inject are same.
                                            // Inject by default adds Filter keyword.
  calledFunc.$inject = ['$scope','$filter','lovesFilter']
  function calledFunc($scope,$filter,lovesFilter)
   {  // $ variable are present out of the box in angular
    $scope.name=""
    $scope.totalValue = 0;
    $scope.totalcost = 1.32;
    $scope.message="";

    $scope.displayNumeric = function () {
        var string = $scope.name;
        var totalStringValue = 0;
        for(var i=0 ; i<string.length;i++){
          totalStringValue += string.charCodeAt(i);
        }
        $scope.totalValue = totalStringValue;
    }

    $scope.sayLikeMessage = function () {
      var message = 'I like to eat healthy snack at night';
      return message;
    }

    $scope.sayLoveMessage = function () {
      var message = 'I like to eat healthy snack at night';
      message = lovesFilter(message,'like','love')
      return message;
    }

    $scope.upperCase = function () {
      var upCase = $filter("uppercase")
      $scope.name = upCase($scope.name)
    }

  }

function LovesFilter() {   //Customer filter factory function
  return function (input,target,replace) {
    input = input || "";
    input = input.replace(target,replace);
    return input;
  };
}


})();
//
// !function(){"use strict";function e(e,t){e.name="",e.totalValue=0,e.displayNumeric=function(){for(var t=e.name,n=0,a=0;a<t.length;a++)n+=t.charCodeAt(a);e.totalValue=n},e.upperCase=function(){var n=t("uppercase");e.name=n(e.name)}}angular.module("myFirstApp",[]).controller("myFirstController",e),e.$inject=["$scope","$filter"]}();
