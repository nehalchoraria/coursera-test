// (function () {
//   'use strict';
//
//   angular.module('myFirstApp',[])
//   .controller('myFirstController',['$scope','$filter', function calledFunc($scope,$filter)
//    {  // $ variable are present out of the box in angular
//     $scope.name=""
//     $scope.totalValue = 0;
//
//     $scope.displayNumeric = function () {
//         var string = $scope.name;
//         var totalStringValue = 0;
//         for(var i=0 ; i<string.length;i++){
//           totalStringValue += string.charCodeAt(i);
//         }
//         $scope.totalValue = totalStringValue;
//     }
//
//     $scope.upperCase = function () {
//       var upCase = $filter("uppercase")
//       $scope.name = upCase($scope.name)
//     }
//
//
//   }
//   ]);
//
// })();

!function(){"use strict";angular.module("myFirstApp",[]).controller("myFirstController",["$scope","$filter",function(e,t){e.name="",e.totalValue=0,e.displayNumeric=function(){for(var t=e.name,a=0,n=0;n<t.length;n++)a+=t.charCodeAt(n);e.totalValue=a},e.upperCase=function(){var a=t("uppercase");e.name=a(e.name)}}])}();
