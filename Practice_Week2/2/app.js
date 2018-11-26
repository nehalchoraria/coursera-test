(function () {
  'use strict';

  angular.module('myFirstApp',[])
  .controller('myFirstController',calledFunc);             
    
                                            // Inject by default adds Filter keyword.
  calledFunc.$inject = ['$scope','$timeout']
  function calledFunc($scope,$timeout)
   {  
    $scope.value=0; 
       
    $scope.incrementValue = function () {
        $timeout(function(){
        console.log("Counter incremented!")
        $scope.value++  ;
        },2000)
    };
       
       
       
       
//    $scope.incrementValue = function () {
//        setTimeout(function (){
//            $scope.$apply(function(){
//                    console.log("Counter incremented!")
//                    $scope.value++  ; 
//                    })       
//            },2000); 
//        }
    }

})();
