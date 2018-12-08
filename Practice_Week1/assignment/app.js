(function () {
  'use strict';

  angular.module('myFirstApp',[])
  .controller('baseController',calledFunc);

  calledFunc.$inject = ['$scope']
  function calledFunc($scope) {
     $scope.fooditems = "";
     $scope.status = "";

     $scope.countItems = function(){
     var items =  $scope.fooditems.split(',');
     var length = items.length;
     if(items==""){
       $scope.status = "Please enter data first";
     }else if (length>=1&&length<=3) {
       $scope.status = "Enjoy!";
     }else {
       $scope.status = "Too much!";
     }

  }


  }

})();
